<script>
	 export let segment;
</script>

<header class="bg-white black-80 tc pv4 avenir">
   <img class='logo' src="logo_lotus.svg" alt='logo'/>
			<h1 class="mt2 mb0 baskerville i fw1 f1">Sacred Traditions</h1>
			<!-- <h2 class="mt2 mb0 f6 fw4 ttu tracked">Your amazing subtitle</h2> -->
</header>

<nav class="bg-white bt bb tc mw12 center mt2 bw1">
		<a class="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/">
		<img class="logo_icon" src="/favicon.ico" alt="logo icon" />
		Home</a>
		<a class="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/ocean">
		<img class="logo_ocean" src="/ocean_assets/favicon/favicon-32x32.png" alt="logo icon" />
		Ocean 2.0</a>
		<a class="f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" href="/about">About</a>
		<a class="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/contact">Contact</a>
		<!-- <a class="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/contact">Language: (en) +</a> -->
		<a class="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/articles">Articles</a>
</nav>

<style>
  nav {
			 position: -webkit-sticky; /* Safari */
			 position: sticky !important;
			 top: -4px;
				z-index: 1000;
				margin-top: 1em;
				overflow: hidden;
				border-color: #d9d5ef;
				box-shadow: 0px 2px 6px 0px rgba(184,191,255,0.49);
		}
		header {
			 margin: 0; padding:0; margin-top:1em;
		}
		header img.logo {
		  width: 200px; max-width: 50%; margin: 0; padding:0;
		}
		header h1 {
			 margin:0;
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

 *, img, h1, h2 { transition: all .2s linear; }
</style>