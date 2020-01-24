import getContent from '../../components/getContent'

let lookup;

export function get(req, res) {
	if (!lookup || process.env.NODE_ENV !== 'production') {
		lookup = new Map();
		getContent('blog', {sort: 'pubdate', sortDir: 'desc'}).forEach(post => {
			lookup.set(post.meta.slug, post);
		});
	}

	let post = lookup.get(req.params.slug);
	console.log(post)
	console.log(lookup)

	if (post) {
		res.writeHead(200, {
			// 'Cache-Control': `max-age=${5 * 60 * 1e3}`, // 5 minutes
		})
		res.end(JSON.stringify(post))
	}
	else {
		res.writeHead(404)
		res.end(JSON.stringify({message: "Not found"}))
	}
}
