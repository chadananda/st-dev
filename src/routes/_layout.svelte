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

<Footer/>

<script type="text/javascript">
		let addCssLink = function(cssurl) {
				let csslink = document.createElement('link');
				csslink.rel = 'stylesheet'; csslink.href = cssurl; // csslink.type = 'text/css';
				let godefer2 = document.getElementsByTagName('link')[0];
				godefer2.parentNode.insertBefore(csslink, godefer2);
		}
  addCssLink("https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css")
</script>

{/if}


