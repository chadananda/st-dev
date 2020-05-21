<script>
	import { webinars } from '../../store'
	let items = []
	let endOfDay, ii, day

	import spacetime from 'spacetime'
	let startDate = spacetime.now()
	let tz = startDate.timezone().name
	let endDate = startDate.add(1, 'year')

	$: if ($webinars.calendar) items = $webinars.calendar.reduce((a,e) => {
		if (!e.meta.weekly && e.meta.starttime.isBetween(startDate, endDate)) {
			a.push({date: e.meta.starttime, event: e})
		}
		else if (e.meta.weekly) {
			let time = e.meta.starttime
			while (time.isBefore(endDate)) {
				a.push({date: time, event: e})
				time = time.add(1, 'week')
			}
		}
		return a
	}, []).sort((a,b) => a.date.isAfter(b.date) ? 1 : -1)

	import Media from '../../components/Media.svelte'
	import SvelteInfiniteScroll from 'svelte-infinite-scroll'

</script>

<h2 class="section">Webinars / Online Courses</h2>

{#if !items || items.length === 0}
	{#each Array(24) as item}
		<Media item={false} />
	{/each}
{:else}
	{#each items as item}
		<Media item={item.event} >
			<div class="date">{item.date.goto(tz).format('nice')}</div>
		</Media>
		<SvelteInfiniteScroll threshold={100} on:loadmore={() => {endDate = endDate.add(1, 'month')}} />
	{/each}
{/if}
