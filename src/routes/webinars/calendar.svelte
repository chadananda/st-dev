<script>
	export let webinars
	export let noSerialize
	noSerialize()
	let events = webinars.calendar
	let items = []
	let endOfDay, ii, day

	import spacetime from 'spacetime'
	let currDate = spacetime.now().goto('GMT').startOf('day')
	let endDate = currDate.endOf('month')

	$: while (events && !endDate.isBefore(currDate)) {
		ii = []
		day = ''
		endOfDay = currDate.endOf('day')
		events.single.forEach(e => {
			if (e.meta.starttime.isBetween(currDate, endOfDay)) ii.push(e)
		})
		events[currDate.format('day-short')].forEach(e => {
			if (endOfDay.isAfter(e.meta.starttime) && (!e.meta.repeatuntil || currDate.isBefore(e.meta.repeatuntil))) {
				ii.push(Object.assign({date: currDate.clone().time(spacetime(e.meta.starttime).format('time'))}, e))
			}
		})
		items = [...items, ...ii.sort((a,b) => a.date.isBefore(b))]
		console.log(currDate)
		currDate = currDate.add(1, 'day')
	}

	import Media from '../../components/Media.svelte'
	import SvelteInfiniteScroll from 'svelte-infinite-scroll'

</script>

<script context="module">
	import getWebinars from '../../components/getWebinars'
	export async function preload({ params, query }) {
		const webinars = await getWebinars()
		return { webinars, noSerialize: () => {} } // noSerialize avoids Sapper caching the returned object for webinars
	}
</script>

<h2 class="section">Webinars / Online Courses</h2>

{#if !items || items.length === 0}
	{#each Array(24) as item}
		<Media item={false} />
	{/each}
{:else}
	{#each items as item}
		<Media { item }>
			<div class="date">{item.date.format('nice')}</div>
		</Media>
		<SvelteInfiniteScroll threshold={100} on:loadmore={() => {endDate = endDate.add(1, 'month')}} />
	{/each}
{/if}
