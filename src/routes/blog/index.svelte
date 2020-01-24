<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(content => {
			console.log(content)
			return { content }
		});
	}
</script>

<script>
	 export let content
</script>

{#each content as item}
   <!-- content here -->
   <h3><a href="/blog/{item.meta.slug}">{item.meta.title}</a></h3>
{:else}
   <!-- empty list -->
   <p>There are no blog posts available.</p>
{/each}