<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(content => {
			return { content }
		});
	}
</script>

<script>
  import Seo from '../../components/Seo.svelte'
	 export let content
</script>

<Seo
  title="Recent News: sacred-traditions.org"
  description="News and announcements from Sacred Traditions — course signups, new recordings, and updates to the Ocean 2.0 Interfaith Reader."/>

<h1>Recent news</h1>

<table>
{#each content as item}
	<tr>
		<td>{(new Date(item.meta.pubdate)).toLocaleDateString('en-US', {month: "short", day: "numeric"})}</td>
		<td><a href="/blog/{item.meta.slug}" title="{item.meta.description}">{item.meta.title}</a></td>
	</tr>
{:else}
   <!-- empty list -->
   <p>There are no blog posts available.</p>
{/each}
</table>

<style lang="scss">
	td { padding: .4em 1em; }
</style>