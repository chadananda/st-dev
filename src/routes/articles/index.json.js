import articles from './_articles.js';

// const contents = JSON.stringify(articles.map(ar => {
//  	ar.html = '';
// 	 return ar;
// }));

const contents = JSON.stringify(articles);

export function get(req, res) {
	res.writeHead(200, {
		 'Content-Type': 'application/json'
	});

	res.end(contents);
}