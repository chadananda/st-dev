<script>
export let item = {}
export let display = 'card'
let imageWidth, imageHeight
$: if (imageWidth) imageHeight = Math.round(imageWidth * .6)
</script>

{#if !item}
   <!-- content here -->
  <div class="card ">
    <div class="image" bind:clientWidth={imageWidth} />
  </div>
{:else if display === 'page'}
  <!-- TODO: page headers for metadata -->
  <div itemscope itemtype="https://schema.org/{item.meta[item.meta.schema.type] || item.meta.schema.type || 'Thing'}" class="media">
    <slot name="title">
      <h1 class="title" itemprop="name">{item.title}</h1>
    </slot>
    <slot name="header"></slot>
    <!-- <div class="image" class:empty={!item.image || !item.image.src} bind:clientWidth={imageWidth} style="height:{imageHeight}px">
      {#if item.image && false}
        <img itemprop="image" src="{item.image.src}#full" alt="{item.image.alt || item.title || ''}" title="{item.image.title || ''}" />
      {/if}
    </div> -->
    <slot></slot>
    <div class="description" itemprop="abstract">{@html item.html}</div>
    <slot name="footer"></slot>
  </div>

{:else}
   <!-- else content here -->
  <div class="card relative m-2 p-1 rounded-lg shadow-lg overflow-hidden" itemscope
    itemtype="https://schema.org/{item.meta[item.meta.schema.type] || item.meta.schema.type || 'Thing'}">
    <slot name="header"></slot>
    <div class="image" class:empty={!item.image || !item.image.src} bind:clientWidth={imageWidth} style="height:{imageHeight}px">
      {#if item.image}
        <a href="{item.meta.href}"><img itemprop="image" src="{item.image.src}#full" alt="{item.image.alt || item.title || ''}" title="{item.image.title || ''}" /></a>
      {/if}
    </div>
    <div class="details">
      <slot name="title">
        <h3 itemprop="name" class="title">
          {#if item.meta.videoQuality === 'HD'}
            <span itemprop="videoQuality" class="hd">HD</span>
          {/if}
          <a href="{item.meta.href}">{item.title}</a>
        </h3>
  			<span class="presenters">{item.meta.presenters}</span>
      </slot>
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
{/if}

<style>
  .card {
    width: 180px;
    height: auto;
    min-height: 100px;
    border: 1px solid rgba(204, 204, 204, 0.507);
    box-shadow:1px 1px 5px 0px rgba(0,0,0,0.25);
    background-color: white;
    margin: .5em;
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
  .details {
    padding: 5px 9px;
    font-size: .7rem;
    color: gray;
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
</style>
