{#if $page.path != '/'}

	<nav style="display:flex; justify-content:space-between; align-items: center;">

			<div class="logo_area" style="display: flex; justify-content:flex-start; align-items:center; cursor: pointer;">
					<div><a href="/"><img style="height: 40px; margin-left:.5em; margin-top:.5em;" class='logo' src="logo_lotus.svg" alt='our logo: a lotus bloom'/></a></div>
					<div style="margin-left:.5em; margin-top: -40px; margin-bottom: -50px;">
					  <a href="/"><img style="width: 200px;" src="sacred-traditions-title.svg" alt='sacred traditions' /></a></div>
			</div>

		<div class="navlinks" style="display:flex; justify-content:flex-end; align-items:center;">
				<a style="margin-right: 2em;" href="/ocean"><img class="logo_ocean" src="ocean_assets/images/ocean-logo2.svg" alt="the world inside a drop" /> Ocean 2.0</a>
				<a style="margin-right: 2em;" href="/courses">Courses</a>
				<a style="margin-right: 2em;" href="/blog">News</a>
				<a style="margin-right: 2em;" href="/articles">Articles</a>
		</div>

	</nav>

{/if}
{#if $page.path === '/'}

	<header class="flex justify-center mt-1 mb-3">
		 <img class='logo' src="logo2.svg" alt='our logo: a lotus bloom'/>
	</header>

	<nav class="flex justify-center items-center">

		 <a class="block mr-12" href="/ocean">
			  <img class="w-5 inline -mt-1" src="/ocean_assets/images/ocean-logo2.svg" alt="the world inside a drop" />
					<span class="">Ocean 2.0</span>
			</a>

		 <a class="block mr-12" href="/courses">
			  <img class="w-6 inline -mt-1" src="/retreat.svg" alt="the world inside a drop" />
					<span class="">Retreats</span>
			</a>

		 <a class="block mr-12" href="/news">
			  <img class="w-6 inline -mt-1" src="/news.svg" alt="the world inside a drop" />
					<span class="">News &amp; Announcments</span>
			</a>


		 <a class="block mr-12" href="/articles">
			  <img class="w-5 inline -mt-1" src="/thinker.svg" alt="the world inside a drop" />
					<span class="">Esssays</span>
			</a>

	</nav>

{/if}





<script>
	import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
</script>






<style lang="scss">
	@import "../style/theme.scss";

	// a {
	// 	text-decoration: none;
	// }

  nav {
		position: -webkit-sticky; /* Safari */
		position: sticky !important;
		top: -4px;
		z-index: 1000;
		margin-top: -4px;
		// overflow: hidden;
		border-color: $color-border;
		box-shadow: 0px 2px 6px 0px rgba(184,191,255,0.49);
		border-style: solid none;
		border-width: .125rem;
		text-align: right;
		background: $color-bg;
		height: 50px;
		// >a {
		// 	font-size: 1rem;
		// 	padding: 1rem 2rem;
		// 	transition: all .15s ease-in;
		// 	opacity: .8;
		// 	text-decoration: none;
		// 	display: inline-block;
		// 	text-align: center;
		// 	&:hover {
		// 		background-color: $color-hover;
		// 		color: $color-bg;
		// 	}
		// }
	}

	header {
		padding: 0;
		text-align: center;
		position: static;
		img.logo {
			width: 240px;
			max-width: 50%;
			margin: 0; margin-bottom: 10px;
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
		// text-align: center;
	}
	// nav header.not-front {
	// 	position: absolute;
	// 	left: 1rem;
	// 	top: .7rem;
	// 	z-index: 1;
	// 	img.logo {
	// 		width: 44px;
	// 		display: inline-block;
	// 	}
	// 	// h1 {
	// 	// 	font-size: 2rem;
	// 	// 	display: inline-block;
	// 	// 	vertical-align: bottom;
	// 	// }
	// }
	img.logo_ocean {
		width: 20px; margin:0; padding: 0; margin-bottom: -4px; margin-right: .2em; opacity: 1;
	}

 // @media (max-width: 400px) {
 //   header h1 { font-size: calc(4vw + 4vh + 2vmin)}
	// 		header img {width: 100%}
 // }

</style>