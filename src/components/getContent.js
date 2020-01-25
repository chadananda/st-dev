const path = require('path');
const basePath = path.resolve(process.cwd() + '/src/content')
const klaw = require('klaw-sync') // synchronous recursive file listing
const matter = require('gray-matter')
const md = require('markdown-it')('commonmark', {
  typographer: true,
  linkify: true,
  xhtmlOut: true,
})
const slugify = require('slugify')
const Moment = require('moment')
const now = new Moment(new Date(), 'YYYY-MM-DD')

export default function getContent(filePath = '', opts = {}) {
  let options = {
    extensions: ['md'] || opts.md,
    sort: 'title',
    sortDir: ['desc','d',-1].indexOf(opts.sortDir || '') !== -1 ? -1 : 1,
  }

  try {
    return klaw(path.resolve(basePath + '/' + filePath), {nodir: true})
    .filter(o => path.parse(o.path).ext === '.md')    // only files that are .md
    .map(o => {                                       // parse markdown and json for files
      let f = matter.read(o.path, { excerpt:true })
      f.meta = Object.assign({}, f.data)
      f.meta.file = {
        path: o.path,
        date: o.stats.ctime,
        size: o.stats.size
      }
      delete f.orig
      f.meta.title = f.meta.title || path.parse(f.meta.file.path).name.replace(/[-_]/g, ' ')
      f.meta.pubdate = f.meta.pubdate || new Moment(f.meta.file.date, 'YYYY-MM-DD')
      if (!f.excerpt.length) {
        f.excerpt = f.content.replace(/^#+ [^\n]+$/gm, '')                // remove headers
                  .replace(/!\[[^\]\n]+\]\([^\)\n]+\)/gm, '')           // remove images
                  .replace(/\[([^\]\n]+)\]\([^\)\n]+\)/gm, '$1')        // remove links
                  .match(/^\s*((?:[\s\S](?!\n\n)){0,240}\b\W?)/m)[1]    // excerpt
                  .trim() || ''                                         // trim, default to empty
        if (/[^\.\?!]$/.test(f.excerpt)) f.excerpt += '...'                 // add elipsis to fragments
      }
      else {
        f.content = f.content.replace(f.excerpt + '---', '')            // remove explicit excerpts
      }
      f.excerpt = md.render(f.excerpt)
      f.excerptText = f.excerpt.replace(/<[^>]+?>/g, '')
      f.html = md.render(f.content)
      f.meta.slug = slugify(path.parse(o.path).name, {lower:true, remove: /[*+~.()'"!:@,]/g})
      return f
    })
    .filter(f => f.meta.pubdate <= now)
    .sort((a,b) => {
      if (a.meta[options.sort] < b.meta[options.sort]) return -(options.sortDir)
      if (a.meta[options.sort] > b.meta[options.sort]) return options.sortDir
      return 0
    })
  }
  catch(e) {
    console.error(e)
  }
  return []
}
