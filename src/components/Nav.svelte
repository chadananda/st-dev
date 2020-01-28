{#if $page.path != '/'}

	<nav class="flex justify-between align-center sticky bg-white z-10">
  <!-- content page site logo  -->
			<div class="flex justify-start align-center cursor-pointer">
					<div><a href="/"><img class='w-16 ml-1 mt-1' src="logo_lotus.svg" alt='logo: lotus'/></a></div>
					<div class="ml-1 -mt-6"><a href="/"><img class="h-24" src="sacred-traditions-title.svg" alt='sacred traditions' /></a></div>
			</div>
  <!-- content page nav links  -->
		<div class="flex justify-end align-center mt-1">
		 <a class="block mr-1 md:mr-6 p-2 rounded-full" href="/ocean">
			  <img class="w-5 inline -mt-1" src="/ocean_assets/images/ocean-logo2.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">Ocean </span><span class="hidden md:inline"> 2.0 </span><span class="hidden lg:inline"> Reader</span>
			</a>
		 <a class="block mr-1 md:mr-6 p-2 rounded-full" href="/courses">
			  <img class="w-6 inline -mt-1" src="/retreat.svg" alt="the world inside a drop" />
					<span class="hidden md:inline">Study</span> <span class="hidden sm:inline">Retreats</span>
			</a>
		 <a class="block mr-1 md:mr-6 p-2 rounded-full" href="/news">
			  <img class="w-6 inline -mt-1" src="/news.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">News </span><span class="hidden lg:inline"> &amp; Announcments</span>
			</a>
		 <a class="block mr-1 p-2 rounded-full" href="/articles">
			  <img class="w-5 inline -mt-1 opacity-50" src="/thinker.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">Essays</span>
			</a>
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
		 <a class="block mr-12 p-2 rounded-full" href="/ocean">
			  <img class="w-5 inline -mt-1" src="/ocean_assets/images/ocean-logo2.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">Ocean </span><span class="hidden md:inline"> 2.0 </span><span class="hidden lg:inline"> Interfaith Reader</span>
			</a>
		 <a class="block mr-12 p-2 rounded-full" href="/courses">
			  <img class="w-8 pl-1 inline -mt-1" src="/retreat.svg" alt="the world inside a drop" />
					<span class="hidden lg:inline">Study</span> <span class="hidden sm:inline">Retreats</span>
			</a>
		 <a class="block mr-12 p-2 rounded-full" href="/news">
			  <img class="w-8 pl-1 inline -mt-1" src="/news.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">News </span><span class="hidden lg:inline"> &amp; Announcments</span>
			</a>
		 <a class="block mr-12 p-2 rounded-full" href="/articles">
			  <img class="w-6 inline -mt-1 opacity-50" src="/thinker.svg" alt="the world inside a drop" />
					<span class="hidden sm:inline">Essays</span>
			</a>
	</nav>

{/if}





<script>
	 import { stores } from '@sapper/app';
	 const { preloading, page, session } = stores();
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
</style>