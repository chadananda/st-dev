<script>
		export let item // item.meta.href
		let embedid = item.meta.href.split('=')[1] // works with standard Youtube links, not all

  // I don't know how to get the "onReady" event, so I just check repeatedly until the DOM is available
  let showVideo = function() {
				let el = document.getElementById('player')
				let player
				if (el) player = new Plyr(el)
		   else setTimeout(showVideo, 20)
		}
		showVideo()

</script>

<div id="player" class="plyr__video-embed" data-plyr-provider="youtube" data-plyr-embed-id={embedid}></div>

<!--
	Here's an example with iFrame fallback, in case it works better for nonstandard items

	<div class="plyr__video-embed w-full " id="player">
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
		#player {background: black}
</style>
