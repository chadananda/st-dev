import getContent from '../../components/getContent'

let lookup;

export function get(req, res) {
	if (!lookup || process.env.NODE_ENV !== 'production') {
		lookup = new Map();
		getContent('courses').forEach(post => {
			lookup.set(post.meta.slug, post);
		});
	}

	let post = lookup.get(req.params.slug);

	if (post) {
		res.writeHead(200, {
			'Content-Type': 'application/json',
		})
		res.end(JSON.stringify(post))
	}
	else {
		res.writeHead(404, {
			'Content-Type': 'application/json',
		})
		res.end(JSON.stringify({message: "Not found"}))
	}
}
