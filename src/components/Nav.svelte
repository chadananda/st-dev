<script>
	export let segment;
	import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
</script>

{#if $page.path === '/'}
	<header class="front">
		<img class='logo' src="logo_lotus.svg" alt='our logo: a lotus bloom'/>
		<h1>Sacred Traditions</h1>
	</header>
{/if}

<nav class:front={$page.path === '/'} >
	{#if $page.path !== '/'}
		<header>
			<a href="/">
				<img class='logo' src="logo_lotus.svg" alt='our logo: a lotus bloom'/>
				<h1>Sacred Traditions</h1>
			</a>
		</header>
	{/if}

	<a href="/ocean">
		<img class="logo_ocean" src="/ocean_assets/favicon/favicon-32x32.png" alt="the world inside a drop" />
		Ocean 2.0
	</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
	<a href="/articles">Articles</a>
</nav>

<style lang="scss">
	@import "../style/theme.scss";

	a {
		text-decoration: none;
	}
  nav {
		position: -webkit-sticky; /* Safari */
		position: sticky !important;
		top: -4px;
		z-index: 1000;
		margin-top: -4px;
		overflow: hidden;
		border-color: $color-border;
		box-shadow: 0px 2px 6px 0px rgba(184,191,255,0.49);
		border-style: solid none;
		border-width: .125rem;
		text-align: right;
		background: $color-bg;
		>a {
			font-size: 1rem;
			padding: 1rem 2rem;
			transition: all .15s ease-in;
			opacity: .8;
			text-decoration: none;
			display: inline-block;
			text-align: center;
			&:hover {
				background-color: $color-hover;
				color: $color-bg;
			}
		}
	}

	header {
		padding: 0;
		text-align: center;
		position: static;
		img.logo {
			width: 200px;
			max-width: 50%;
			margin: 0;
			padding: 0;
		}
		h1 {
			margin: 0;
			font-weight: 100;
			font-family: avenir next, avenir, sans-serif;
			font-size: 3rem;
		}
	}

	nav.front {
		text-align: center;
	}
	nav header {
		position: absolute;
		left: 1rem;
		top: .7rem;
		z-index: 1;
		img.logo {
			width: 44px;
			display: inline-block;
		}
		h1 {
			font-size: 2rem;
			display: inline-block;
			vertical-align: bottom;
		}
	}
	img.logo_icon {
		width: 20px; margin:0; padding: 0; margin-bottom: -8%; padding-right: .3em;
	}
	img.logo_ocean {
		width: 18px; margin:0; padding: 0; margin-bottom: -4%; margin-right: .2em; opacity: .8;
	}
 @media (max-width: 400px) {
   header h1 { font-size: calc(4vw + 4vh + 2vmin)}
			header img {width: 100%}
 }

</style>