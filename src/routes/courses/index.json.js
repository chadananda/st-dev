import getContent from '../../components/getContent'

const c = getContent('courses')

export function get(req, res) {
	res.writeHead(200, {
		 'Content-Type': 'application/json'
	})
	res.end(JSON.stringify(c));
}
