<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	export let segment;
</script>

<style lang="scss" global>
	 @import "./style/global.scss";
</style>

{#if segment && segment.match(/ocean/g)}

<main class="ocean">
	 <slot></slot>
</main>

{:else}

<div class="main-wrapper">
	<Nav {segment}/>
	<main class="main">
			<slot></slot>
	</main>
</div>
<Footer/>

{/if}


