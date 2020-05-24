<script>
 // components
	import Media from '../components/Media.svelte'
	import SvelteInfiniteScroll from 'svelte-infinite-scroll'

 import spacetime from 'spacetime'
	import { webinars } from '../store'
	let items = []
	let endOfDay, ii, day


	let startDate = spacetime.now()
	let tz = startDate.timezone().name
	let endDate = startDate.add(1, 'year')

	let search = ''
	let category = '' // added for category filtering
	let dayFilter = ''

 // I've seperated these so that we can add debounce later
	$: searchFilter = search.normalize('NFD').replace(/['"‘’“”\u0300-\u036f]/g, '').toLowerCase()
	$: categoryFilter = category.normalize('NFD').replace(/['"‘’“”\u0300-\u036f]/g, '').toLowerCase()

	// let's build this up in layers so we don't repeat all the sorting/processing work

	// programs = all programs (some repeating)
	$: programs = $webinars.calendar || []

	// remove programs that do not match search or category filters
	$: filteredPrograms = programs.filter(e => {
			if (searchFilter && !e.meta.filtertext.match(searchFilter)) return false
			if (categoryFilter && !e.meta.filtertext.match(categoryFilter)) return false // how to get list of categories to match?
			return true
	})
	// $: console.log('Filtered Programs', filteredPrograms.map(p => p.meta.title).join('\n'))

	// list of all events by date (no need to sort yet)
	let filteredEvents = []
	$: {
			let result = [] // straight list of event objects: [{date, event}]
			filteredPrograms.forEach(e => {
					if (!e.meta.weekly && e.meta.starttime.isBetween(startDate, endDate)) result.push({date: e.meta.starttime, event: e})
					else  if (e.meta.weekly) {
							let time = e.meta.starttime
							while (time.isBefore(endDate)) {
								if (time.isBetween(startDate, endDate)) result.push({date: time, event: e}) // in case we're in the middle of a set
								time = time.add(1, 'week')
							}
					}
			})
   filteredEvents = result
	}

	// group events into weekly lists, ready to pass into a weekly calendar component
	let weeklyEvents = {}
	$: {
			let result = {}  // lists of events keyed by  { weekStartDay: [events] }
			filteredEvents.forEach(event => {
					let weekStartDay = spacetime(event.date).weekStart('sunday').startOf('week').hour(12).format('numeric-cn') // YEAR-MO-DY
					if (!result[weekStartDay]) result[weekStartDay] = [event]
					 else result[weekStartDay].push(event)
			})
			//
			// now we change the object into a sorted array of week objects {week, events}
			weeklyEvents = Object.keys(result).map(week => {
				 return {week, events:result[week]}
			}).sort((a,b) => spacetime(a.week).isAfter(b.week) ? 1 : -1)
			//
 		// sort each week's list of events so it's ready for display
			weeklyEvents.forEach(week => {
				 week.events = week.events.sort((a,b) => a.date.isAfter(b.date) ? 1 : -1)
			})
	}
// $: console.log('weekly events: ', JSON.stringify(weeklyEvents, null, 2))




	// $: if ($webinars.calendar) items = $webinars.calendar.reduce((a,e) => {
	// 	// filters
	// 	if (search && !e.meta.filtertext.match(search.normalize('NFD').replace(/['"‘’“”\u0300-\u036f]/g, '').toLowerCase())) return a
	// 	if (dayFilter && e.meta.starttime.goto(tz).format('day-short') !== dayFilter) return a
	// 	if (!e.meta.weekly && e.meta.starttime.isBetween(startDate, endDate)) {
	// 		a.push({date: e.meta.starttime, event: e})
	// 	}
	// 	else if (e.meta.weekly) {
	// 		let time = e.meta.starttime
	// 		while (time.isBefore(endDate)) {
	// 			a.push({date: time, event: e})
	// 			time = time.add(1, 'week')
	// 		}
	// 	}
	// 	return a
	// }, []).sort((a,b) => a.date.isAfter(b.date) ? 1 : -1)







</script>

	<div class="navcontainer">
		<div class="medianav flex">

			<h2 class="filter-label flex-grow">Webinars / Talks</h2>

			<!-- <select class="filter2 flex-none w-64" bind:value={dayFilter}>
				<option value="">all</option>
				<option value="Mon">Monday</option>
				<option value="Tue">Tuesday</option>
				<option value="Wed">Wednesday</option>
				<option value="Thu">Thursday</option>
				<option value="Fri">Friday</option>
				<option value="Sat">Saturday</option>
				<option value="Sun">Sunday</option>
			</select> &nbsp; &nbsp; -->

		<select class="filter2 flex-none w-64" bind:value={category}>
				<option value="">all</option>
				<option value="Mon">Baha'i</option>
				<option value="Tue">Christian</option>
				<option value="Wed">Hindu</option>
				<option value="Thu">Islam</option>
				<option value="Fri">Sikh</option>
				<option value="Sat">Judaic</option>
				<option value="Sun">Zoroastrian</option>
				<option value="Sun">Confucian</option>
			</select> &nbsp; &nbsp;

			<input type="search" class="filter w-1/3 flex-none" placeholder="filter by title or author" bind:value={search} />

		</div>
	</div>

 <div class="mediastuff relative flex flex-col w-full justify-center">
		{#if !weeklyEvents}
			{#each Array(24) as item}
				<Media item={false} />
			{/each}
		{:else}
			{#each weeklyEvents as week}
			 <div class="weekheader pl-8 text-center h-12">
						<img src="/calendar.svg" class="w-6 inline -mt-3" alt="calendar" /> &nbsp;
						<h2 class="text-gray-700 inline text-lg pl-6">
						{spacetime(week.week).format('{month} {date-ordinal}')} - {spacetime(week.week).add(6, 'day').format('{month-short} {date-ordinal}')}</h2>
				</div>
				<ul class="ml-5">
    {#each week.events as item}
      <li class="item">{item.date.format('nice-day')}: {item.event.meta.presenters[0]} : {item.event.meta.title}</li>

				<!-- <SvelteInfiniteScroll threshold={100} on:loadmore={() => {endDate = endDate.add(1, 'month')}} /> -->
    {/each}
				</ul>
				<br><br>
			{/each}
		{/if}
	</div>

	<!-- <div class="mediastuff relative flex flex-wrap w-full justify-center">
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
	</div> -->




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
			background: rgb(247, 245, 252);
			justify-content: space-between;
			display: flex;
			padding: 2px;
			padding-left: 5px; padding-right: 5px;
	}
	.filter-label {
			font-family: "Cabin Sketch"; font-size: 2em;
			margin-top: -2px; color: rgb(77, 77, 124);
	}
	.filter {
			width: 30%; min-width: 200px;
			margin-top: 2px; margin-bottom: 2px;
	}
	.filter2 {
			width: 15%; min-width: 100px;
			margin-top: 2px; margin-bottom: 2px;
			padding:0; padding-left:8px;
			font-size: 90%;
			/* padding:0; */
	}
</style>