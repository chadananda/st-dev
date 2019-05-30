
// This file is called `_articles.js` rather than `articles.js`, because
// we don't want to create an `/articles/articles` route — the leading
// underscore tells Sapper not to do that.

const {read, exists, copy} = require('fs-sync') // synchronous fs
const klaw = require('klaw-sync') // synchronous recursive file listing
const path = require('path')
const yaml = require('js-yaml') // for parsing md front-matter fields
const slugify = require('slugify') // for generating slug from title
const Moment = require('moment') // it is so awesome that we are compiling only
const md5 = require('md5') // for generating id hashes from strings

const ARTICLES_DIR = path.resolve(__dirname, '../../../src/content/articles')
const STATIC_DIR = path.resolve(__dirname, '../../../static/articles')

// all articles will be objects sorted by most recent pubdate
var articles = []

if (exists(ARTICLES_DIR)) {
		articles = readArticles(ARTICLES_DIR)
		articles.sort((a, b) => new Date(b.pubdate) - new Date(a.pubdate))
		interlinkArticles(articles)
		copyArticleAssets()
} else console.error('No such dir found: ', articles_dir)

export default articles;


// Synchronous Article Tools
// *******************************

function readArticles(articles_dir) {
		return klaw(articles_dir, {nodir: true})
			.map(o=>o.path) // just want the path
			.filter(f=>path.parse(f).ext==='.md') // and only files that are .md
			.map(file => md2JSON(file)) // translate each MD to JSON
			.map(ar => validateArticleFields(ar)) // validate and repair fields
}

function copyArticleAssets() {
		// gather up all asset files and copy to /static/articles/
		let copycount = 0
		klaw(ARTICLES_DIR, {nodir: true}).map(o=>o.path)
				.filter(f=>path.parse(f).ext.match(/(.gif|.png|.svg|.jpg|.jpeg|.mp3|.m4u|.map)/))
				.forEach(file => {
						let target = STATIC_DIR +'/'+ path.basename(file)
						if (!exists(target)) copycount++ // report new files copies
						copy(file, target) // copy regardless - because we don't want to check to see if it has changed
				})
			if (copycount) console.log('Copied '+copycount+' asset files from articles collection.')
}

function md2JSON(file) {
		let markdown = read(file)
		let json = {file}
		let md = require('markdown-it')()
				.use(require('markdown-it-attrs'))
				.use(require('markdown-it-footnote'))
				.use(require('markdown-it-emoji'))
				.use(require('markdown-it-underline'))
				.use(require('markdown-it-front-matter'), (fm) => {
						let vals = yaml.load(fm.trim()) // parse yaml header from current json object
						Object.keys(vals).forEach(key => json[key] = vals[key])
				})
		json.html = md.render(markdown)
		return json
}

function validateArticleFields(ar) {
  let fname = path.parse(ar.file).name
		// file, parentDir, id, baseid
		ar.parentDir = path.dirname(ar.file).split(path.sep).pop()
		ar.baseid = md5(ar.parentDir).substr(0,10)
		ar.id = md5(ar.file).substr(0,10)
		// verify correct publication date
		let isValidPubdate = function(date) {
			if (date.year() < 2015) return false
			if (date.year() > 2500) return false
			return true
		}
		let date = new Moment(ar.pubdate, "YYYY-MM-DD")
		if (!isValidPubdate(date)) date = new Moment(fname.split('_')[0].trim(), "YYYY-MM-DD")
		if (!isValidPubdate(date)) console.error ('Warning, article has no valid date in header or filename: ', ar.file, date.year())
		ar.pubdate = date.format("YYYY-MM-DD")
		// if language was not specified, get it from the filename -- or default to english
		if (!ar.language || ar.language.length!=2) {
				let fname_lang = fname.split("_").pop()
				ar.language = fname_lang.length===2 ? fname_lang : 'en'
		}
		// generate slug from title & language. Include date?
		ar.slug = ar.pubdate +'_'+ slugify(ar.title, {lower:true, remove: /[*+~.()'"!:@,]/g})
		if (ar.language!='en') ar.slug += '_'+ar.language
		// clean up tags
		if (!ar.tags) ar.tags = ''
		ar.tags = ar.tags.split(',').map(t => t.toLowerCase().trim()).join(',')

		return ar
}

function interlinkArticles(articles) {
		// related articles by tag
		let byid = {};
		articles.forEach(ar => {
			if (ar && ar.id) byid[ar.id]=ar
		})

  // article ids by tag
		let bytag = {}; articles.forEach(ar => {
				let tags = ar.tags.split(',').forEach(t => {
						if (!bytag[t]) bytag[t] = [ar.id]
						  else bytag[t].push(ar.id)
				})
		})

		// build object of information from an article id
		let arinfo = (arid) => {
				if (!arid || !byid[arid]) return
				let ar = byid[arid]
				return {id: ar.id, tags: ar.tags, title: ar.title, slug: ar.slug,
					       language: ar.language, author: ar.author, img: ar.img}
		}

 // give each article information about related articles
 	articles.forEach(ar => {
			// base article
			if (ar.language != 'en') {
					ar.base = arinfo(articles.filter(ar2=>ar.baseid===ar2.baseid).filter(ar2=>ar2.language==='en')[0].id)
   }
			// similar articles
			let tagmatches = []
			ar.tags.split(',').forEach(t => {
					bytag[t].forEach(id2 => {
							let ar2 = byid[id2]
							if (id2!=ar.id && id2!=ar.baseid && ar.language===ar2.language && tagmatches.indexOf(id2)<0) tagmatches.push(id2)
					})
			})

//console.log(tagmatches)

			tagmatches.forEach(id2 => {
					if (!ar.tagmatches) ar.tagmatches = [arinfo(id2)]
					   else ar.tagmatches.push(arinfo(id2))
			})

   //console.log('article matches:', ar.tagmatches)
			// next and previous article
			let lang_ars = articles.filter(ar2 => ar2.language === ar.language) // create a list matching language
			lang_ars.forEach((ar2, i) => {
					if (ar2.id === ar.id) { // found it
							let nxt = i < lang_ars.length-1 ? i+1 : 0
							let prv = i >0 ? i-1 : lang_ars.length-1
							ar.previnfo = arinfo(lang_ars[prv].id)
							ar.nextinfo = arinfo(lang_ars[nxt].id)
					}
			})
	})
// 		// base article by key
// 		// most popular articles??

}


