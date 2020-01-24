const path = require('path');
const basePath = path.resolve(process.cwd() + '/src/content')
const fs = require('fs') // synchronous fs
const klaw = require('klaw-sync') // synchronous recursive file listing
const parse = require('gray-matter')
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
      let f = parse(fs.readFileSync(o.path))
      console.log(f)
      f.meta = Object.assign({}, f.data)
      f.meta.file = {
        path: o.path,
        date: o.stats.ctime,
        size: o.stats.size
      }
      delete f.orig
      // delete f.data
      f.meta.title = f.meta.title || path.parse(f.meta.file.path).name.replace(/[-_]/g, ' ')
      f.meta.pubdate = f.meta.pubdate || new Moment(f.meta.file.date, 'YYYY-MM-DD')
      f.html = md.render(f.content)
      f.meta.slug = slugify(f.meta.title, {lower:true, remove: /[*+~.()'"!:@,]/g})
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
