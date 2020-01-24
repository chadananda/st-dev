<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`courses.json`).then(r => r.json()).then(content => {
			console.log(content)
			return { content }
		});
	}
</script>

<script>
	 export let content
</script>

<h1>Courses</h1>

{#each content as item}
   <!-- content here -->
   <h3><a href="/courses/{item.meta.slug}">{item.meta.title}</a></h3>
{/each}
