const sheetID = '1nlsYAMLxbLdaf1gBJGgyMze4AvKfaws4zQbqEBi4iYw'
import spacetime from 'spacetime'
spacetime.extend({ical: function() {
  return this.format('iso').replace(/^(\d+)-(\d+)-/, '$1$2').replace(/[:\.]/, '')
}})
import informal from 'spacetime-informal'

export const webinarsEmpty = { calendar: [], archive: [] }

// const mediaTemplateMeta = {
//   proivder: '',
//   resource: '',
//   id: '',
//   categories: [''],
//   title: '',
//   titleURL: 'https://...',
//   imageURL: 'https://...',
//   hero: { href: imageURL, alt: title },
//   presenters: [''],
//   presentersURL: 'https://...',
//   organization: '',
//   organizationURL: 'https://...',
//   tags: [''],
//   description: '',
//   count: 0,
//   displayCount: '',
//   hours: 0,
//   date: Date, // a Date object, generally the video's post date, used for sorting
//   displayDate: '' // the date shown to humans
// }

// const webinarTemplateMeta = {
//   proivder: '',
//   resource: '',
//   id: '',
//   categories: [''],
//   title: '',
//   titleURL: 'https://...',
//   imageURL: 'https://...',
//   hero: { href: imageURL, alt: title },
//   presenters: [''],
//   presentersURL: 'https://...',
//   organization: '',
//   organizationURL: 'https://...',
//   tags: [''],
//   description: '',
//   event: '',
//   eventURL: 'https://...',
//   date: 'spacetime.js date with timezone',
//   enddate: 'spacetime.js date with timezone',
//   timezone: '',
//   rrule: 'rrule for use with rrule.js',
// }

export async function getWebinars(update = false) {
  let webinars = webinarsEmpty
  if (process.browser) {
    webinars = await doGet()
  }
  return webinars
}

async function doGet() {
  let webinars = {
    calendar: await fetch(url(1)).then(r => r.json()).then(r => r.feed.entry.map(o => new Media(o, 'webinar')).filter(o=>o.status)),
    archive: await fetch(url(2)).then(r => r.json()).then(r => r.feed.entry.map(o => new Media(o)).filter(o=>o.status)),
  }
  return webinars
}

function url(n) { return `https://spreadsheets.google.com/feeds/list/${sheetID}/${n}/public/full?alt=json` }

/**
 * Simple plural formatter for either a number or an array of strings, e.g.:
 *   "1 video", "2 videos", "Chad and David present"
 * @param {mixed} items
 * @param {string} one
 * @param {string} many
 */
function plural(items, one, many) {
  if (typeof items === 'number') return `${items} ${items === 1 ? one : many}`
  if (!items.length) return ''
  if (items.length === 1) return `${items} ${one}`
  if (items.length === 2) return `${items.join(' and ')} ${many}`
  return `${items.join(', ').replace(/^(.+, )(.+)$/, '$1and $2')} ${many}`
}

class Media {
constructor(o, type) {
  if (!o.gsx$published || /[Nn][Oo]/.test(o.gsx$published.$t)) return this // PUBLISH?
  let tz = o.gsx$timezone ? informal.find(o.gsx$timezone.$t) : 'UTC'
  type = type || (o.gsx$resource ? o.gsx$resource.$t : 'video')
  let schema = { type: schemaOrgTypes[type] || 'Thing'}
  if (type === 'playlist') schema['ogType'] = 'video'
  this.meta = { type, schema }

  Object.keys(o).filter(k => k.indexOf('$') > -1).forEach(k => {
    let name = k.slice(4).replace(/url$/, 'URL')
    let v = o[k]['$t']
    if (v.match(/^\d{4}-?\d{2}-?\d{2}T?(?:[-0-9\.:]+Z?)?$/)) v = spacetime(v, tz).goto('UTC')
    else if (v.match(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d+, \d{4}/)) v = spacetime(v, tz)
    else if (v.match(/^[\d,]+(?:\.\d+)?$/)) v = parseFloat(v)
    else if (k.match(/(?:categories|presenters|tags)$/)) v = v.split(/, ?/)
    this.meta[name] = v
  })
  this.meta.href = this.meta.href || this.meta.link || this.meta.URL || this.meta.eventURL || this.meta.titleURL || false

  if (!this.meta.title || !this.meta.href) return this // PUBLISH?
  this.status = true

  if (typeof this.meta.date === 'string' && this.meta.date_2)  this.meta.date = this.meta.date_2

// FIX PLEASE: this is causing blocking errors

//   if (this.meta.starttime && this.meta.timestamp) {
//     // format the VEVENT in vCalendar format
//     this.meta.vevent = `BEGIN:VEVENT
// UID:${spacetime(this.meta.timestamp).ical()}@sacred-traditions.org
// DTSTAMP:${spacetime(this.meta.timestamp).ical()}
// DTSTART:${spacetime(this.meta.starttime).ical()}`
//     if (this.meta.endtime) this.meta.vevent += `\nDTEND:${timestamp(this.meta.endtime).ical()}`
//     if (this.meta.weekly) this.meta.vevent += `\nRRULE:FREQ=WEEKLY`
//     this.meta.vevent += `\nEND:VEVENT`
//     this.meta.vevent = this.meta.vevent.replace(/\.\d{3}Z/gm, 'Z')
//   }

  this.meta.image = {
    src: this.meta.imageURL,
    alt: `${plural(this.meta.presenters || [], 'presenting', 'presenting')} ${this.meta.title}`
  }

  this.meta.timezone = tz
  this.title = this.meta.title
  this.snippet = this.meta.description
  this.image = this.meta.image
  this.html = escapeHtml(this.meta.description).split(/\n+/).map(t => t.trim().length ? `<p>${t}</p>` : '').join('\n')
  this.meta.filtertext = [this.title, this.meta.presenters.join(' | '), this.meta.categories.join(' | '), this.meta.tags.join(' | ')].join(' | ').normalize('NFD').replace(/['"‘’“”\u0300-\u036f]/g, '').toLowerCase()
  return this
}
}

Media.prototype.plural = function(prop, one, many) {
  let val
  if (typeof this[prop] !== 'undefined') val = this[prop]
  else if (typeof this.meta[prop] !== 'undefined') val = this.meta[prop]
  else return ''
  return plural(val, one, many)
}

const schemaOrgTypes = {
  'audio': 'AudioObject',
  'podcast': 'CreativeWorkSeries', // TODO
  'video': 'VideoObject',
  'playlist': 'CreativeWorkSeries', // TODO
  'webinar': 'Course',
}

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return entityMap[s];
  });
}

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

export function initLocalWebinars(data) {
  if (!data || !data.calendar || !data.archive) {
    return data
  }
  data.calendar.forEach(m => initMedia(m))
  data.archive.forEach(m => initMedia(m))
  return data
}

function initMedia(m) {
  let prop
  for (prop in m) {
    if (m[prop].hasOwnProperty('epoch') && m[prop].hasOwnProperty('tz')) m[prop] = spacetime(m[prop])
  }
  for (prop in m.meta) {
    if (m.meta[prop].hasOwnProperty('epoch') && m.meta[prop].hasOwnProperty('tz')) m.meta[prop] = spacetime(m.meta[prop])
  }
}