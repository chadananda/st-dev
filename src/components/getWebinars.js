const sheetID = '1nlsYAMLxbLdaf1gBJGgyMze4AvKfaws4zQbqEBi4iYw'
const cacheMinutes = 15
import spacetime from 'spacetime'

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

export default async function getWebinars(update = false) {
  let webinars = []
  if (process.browser) {
    if (update) {
      webinars = await doGet()
      return webinars
    }
    webinars = JSON.parse(localStorage.getItem('webinars') || '{}');
    let cacheTime = new Date()
    cacheTime.setMinutes(cacheTime.getMinutes() - cacheMinutes)
    if ((localStorage.getItem('webinarsCacheTime') || '0') < cacheTime.toString()) {
      webinars = await doGet()
    }
  }
  return webinars
}

async function doGet() {
  let webinars = {
    calendar: await fetch(url(1)).then(r => r.json()).then(r => r.feed.entry.map(o => transformItem(o, 'webinar')).filter(o=>o)),
    archive: await fetch(url(2)).then(r => r.json()).then(r => r.feed.entry.map(o => transformItem(o)).filter(o=>o))
  }
  localStorage.setItem('webinars', JSON.stringify(webinars))
  localStorage.setItem('webinarsCacheTime', new Date())
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

function transformItem(o, type) {
  let tz = o.gsx$timezone && o.gsx$timezone.$t ? o.gsx$timezone.$t : 'UTC'
  type = type || (o.gsx$resource ? o.gsx$resource.$t : 'video')
  let schema = { type: schemaOrgTypes[type] || 'Thing'}
  if (type === 'playlist') schema['ogType'] = 'video'
  let meta = { type, schema }

  Object.keys(o).filter(k => k.indexOf('$') > -1).forEach(k => {
    let name = k.slice(4).replace(/url$/, 'URL')
    let v = o[k]['$t']
    if (v.match(/^\d{4}-\d{2}-\d{2}(?:T[-0-9\.:]+Z)?$/)) v = spacetime(v, tz)
    else if (v.match(/^[\d,]+(?:\.\d+)?$/)) v = parseFloat(v)
    else if (k.match(/(?:categories|presenters|tags)$/)) v = v.split(/, ?/)
    meta[name] = v
  })

  if (typeof meta.date === 'string') {
    meta.displayDate = meta.date
    meta.date = meta.date_2
  }
  else if (meta.date) {
    meta.displayDate = meta.date.format('nice')
  }

  if (typeof meta.count === 'number') meta.displayCount = plural(meta.count, meta.type, meta.type.trim() + 's')

  meta.image = {
    src: meta.imageURL,
    alt: `${plural(meta.presenters || [], 'presenting', 'presenting')} ${meta.title}`
  }
  meta.href = meta.href || meta.link || meta.eventURL || meta.titleURL || false

  if (!meta.title || !meta.href) return false

  return Object.assign({ meta }, {
    title: meta.title,
    snippet: meta.description,
    image: meta.image,
    html: escapeHtml(meta.description).replace().split(/\n*/).map(t => t.trim().length ? `<p>${t}</p>` : '').join('\n'),
  })
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