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
	import Media from '../../components/Media.svelte'
	import Debug from '../../components/Debug.svelte'
</script>

{#if !webinars.calendar || webinars.calendar.length === 0}
	{#each Array(24) as item}
		<Media item={false} />
	{/each}
{:else}
	<h2 class="section">Webinars / Online Courses</h2>
	{#each webinars.calendar as item}
		<Media {item}>

		</Media>
	{/each}
{/if}

{#if !webinars.archive || webinars.archive.length === 0}
	{#each Array(24) as item}
		<Media item={false} />
	{/each}
{:else}
	<h2 class="section">Media Archive</h2>
	{#each webinars.archive as item}
			<Media {item}>
				<div class="flex">
					<div class="provider flex-initial">{item.meta.provider}</div> &nbsp;·&nbsp;
					<div class="count flex-initial">{item.meta.count} videos</div>
					<div class="duration flex-auto text-right" itemprop="duration" value="{item.meta.duration}">{item.meta.hours}</div>
				</div>
			</Media>
	{/each}
{/if}
