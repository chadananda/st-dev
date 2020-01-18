<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
 import ArticleFooter from '../components/ArticleFooter.svelte';
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


