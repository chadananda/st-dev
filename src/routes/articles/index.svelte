<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`articles.json`).then(r => r.json()).then(articles => {
			 return { articles };
		})
	}
</script>

<script>
		export let articles;
		import ArticleSummary from '../../components/ArticleSummary.svelte'

</script>


<svelte:head>
	 <title>Recent Articles | 𝑺𝒂𝒄𝒓𝒆𝒅-𝑻𝒓𝒂𝒅𝒊𝒕𝒊𝒐𝒏𝒔.𝒐𝒓𝒈 </title>
</svelte:head>



<h1>Recent Articles</h1>

{#each articles.filter((ar)=> ar.language==='en') as ar} <ArticleSummary ar={ar} /> {/each}


