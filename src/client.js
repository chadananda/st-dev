// Sapper client entry. Hydrates the SSR'd markup into #sapper. Deps: @sapper/app
import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});