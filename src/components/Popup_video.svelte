<script>
		export let item // item.meta.href
		// let embeddURL = `https://www.youtube.com/embed/${item.meta.href.split('=')[1]}`
		let embedid = item.meta.href.split('=')[1]

  let showVideo = function() {
				let el = document.getElementById('player')
				if (el) {
					 const player = new Plyr(el)
					 console.log('Hi Bayan, my element is here!!')
				} else setTimeout(showVideo, 20)
		}

		showVideo()

</script>

<div id="player" class="plyr__video-embed" data-plyr-provider="youtube" data-plyr-embed-id={embedid}></div>

<!-- <div class="plyr__video-embed w-full " id="player">
  <iframe
		  class="w-full" style="height: 400px"
    src={embeddURL}
    allowfullscreen
    allowtransparency
    allow="autoplay"
				title={item.meta.title}
  ></iframe>
</div> -->

<style>
		/* #player {width: 100%; height: 420px;} */
		#player {background: black}
</style>
