<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`articles.json`).then(r => r.json()).then(articles => {
			 return { articles };
		})
	}
</script>

<script>
  import Seo from '../../components/Seo.svelte'
		export let articles;
		import ArticleSummary from '../../components/ArticleSummary.svelte'

</script>


<Seo
  title="Recent Articles | 𝑺𝒂𝒄𝒓𝒆𝒅-𝑻𝒓𝒂𝒅𝒊𝒕𝒊𝒐𝒏𝒔.𝒐𝒓𝒈"
  description="Essays and translations on the sacred literature of the world’s religious traditions, from Sacred Traditions."/>




<h1>Recent Articles</h1>

{#each articles.filter((ar)=> ar.language==='en') as ar} <ArticleSummary ar={ar} /> {/each}


