<script>
	export let segment;
</script>

<header>
	<img class='logo' src="logo_lotus.svg" alt='our logo: a lotus bloom'/>
	<h1>Sacred Traditions</h1>
</header>

<nav>
	<a href="/">
		<img class="logo_icon" src="/favicon.ico" alt="our logo: a lotus bloom" />
		Home
	</a>
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
  nav {
		position: -webkit-sticky; /* Safari */
		position: sticky !important;
		top: -4px;
		z-index: 1000;
		margin-top: 1em;
		overflow: hidden;
		border-color: $color-border;
		box-shadow: 0px 2px 6px 0px rgba(184,191,255,0.49);
		border-style: solid none;
		border-width: .125rem;
		text-align: center;
		background: $color-bg;
		a {
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
			 margin: 0; padding:0; margin-top:1em;
			 text-align: center;
		}
		header img.logo {
		  width: 200px; max-width: 50%; margin: 0; padding:0;
		}
		header h1 {
			 margin:0;
			 font-size:3rem;
			 font-weight:100;
			 font-family: avenir next, avenir, sans-serif;
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