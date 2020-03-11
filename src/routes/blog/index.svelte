<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(content => {
			return { content }
		});
	}
</script>

<script>
	 export let content
</script>

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