<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
 import ArticleFooter from '../components/ArticleFooter.svelte';
	export let segment;
</script>

<style>
	.main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	.ocean {
  position: relative;
		width: 100%;
	}
</style>

{#if segment && segment.match(/ocean/g)}

<main class="ocean">
	 <slot></slot>
</main>


{:else}

<Nav {segment}/>
<main class="main"> <slot></slot> </main>

<ArticleFooter />
<Footer/>

<script type="text/javascript">
	// defer loading of css
	let tach = "https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
	var giftofspeed2 = document.createElement('link');
		giftofspeed2.rel = 'stylesheet';
		giftofspeed2.href = tach;
		giftofspeed2.type = 'text/css';
	var godefer2 = document.getElementsByTagName('link')[0];
	godefer2.parentNode.insertBefore(giftofspeed2, godefer2);
</script>

{/if}


