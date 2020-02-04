<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`courses.json`).then(r => r.json()).then(content => {
			return { content }
		})
	}
</script>

<script>
	 export let content
	 import getSessions from '../../components/getSessions'
		import SessionList from '../../components/SessionList.svelte'
		import { goto } from '@sapper/app'
	 let sessions
	 getSessions().then(data => {sessions=data})
</script>

<h1 class="title">2020 Course Catalog</h1>

{#if sessions}
	<SessionList {sessions} />
{/if}

{#if content.length}
	<hr class="squiggle" />
	<div class="courses">
	{#each content as item}
		<!-- course summary here -->
		<div class="course_summary m-6" on:click={()=> goto(`/courses/{item.meta.slug}`)}>
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


<style>
 hr.squiggle {
		margin: 2em; width: 100%; height: 30px; border:0;
		background: url("/squiggle.svg"); background-repeat: no-repeat;
		background-position: center;
		background-size: 100px;
		opacity: .75;
	}
</style>

