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
const now = (new Date()).toISOString().split('T')[0]

export default function getContent(filePath = '', opts = {}) {
  let options = {
    index: false,
    path: opts.path || filePath,
    extensions: ['md'] || opts.md,
    sort: 'title',
    sortDir: ['desc','d',-1].indexOf(opts.sortDir || '') !== -1 ? -1 : 1,
  }

  try {
    return klaw(path.resolve(basePath + '/' + filePath), {nodir: true})
    .filter(o => path.parse(o.path).ext === '.md')    // only files that are .md
    .map(o => {                                       // parse markdown and json for files
      let f = matter.read(o.path, { excerpt:true })
      f.meta = Object.assign({image: {}, schema: {}}, f.data)
      f.meta.file = {
        path: o.path,
        date: o.stats.ctime,
        size: o.stats.size
      }
      delete f.orig
      f.meta.title = f.meta.title || path.parse(f.meta.file.path).name.replace(/[-_]/g, ' ')
      f.meta.pubdate = f.meta.pubdate || f.meta.file.date.toISOString().split('T')[0]

      if (!f.excerpt) {
        // try to get the first paragraph
        f.excerpt = (f.content.match(/(?:^\n?|\n\n)( {0,3}\w(?:[\s\S](?!\n(?=\n|\s{0,3}(?:[-_\*=] ?){3,})))+\b\W?)/) || [])[1] || ''
        // if it was successful, excerpt some text
        if (f.excerpt) {
          f.excerpt = f.excerpt.replace(/\n+/g, '')                             // remove line breaks
                               .replace(/!\[[^\]\n]+\]\([^\)\n]+\)/gm, '')      // remove images
                               .replace(/\[([^\]\n]+)\]\([^\)\n]+\)/gm, '$1')   // remove links
                               .trim().match(/^.{0,240}\b\W?/m)[0].trim()       // excerpt & trim
          if (/[^\.\?!]$/.test(f.excerpt)) f.excerpt += '...'                   // add elipsis to fragments
          f.excerpt = md.render(f.excerpt)
        }
      }
      else {
        f.content = f.content.replace(f.excerpt + '---', '')                // remove explicit excerpts
      }

      if (options.index) delete f.content
      else f.html = md.render(f.content)

      if (!f.meta.description) f.meta.description = f.excerpt.replace(/<[^>]+?>/gm, '').replace(/\n/gm, ' ').trim()
      f.meta.slug = slugify(path.parse(o.path).name, {lower:true, remove: /[*+~.()'"!:@,]/g})
      f.meta.id = f.meta.slug
      f.meta.href = `/${options.path}/${f.meta.id}`
      if (f.meta.image && typeof f.meta.image === 'string') f.meta.image = { src: f.meta.image, alt: f.meta.title }
      if (!f.meta.hero) f.meta.hero = f.meta.image
      else if (typeof f.meta.hero === 'string') f.meta.hero = { src: f.meta.hero, alt: f.meta.title }
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
