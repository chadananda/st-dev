// Production server: compression -> static /static -> Sapper SSR. Deps: polka, sirv,
// compression, @sapper/server. Only used by `npm start`; the site deploys as a static export.
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.error('server failed to listen on port ' + PORT, err);
	});
