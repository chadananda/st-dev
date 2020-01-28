<script>
	 export let segment
	 import Nav from '../components/Nav.svelte'
	 import Footer from '../components/Footer.svelte'
</script>

{#if segment && segment.match(/ocean/g)}

<main class="ocean">
	 <slot></slot>
</main>

{:else}


<style lang="scss" global>
	 @import "./style/global.scss";
</style>


<div class="main-wrapper relative">
	<Nav {segment}/>
	<main class="main">
			<slot></slot>
	</main>
</div>

<div class="absolute top-0 right-0 text-gray-400 text-xs mr-0 pr-1"><span class="sm:hidden">xs</span>
		<span class="hidden sm:inline md:hidden">sm</span><span class="hidden md:inline lg:hidden">md</span>
		<span class="hidden lg:inline xl:hidden">lg</span><span class="hidden xl:inline">xl</span>
</div>
<Footer/>

{/if}


