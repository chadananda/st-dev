<script>
	import { webinars } from '../../store'
	import Media from '../../components/Media.svelte'
	import Debug from '../../components/Debug.svelte'
</script>

{#if !$webinars.archive || $webinars.archive.length === 0}
	{#each Array(24) as item}
		<Media item={false} />
	{/each}
{:else}

 <div class="navcontainer">
		<div class="medianav">
					<h2 class="filter-label">Media Archive</h2>
					<input type="search" class="filter" placeholder="filter by title or author" />
		</div>
	</div>

	<div class="mediastuff relative flex flex-wrap w-full justify-center">
		{#each $webinars.archive as item}
				<Media {item}>
					<div class="flex">
						<div class="provider flex-initial">{item.meta.provider}</div> &nbsp;·&nbsp;
						<div class="count flex-initial">{item.meta.count} videos</div>
						<div class="duration flex-auto text-right" itemprop="duration" value="{item.meta.duration}">{item.meta.hours}</div>
					</div>
				</Media>
		{/each}
	</div>
{/if}


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
.mediastuff {
	 z-index: 0;
}


</style>
