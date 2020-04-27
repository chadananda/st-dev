<script context="module">
	import getWebinars from '../../components/getWebinars'
	export async function preload({ params, query }) {
		const webinars = await getWebinars()
		return { webinars, noSerialize: () => {} } // noSerialize avoids Sapper caching the returned object for webinars
	}
</script>

<script>
	export let webinars = []
	export let noSerialize
	noSerialize()
	import Video from '../../components/Video.svelte'
	import Debug from '../../components/Debug.svelte'
	console.log(webinars)
</script>

{#if webinars.archive}
	 <!-- content here -->
	 {#each webinars.archive as item}
		  <!-- content here -->
			<Video {item} />
	 {:else}
		  <!-- empty list -->
			empty list: webinars.archive
	 {/each}
{:else}
	 <!-- else content here -->
	no webinars.archive
{/if}