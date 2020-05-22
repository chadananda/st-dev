<script>
	import { webinars } from '../../store'
	let items = []
	let endOfDay, ii, day

	import spacetime from 'spacetime'
	let startDate = spacetime.now()
	let tz = startDate.timezone().name
	let endDate = startDate.add(1, 'year')

	let search = ''
	let dayFilter = ''

	$: if ($webinars.calendar) items = $webinars.calendar.reduce((a,e) => {

		// filters
		if (search && !e.meta.filtertext.match(search.normalize('NFD').replace(/['"‘’“”\u0300-\u036f]/g, '').toLowerCase())) return a
		if (dayFilter && e.meta.starttime.goto(tz).format('day-short') !== dayFilter) return a

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

	<div class="navcontainer">
		<div class="medianav flex">
			<h2 class="filter-label flex-grow">Webinars / Online Courses</h2>
			<select class="flex-none" bind:value={dayFilter}>
				<option value="">show all days</option>
				<option value="Mon">Monday</option>
				<option value="Tue">Tuesday</option>
				<option value="Wed">Wednesday</option>
				<option value="Thu">Thursday</option>
				<option value="Fri">Friday</option>
				<option value="Sat">Saturday</option>
				<option value="Sun">Sunday</option>
			</select>
			<input type="search" class="w-1/3 flex-none" placeholder="filter by title or author" bind:value={search} />
		</div>
	</div>

	<div class="mediastuff relative flex flex-wrap w-full justify-center">
		{#if !$webinars.calendar}
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
	</div>

<style>
div.navcontainer {
		width: 100%; height: 4em; z-index: 2000;
		position: sticky; top:46px; background: white;
		padding: 5px;
}
.medianav {
		margin-left:2em; margin-right: 2em; margin-top: .2em; height: 3em;
		border-radius: 10px;
		border: 1px solid rgba(204, 204, 204, 0.507);
  box-shadow:1px 1px 5px 0px rgba(0,0,0,0.25);
		background-color: white;
  justify-content: space-between;
		display: flex;
		padding: 2px;
		padding-left: 5px; padding-right: 5px;
}
.filter-label {
		font-family: "Cabin Sketch";
		font-size: 2em;
		margin-top: -2px;
}
.filter {
  width: 30%
}
</style>