{#if $page.path != '/'}

	<nav class="flex justify-between align-center sticky bg-white z-10 transition-transform">
  <!-- content page site logo  -->
			<div class="flex justify-start align-center cursor-pointer">
					<div><a href="/"><img class='w-16 ml-1 mt-1' src="logo_lotus.svg" alt='logo: lotus'/></a></div>
					<div class="ml-1 -mt-6 hidden sm:inline"><a href="/"><img class="h-24" src="sacred-traditions-title.svg" alt='sacred traditions' /></a></div>
			</div>
  <!-- content page nav links  -->
		<div class="flex justify-end align-center mt-1">

			{#if $cart.length}
				<a href="/courses/checkout" class="block mr-1 md:mr-6 rounded-full relative" style="width:40px">
					<img class="w-8" style="opacity:.5; margin-top:8px;" src="https://upload.wikimedia.org/wikipedia/commons/0/00/Shopping_cart_font_awesome.svg" alt="Shopping cart FontAwesome">
					<span class="cartcount">{$cart.length}</span>
				</a>
			{/if}


		 <a class="block mr-1 md:mr-6 p-2 rounded-full" href="/ocean">
			  <img class="w-5 inline -mt-1" src="/ocean_assets/images/ocean-logo2.svg" alt="Ocean 2.0 Reader" />
					<span class="hidden sm:inline">Ocean </span><span class="hidden md:inline"> 2.0 </span><span class="hidden lg:inline"> Reader</span>
			</a>

		 <a class="block mr-1 md:mr-6 p-2 rounded-full" href="/webinars">
			  <img class="w-6 inline -mt-1" src="/webinar.svg" alt="upcoming webinars" />
		 	 <span class="hidden sm:inline"> Webinars</span>
			</a>

			<a class="block mr-1 p-2 rounded-full" href="/videos">
			  <img class="w-5 inline -mt-1 opacity-75" src="/ed-video.svg" alt="educational media" />
					<span class="hidden lg:inline">Educational </span> <span class="hidden sm:inline">Videos</span>
			</a>

		 <a class="block mr-1 md:mr-6 p-2 rounded-full" href="/courses">
			  <img class="w-6 inline -mt-1" src="/retreat.svg" alt="the world inside a drop" />
				<span class="hidden lg:inline">2021</span>	<span class="hidden md:inline"> Study</span> <span class="hidden sm:inline">Retreats</span>
			</a>





		 <!-- <a class="block mr-1 md:mr-6 p-2 rounded-full" href="/news">
			  <img class="w-6 inline -mt-1" src="/news.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">News </span><span class="hidden lg:inline"> &amp; Announcments</span>
			</a> -->



		 <!-- <a class="block mr-1 p-2 rounded-full" href="/articles">
			  <img class="w-5 inline -mt-1 opacity-50" src="/thinker.svg" alt="the world inside a drop" />
					<span class="hidden lg:inline">Interfaith </span> <span class="hidden sm:inline">Essays</span>
			</a> -->


		</div>
	</nav>

{/if}
{#if $page.path === '/'}

 <!-- Home page header logo with text -->
	<header class="flex justify-center mt-1 mb-3 z-10">
		 <img class='w-1/3 max-w-xs' src="/logo2.svg" alt='our logo: a lotus bloom'/>
	</header>
 <!-- Home page Nav links -->
	<nav class="flex justify-center items-center sticky bg-white">

		 <a class="block mr-10 p-2 rounded-full" href="/ocean">
			  <img class="w-5 inline -mt-1" src="/ocean_assets/images/ocean-logo2.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">Ocean </span><span class="hidden md:inline"> 2.0 </span><span class="hidden lg:inline">  Reader</span>
			</a>

		 <!-- <a class="block mr-12 p-2 rounded-full" href="/news">
			  <img class="w-8 pl-1 inline -mt-1" src="/news.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">News </span><span class="hidden lg:inline"> &amp; Announcments</span>
			</a> -->
		 <!-- <a class="block mr-12 p-2 rounded-full" href="/articles">
			  <img class="w-6 inline -mt-1 opacity-50" src="/thinker.svg" alt="the world inside a drop" />
					<span class="hidden md:inline">Interfaith </span> <span class="hidden sm:inline">Essays</span>
			</a> -->

			 <a class="block mr-1 md:mr-2 p-2 rounded-full" href="/webinars">
			  <img class="w-6 inline -mt-1" src="/webinar.svg" alt="upcoming webinars" />
		 	 <span class="hidden sm:inline"> Webinars</span>
			</a>

			<a class="block mr-1 p-2 rounded-full" href="/videos">
			  <img class="w-5 inline -mt-1 opacity-75" src="/ed-video.svg" alt="educational media" />
					<span class="hidden lg:inline">Educational </span> <span class="hidden sm:inline">Videos</span>
			</a>

		 <a class="block mr-6 p-2 rounded-full" href="/courses">
			  <img class="w-8 pl-1 inline -mt-1" src="/retreat.svg" alt="the world inside a drop" />
					<span class="hidden lg:inline">Study</span> <span class="hidden sm:inline">Retreats</span>
			</a>

	</nav>

{/if}





<script>
	 import { stores } from '@sapper/app';
	 const { preloading, page, session } = stores();
	 import { cart } from '../store'
	 cart.useLocalStorage()
</script>




<style>
 nav {
			top: -4px;
			margin-top: -4px;
			border-color: #dcdaf8;;
			box-shadow: 0px 2px 6px 0px rgba(184,191,255,0.49);
			border-style: solid none;
			border-width: .125rem;
			height: 50px;
			padding-bottom: 2px;
	}
	nav a:hover {
		 background-color: #d4d0ed;
	}
	.cartcount {
		font-family: Georgia, 'Times New Roman', serif;
		position: absolute;
		top: 3px;
		right: 8px;
		height: 22px;
		width: 22px;
		background: #eef;
		text-align: center;
		border-radius: 22px;
		border: 1px solid gray;
		line-height: 18px;
	}
</style>