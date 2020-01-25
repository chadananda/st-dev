<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`courses.json`).then(r => r.json()).then(content => {
			return { content }
		});
	}
</script>

<script>
	 export let content
	 import SessionList from '../../components/SessionList.svelte'
</script>

<h1 class="title">Our Programs</h1>

{#if content.length}
	<div class="courses">
	{#each content as item}
		<!-- content here -->
		<h2><a href="/courses/{item.meta.slug}">{item.meta.title}</a></h2>
		{#if item.meta.image}
			<img src="{item.meta.image}" alt="{item.meta.altText || `A photo of ${item.meta.title}.`}" />
		{/if}
		{#if item.excerpt}
			<p>{item.excerpt}</p>
		{/if}
		<div class="clearfix" />
	{/each}
	</div>
{/if}

<SessionList course={true} />
