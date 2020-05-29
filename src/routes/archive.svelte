<svelte:head>
		<script src="https://cdn.plyr.io/3.6.2/plyr.js"></script>
		<link rel="stylesheet" href="https://cdn.plyr.io/3.6.2/plyr.css" />
</svelte:head>

<script>
import VisibilityGuard from '../components/VisibilityGuard.svelte' // does not render until item is almost visible

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
// import Media from '../components/Media.svelte'
// import Debug from '../components/Debug.svelte'


// initial value of reactive list
$: archive = ($webinars.archive || []).sort(()=>.5-Math.random())
$: filteredItems = archive
let category = '' //  category filter

// debounce for rebuilding reactive list
let timer
const debounce = userString => {
  clearTimeout(timer)
		timer = setTimeout(() => {
				let filterStr = userString.normalize('NFD').replace(/['"‘’“”\u0300-\u036f]/g, '').toLowerCase()
				if (filterStr.length<2) filterStr = ''
				filteredItems = archive.filter(o=>o.meta.filtertext.match(filterStr))
	 }, 250)
}

function getYoutubeVideoID(url) {
  let id = ''
  // like https://www.youtube.com/playlist?list=PLU78SjAUfhWhmWsZoSLZg7bYuKrKFRwyG
  if (url.match(/playlist/)) id = url.split('list=')[1].split('&')[0]
  // like https://www.youtube.com/watch?v=6jPN99xQLOs&ab_channel=Baha%27iBlog
  else if (url.match(/v\=/)) id = url.split('v=')[1].split('&')[0]
  // like https://youtu.be/J8FSu0R-cRk
  else if (url.match(/youtu\.be/)) id = url.split('.be/')[1].split('&')[0]
  // Logger.log('extractYoutubeID, url:"'+url+'", id:"'+id+'"')
  return id
}

</script>



 <div class="navcontainer">
		<div class="medianav flex">

			<h2 class="filter-label flex-grow">Media Archive </h2>

			<select class="filter2 flex-none w-64" bind:value={category}>
					<option value="">All</option>
					<option value="---" disabled>---</option>
					<option value="Mon">Baha'i</option>
					<option value="Tue">Christian</option>
					<option value="Wed">Hindu</option>
					<option value="Thu">Islam</option>
					<option value="Fri">Sikh</option>
					<option value="Sat">Judaic</option>
					<option value="Sun">Zoroastrian</option>
					<option value="Sun">Confucian</option>
				</select> &nbsp; &nbsp;

					<input type="search" class="filter" placeholder="filter title or author"
								on:input={ ({ target: { value } }) => debounce(value) } />
		</div>
	</div>

	<div class="mediastuff relative flex flex-wrap w-full justify-center">
		{#if !archive || archive.length === 0}
			{#each Array(1) as item}
			 	<div class="card loading" />
			{/each}
		{:else}
			{#each filteredItems as item}
			 <div on:click={showPopup(item)} class="media">
				  <!-- <VisibilityGuard let:hasBeenVisible> -->
						  <!-- {#if hasBeenVisible} -->
										<div class="card relative m-2 p-1 rounded-lg shadow-lg overflow-hidden cursor-pointer" itemscope
												itemtype="https://schema.org/{item.meta[item.meta.schema.type] || item.meta.schema.type || 'Thing'}">
												<slot name="header"></slot>
												<div class="image" class:empty={!item.image || !item.image.src}>
														{#if item.image}
														  <div class="vidimg" style="background-image: url({item.image.src.replace(/hqdefault/, 'mqdefault')})" />
														{/if}
												</div>
												<div class="details">
														<div name="title">
																<h3 itemprop="name" class="title">
																		{#if item.meta.videoQuality === 'HD'}
																				<span itemprop="videoQuality" class="hd">HD</span>
																		{/if}
																		{item.title}
																</h3>
												   	<span class="presenters">{item.meta.presenters}</span>
														</div>
														<div class="cardbottom flex flex-auto align-text-bottom" style="margin-top: auto">
																<div class="provider flex-initial">{item.meta.provider}</div> &nbsp;·&nbsp;
																<div class="count flex-initial">{item.meta.count} {item.meta.count===1 ? 'video' : 'videos'}</div>
																<div class="duration flex-auto text-right" itemprop="duration" value="{item.meta.duration}">{item.meta.hours}</div>
														</div>
												</div>
										</div>
								<!-- {:else}
          <div class="card loading" />
								{/if}
						</VisibilityGuard> -->
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
	.cardbottom {
			flex-basis: grow;
			align-items: flex-end;
			margin-bottom: -2px;
	}




 .card {
    width: 180px;
    height: auto;
    min-height: 150px;
    box-shadow:1px 1px 8px 0px rgba(0,0,0,0.15);
    background-color: white;
				margin: .5em;
				transition: box-shadow 0.4s ease-in-out;
  }
  .card:hover {
    box-shadow:1px 1px 8px 0px rgba(0,0,0,0.75);
  }
  .image {
    width: 100%;
    height: 60%;
    overflow: hidden;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image.empty {
    padding:20px;
		}
		.vidimg{
			 display: inline-block;
    height: 98px;
				width: 180px;
				background-position: -5px -3px;
				background-repeat: no-repeat;
				background-size: 190px auto;
				/* border: 1px solid white; */
				filter: brightness(.95) contrast(.95);
				position: relative;

		}
		.vidimg:hover {
			 filter: brightness(1.1) contrast(1.1);
		}


  .details {
    padding: 5px 9px;
    font-size: .7rem;
    color: gray;
    height: 70px;
    /* background: rgb(195, 247, 195); */
    display: flex;
    flex-direction: column;
  }
  h3.title {
    margin: 0;
    line-height: 1.4em;
    max-height: 2.8em;
    overflow: hidden;
    font-size: .75rem;
    font-family: arial, sans-serif;
    color: black;
  }
  span {
    line-height: 1.1em;
    max-height: 1.1em;
    overflow: hidden;
  }
  .card.loading {
    position: relative;
    background-image: url('/loader.gif');
    background-repeat: no-repeat;
    background-position: 0%;
    background-size: 180px;
    opacity: .8;
  }
</style>
