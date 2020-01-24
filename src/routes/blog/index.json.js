import getContent from '../../components/getContent'

const c = getContent('blog', {sort: 'pubdate', sortDir: 'desc'})

export function get(req, res) {
	res.writeHead(200, {
		 'Content-Type': 'application/json'
	})
	res.end(JSON.stringify(c));
}
