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

<h1 class="title">2020 Course Catalog</h1>

<SessionList course={true} />

{#if content.length}
	<div class="courses">
	{#each content as item}
		<!-- course summary here -->
		<div class="course_summary">
				{#if item.meta.image}
					<img src="{item.meta.image}" alt="{item.meta.altText || `A photo of ${item.meta.title}.`}" class="floater" />
				{/if}
				<h2><a href="/courses/{item.meta.slug}">{item.meta.title}</a></h2>

				{#if item.excerpt}
						{@html item.excerpt}
				{/if}
		</div>
		<div class="clearfix" />
	{/each}
	</div>
{/if}
