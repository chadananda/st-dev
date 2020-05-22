<script>
	 export let segment
	 import Nav from '../components/Nav.svelte'
		import Footer from '../components/Footer.svelte'


// import { page } from '@sapper/app'
// const  {slug} = $page.params
// console.log(slug)

	 // segment is sometimes undefined for a moment, make it reactive
		// let pageTypeClass = 'base'
		// $: pageTypeClass = segment && ['ocean','articles','blog','courses'].indexOf(segment)>-1 ? segment : 'base'
		// console.log('_layout segment:', segment, pageTypeClass) // most enlightening
</script>

<style lang="scss" global>
	 @import "./style/global.scss";
</style>



{#if segment && segment.match(/ocean/g)}
 	<main class="ocean">
		 	<slot></slot>
	 </main>


{:else if segment && segment.match(/webinar/)}
		<div class="relative z-0">
			<Nav class="" {segment}/>
			<main class="relative"><slot></slot></main>
		</div>
		<div class="absolute top-0 right-0 text-gray-400 text-xs mr-0 pr-1"><span class="sm:hidden">xs</span>
				<span class="hidden sm:inline md:hidden">sm</span><span class="hidden md:inline lg:hidden">md</span>
				<span class="hidden lg:inline xl:hidden">lg</span><span class="hidden xl:inline">xl</span>
		</div>
		<Footer/>

{:else}
		<div class="relative z-0">
			<Nav class="" {segment}/>
			<main class="main"><slot></slot></main>
		</div>
		<div class="absolute top-0 right-0 text-gray-400 text-xs mr-0 pr-1"><span class="sm:hidden">xs</span>
				<span class="hidden sm:inline md:hidden">sm</span><span class="hidden md:inline lg:hidden">md</span>
				<span class="hidden lg:inline xl:hidden">lg</span><span class="hidden xl:inline">xl</span>
				<!-- <pre>{JSON.stringify($page.query, null, 2)}</pre> -->
		</div>
		<Footer/>

{/if}




