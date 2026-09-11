// GET /articles.json -- the article index, without rendered bodies. Deps: ./_articles.js
import articles from './_articles.js';

// The index ships every article's rendered body otherwise: 261KB to render a list of
// titles. Nothing that reads this endpoint uses `html` -- the listing passes each entry to
// ArticleSummary (title, author, img, snip, slug) and jsonlinks reads slug -- and
// /articles/<slug>.json still carries the body for the article pages themselves.
//
// Destructured into a copy rather than assigned away. `articles` is a shared module-level
// array that [slug].json.js imports too, so mutating ar.html here would blank the body on
// every individual article as well.
const contents = JSON.stringify(articles.map(({ html, ...rest }) => rest));

export function get(req, res) {
	res.writeHead(200, {
		 'Content-Type': 'application/json'
	});

	res.end(contents);
}