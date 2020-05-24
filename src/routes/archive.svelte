<svelte:head>
		<script src="https://cdn.plyr.io/3.6.2/plyr.js"></script>
		<link rel="stylesheet" href="https://cdn.plyr.io/3.6.2/plyr.css" />
</svelte:head>

<script>

// video player popup
import VideoPopup from '../components/Popup_video.svelte'
import { getContext } from 'svelte'
const { open } = getContext('simple-modal')
const showPopup = (item) => {
  open(VideoPopup, { item }, {
			 styleWindow: {
						background: 'rgba(200,200,200, 0.96)', padding: '0', 	'border-radius': '5px', width: '80%', overflow: 'hidden',
				},
				styleContent: { padding: '0', margin: '0' },
				closeButton: false,
		})
}

// archive items, youtube videos
import { webinars } from '../store'
import Media from '../components/Media.svelte'

// import Debug from '../components/Debug.svelte'

// initial value of reactive list
$: items =  $webinars.archive

// debounce for rebuilding reactive list
let timer
const debounce = userString => {
  clearTimeout(timer)
		timer = setTimeout(() => {
				let filterStr = userString.normalize('NFD').replace(/['"‘’“”\u0300-\u036f]/g, '').toLowerCase()
				if (filterStr.length<2) filterStr = ''
				items = $webinars.archive.filter(o => o.meta.filtertext.match(filterStr))
	 }, 250)
}

</script>

 <div class="navcontainer">
		<div class="medianav">
			<h2 class="filter-label">Media Archive </h2>
			<!-- <div> -->
					<input type="search" class="filter" placeholder="filter title or author"
								on:input={ ({ target: { value } }) => debounce(value) } />
					<!-- <img class="reply w-5" alt="add a resource" src="/reply.svg" /> -->
			<!-- </div> -->
		</div>
	</div>

	<div class="mediastuff relative flex flex-wrap w-full justify-center">
		{#if !$webinars.archive || $webinars.archive.length === 0}
			{#each Array(1) as item}
				<Media item={false} />
			{/each}
		{:else}
			{#each items as item}
			 <div on:click={showPopup(item)}>
				  <Media {item}>
								<div class="thisone flex flex-auto align-text-bottom" style="margin-top: auto">
										<div class="provider flex-initial">{item.meta.provider}</div> &nbsp;·&nbsp;
										<div class="count flex-initial">{item.meta.count} {item.meta.count===1 ? 'video' : 'videos'}</div>
										<div class="duration flex-auto text-right" itemprop="duration" value="{item.meta.duration}">{item.meta.hours}</div>
								</div>
			  	</Media>
				</div>
			{/each}
		{/if}
	</div>








<style>

div.navcontainer {
	 position: sticky; top:46px; z-index: 100;
		width: 100%; height: 4em;	padding: 5px; background: white;
}
.medianav {
		margin:2em; margin-top: .2em; height: 3em;
		border-radius: 10px; border: 1px solid rgba(204, 204, 204, 0.507);
  box-shadow:1px 1px 5px 0px rgba(0,0,0,0.25);
		/* background-color: white; */
		background: rgb(247, 245, 252);
		display: flex;  justify-content: space-between;	overflow: hidden;
		padding: 2px; padding-left: 5px; padding-right: 5px;
}
.filter-label {
		font-family: "Cabin Sketch"; font-size: 2em;
		margin-top: -2px; color: rgb(77, 77, 124);
}
.filter {
  width: 30%; min-width: 200px;
		margin-top: 2px; margin-bottom: 2px;
}
.thisone {
		flex-basis: grow;
		align-items: flex-end;
		margin-bottom: -2px;
}
</style>
