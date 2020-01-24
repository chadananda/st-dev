<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(content => {
			return { content }
		});
	}
</script>

<script>
	 export let content
	 import Moment from 'moment'
</script>

<h1>Recent news</h1>

<table>
{#each content as item}
	<tr>
		<td>{new Moment(item.meta.pubdate, 'YYYY-MM-DD').format('MMM D')}</td>
		<td><a href="/blog/{item.meta.slug}">{item.meta.title}</a></td>
	</tr>
{:else}
   <!-- empty list -->
   <p>There are no blog posts available.</p>
{/each}
</table>

<style lang="scss">
	td { padding: .4em 1em; }
</style>