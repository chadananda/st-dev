<script context="module">
	import getSessions from '../../components/getSessions'
	export async function preload({ params, query }) {
		const content = await this.fetch(`courses.json`).then(r => r.json())
		const sessions = await getSessions()
    return { content, sessions, noSerialize: () => {} };
	}
</script>

<script>
	export let content
	export let sessions
	export let noSerialize
	noSerialize()
	import SessionList from '../../components/SessionList.svelte'
	import { goto } from '@sapper/app'
</script>

<h1 class="title">2020 Course Catalog</h1>

{#if sessions}
	<SessionList {sessions} />
{/if}

{#if content.length}
	<hr class="squiggle" />
	<div class="courses">
	{#each content as item}
  <!--

    TODO: be able to gray out or remove any programs that are PAST, TENTATIVE or FULL

		-->
		<!-- course summary here -->
		<div class="course_summary m-6" on:click={()=> goto(`/courses/${item.meta.slug}`)}>
				{#if item.meta.image}
					<img src="{item.meta.image}" alt="{item.meta.altText || `${item.meta.title}`}" class="floater" />
				{/if}
				<h2><a href="/courses/{item.meta.slug}">{item.meta.title}</a></h2>
				<h4 class="teacher"> ~ {item.meta.teachers.join(', ')} </h4>
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
	.courses .teacher {
		 margin-top: -10px; margin-left: .25em; color: gray; font-style: italic;
	}
</style>

