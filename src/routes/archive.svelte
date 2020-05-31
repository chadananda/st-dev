<svelte:head>
		<script src="https://cdn.plyr.io/3.6.2/plyr.js"></script>
		<link rel="stylesheet" href="https://cdn.plyr.io/3.6.2/plyr.css" />
</svelte:head>

<script>
// import VisibilityGuard from '../components/VisibilityGuard.svelte' // does not render until item is almost visible

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

function stripString(str) {
				return str.toLowerCase()
				          .replace(new RegExp(/\s/g),"")
				          .replace(new RegExp(/[àáâãäå]/g),"a")
				          .replace(new RegExp(/æ/g),"ae")
				          .replace(new RegExp(/ç/g),"c")
				          .replace(new RegExp(/[èéêë]/g),"e")
				          .replace(new RegExp(/[ìíîï]/g),"i")
				          .replace(new RegExp(/ñ/g),"n")
              .replace(new RegExp(/[òóôõö]/g),"o")
				          .replace(new RegExp(/œ/g),"oe")
				          .replace(new RegExp(/[ùúûü]/g),"u")
				          .replace(new RegExp(/[ýÿ]/g),"y")
														.replace(new RegExp(/\W/g),"")
														.normalize('NFD').replace(/['"‘’“”\u0300-\u036f]/g, '')
}
function titleCleanup(title) {
		return title.replace(/Bah[a|á][\'|’|‘]?[i|í]/g, 'Bahá’í')
														.replace(/Bah[a|á][\'|’|‘]?[u|o][\'|’|‘]?ll[a|á]h/gi, 'Bahá’u’lláh')
														.replace(/Bab/, 'Báb')
														.replace(/[\'|‘']?Abd[u|o][\'|’|‘]?l[\-| ][B|b]ah[a|á]/, '‘Abdu’l-Bahá')
														.replace(/q[u|o]r[\'|’|‘]?[a|á]n/, "Qur’án")
														.replace(/\'s /, "’s ")
}


// archive items, youtube videos
import { webinars } from '../store'
// import Media from '../components/Media.svelte'
// import Debug from '../components/Debug.svelte'

const keyedItems = (items, keyed={}) => {
  items = items.sort(()=>.5-Math.random()) // shuffle
		items.forEach(item => {
			item.isPinned = !!userPins[item.meta.id] // temp store local pinned status
			item.image.src = (item.image.src||'').replace(/hqdefault/, 'mqdefault').replace(/\/default/, '/mqdefault')
			item.title = titleCleanup(item.title)
			keyed[item.meta.id] = item
		})
		return keyed
}

// initial value of reactive list
$: allItems = keyedItems($webinars.archive)
$: filteredList = Object.values(userPins).concat(Object.values(allItems).filter(item => !userPins[item.meta.id]))  // move pinned items to front
let category = '' //  category filter


// debounce for rebuilding reactive list
let timer
const debounce = userString => {
  clearTimeout(timer)
		timer = setTimeout(() => {
				let filterStr = stripString(userString)
				if (filterStr.length<2) filterStr = ''
				filteredList = Object.values(userPins).concat(Object.values(allItems).filter(item => !userPins[item.meta.id]))
				                     .filter(o=> stripString(o.meta.filtertext).match(filterStr))
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


// manage user pinned items
// userPins is a keyed object of items -- but only the keys are saved and retrieved
import { onMount } from 'svelte';
function loadPins(){
		userPins = {}
		let loaded, parsed
		loaded = localStorage.getItem('st_pinned_talks')
		if (loaded) parsed = (JSON.parse(loaded) || [])
		if (parsed) parsed.forEach(id => userPins[id] = allItems[id])
}
function savePins(){
		let list = Object.keys(userPins)
		// console.log('saving all pins', list)
	 localStorage.setItem('st_pinned_talks', JSON.stringify(list))
}
function addPin(id){
		// console.log('adding pin', id)
		allItems[id].isPinned = true
		userPins[id] = allItems[id]; savePins()
}
function removePin(id){
		// console.log('removing pin', id)
		allItems[id].isPinned = false
		delete(userPins[id]); savePins()
}
function tryLoadingWhenReady() {
		if (! window || !allItems || !Object.keys(allItems).length || !window.localStorage) setTimeout(tryLoadingWhenReady, 1000)
	  	else loadPins()
}
$: userPins = {} // id-keyed object of items
onMount(tryLoadingWhenReady)
// $: console.log('User pins', Object.keys(userPins))


</script>



 <div class="navcontainer">
		<div class="medianav flex">

			<h2 class="filter-label flex-grow">Talks of the Spirit</h2>

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
		{#if !filteredList || filteredList.length === 0}
			{#each Array(1) as item}
			 	<div class="card loading" />
			{/each}
		{:else}
			{#each filteredList as item}
			 <div on:click={showPopup(item)} class="media group relative">

				      <!-- floating unpin button -->
							 {#if !!userPins[item.meta.id]}
										<img class="unpin w-4 absolute right-0 bottom-0" src="/pin.svg" alt="unpin item"
										     on:click|stopPropagation={removePin(item.meta.id)}
															onmouseover="this.src='/unpin.svg'" onmouseout="this.src='/pin.svg'" 	/>
        {:else}
          <!-- floating pin button -->
										<img class="pin w-6 absolute right-0 bottom-0" src="/pin.svg" alt="pin item"
										     on:click|stopPropagation={addPin(item.meta.id)} />
         {/if}

          <!-- floating play button  -->
								  <img class="play w-12 absolute" src="/play.svg" alt="play item"
										     on:click.stopPropagation={addPin(item.meta.id)} />

          <!-- card  -->
										<div class="card" itemscope
												itemtype="https://schema.org/{item.meta[item.meta.schema.type] || item.meta.schema.type || 'Thing'}">
												<div class="image" class:empty={!item.image || !item.image.src}>
														{#if item.image}
														  <div class="vidimg" style="background-image: url({item.image.src})" />
														{/if}
												</div>
												<div class="details">
														<div name="title" itemprop="name" class="title" class:short="{item.title.length<30}"> {item.title} </div>
														<div class="cardbottom">
																<div class="presenter">{item.meta.presenters}</div>
																<!-- <div class="count">{item.meta.count} {item.meta.count===1 ? 'video' : 'videos'}</div> -->
																<div class="duration" itemprop="duration" value="{item.meta.duration}">
																{`${item.meta.hours}`.split(':').slice(0,2).join(':')}</div>
														</div>
												</div>
										</div>


				</div>
			{/each}
		{/if}
	</div>








<style>
	.navcontainer {
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


	.media { position: relative;}
	.media:hover {cursor: pointer;}
	.pin {display: none;  z-index:9; bottom: 15px; margin-right:-10px;
			filter: drop-shadow(1px 1px 2px rgb(145, 145, 145));
			opacity:.75;
	}
	.pin:hover {cursor:pointer; opacity:1;}

	.unpin {z-index:9; bottom: 15px; margin-right:-3px;
			/* filter: drop-shadow(1px 1px 2px rgb(145, 145, 145)); */
			opacity:.85;
	}
	.unpin:hover {cursor:pointer; opacity:1;}

	.play {display: none; z-index:9; top: 40px; left: 71px; opacity:.25;}
	.media:hover .pin {display: block;}
	.media:hover .play {display: block; opacity:.15;}
	.play:hover {opacity: 1 !important;}


 .card {
    width: 180px;
    height: 152px;
    min-height: 150px;
    box-shadow:1px 1px 8px 0px rgba(0,0,0,0.15);
    background-color: white;
				margin: .5em;
				transition: box-shadow 0.4s ease-in-out;
				position: relative; overflow: hidden;
				border-radius: 5px;
				font-family: 'Cabin Sketch';
				padding-top: 10px;
 }
 .media:hover .card {
		 cursor: pointer;
   box-shadow:4px 4px 5px 0px rgba(0,0,0,0.75);
	}

.card:before {
	 z-index:9;
	 content:""; height:3px; position:absolute; left:0; right:0;
		clip-path: polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%);
		background-color: #eee; top: -1px;
}






  .image {
    width: 100%;
    height: 100px;
    overflow: hidden;
    background: #ddd;
    display: flex;
    align-items: center;
				justify-content: center;
				margin-top:-10px;
  }
  .image.empty {
    padding:20px;
		}
		.vidimg{
			 display: inline-block;
    height: 100px;
				width: 180px;
				background-position: -5px -1px;
				background-repeat: no-repeat;
				background-size: 190px auto;
				/* border: 1px solid white; */
				filter: brightness(.95) contrast(.95);
				position: relative;

		}
		.media:hover .vidimg {
			 filter: brightness(1.1) contrast(1.1);
		}
		.cardbottom {
			 margin-top: auto;
				flex-basis: grow; width: 100%;
				max-height: 1.3em; overflow: hidden; width: 100%; height: 1.3em;
		  display: flex; flex-direction: row; flex: auto 1; justify-content: space-between;
		}
		.cardbottom .presenter {
    max-width: 60%; overflow: hidden;
		}
		.cardbottom .duration {
    text-align: right;
		}


  .details {
    padding: 3px 2px; padding-bottom: 0px;
    font-size: .7rem;
    color: gray;
    /* height: 49px; */
    /* background: rgb(195, 247, 195); */
				display: flex;
				flex-direction: column;
				/* margin-top: -2px; */
				flex: auto 1;
				height: 52px;
  }
  .title {
    margin: 0; padding-left: 2px;
    line-height: 1em;
    max-height: 3.1em;
    overflow: hidden;
    font-size: .75rem;
				color: rgb(65, 53, 82);
				text-align: center;
		}
		.title.short {
				font-size: .95rem;
				padding-top: 3px;
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
