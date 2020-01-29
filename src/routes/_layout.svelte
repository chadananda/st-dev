<script>
	 export let segment
	 import Nav from '../components/Nav.svelte'
		import Footer from '../components/Footer.svelte'

		var pageTypeClass = 'base'
		//if (segment) {
				if (segment.match(/ocean/g)) pageTypeClass = 'ocean'
				else if (segment.match(/articles/g)) pageTypeClass = 'article'
				else if (segment.match(/blog/g)) pageTypeClass = 'blog'
				else if (segment.match(/courses/g)) pageTypeClass = 'course'
		//}
		console.log('_layout segment:', segment, pageTypeClass)
</script>

<style lang="scss" global>
	 @import "./style/global.scss";
</style>

{#if segment && segment.match(/ocean/g)}
 	<main class="{pageTypeClass}">
		 	<slot></slot>
	 </main>

{:else}
		<div class="{pageTypeClass} relative z-0">
			<Nav class="" {segment}/>
			<main class="main"><slot></slot></main>
		</div>
		<div class="absolute top-0 right-0 text-gray-400 text-xs mr-0 pr-1"><span class="sm:hidden">xs</span>
				<span class="hidden sm:inline md:hidden">sm</span><span class="hidden md:inline lg:hidden">md</span>
				<span class="hidden lg:inline xl:hidden">lg</span><span class="hidden xl:inline">xl</span>
		</div>
		<Footer/>
{/if}


