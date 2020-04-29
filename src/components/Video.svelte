<script>
export let item = {}
export let display = 'card'
</script>

{#if !item}
   <!-- content here -->
  <div class="card clearfix">
    <div class="image" />
  </div>
{:else if display === 'page'}
   <!-- content here -->
  <div itemscope itemtype="https://schema.org/VideoObject" class="page">
    <h1 class="title">{item.meta.title}</h1>
    <p class="presenters">{item.meta.presenters}</p>
    {#if item.meta.hero && item.meta.hero.src}
      <img itemprop="image" src="{item.meta.hero.src}#full" alt="{item.meta.hero.alt || item.meta.title || ''}" title="{item.meta.hero.title || ''}" />
    {/if}
    <p class="description">{item.description}</p>
  </div>

{:else}
   <!-- else content here -->
  <div itemscope itemtype="https://schema.org/VideoObject" class="card clearfix">

    <div class="image">
      {#if item.meta.hero && item.meta.hero.src}
        <img itemprop="image" src="{item.meta.hero.src}#full" alt="{item.meta.hero.alt || item.meta.title || ''}" title="{item.meta.hero.title || ''}" />
      {/if}
    </div>
    <div class="details">
      <h3 itemprop="name" class="title">
        {#if item.meta.quality === 'HD'}
          <span itemprop="videoQuality" class="hd">HD</span>
        {/if}
        <a href="/webinars/detail?provider={item.meta.provider}&id={item.meta.id}">{item.meta.title}</a>
      </h3>

      <span class="presenters">{item.meta.presenters}</span>

      <div>
        <span class="provider">{item.meta.provider}</span>
        <span class="count">{item.meta.count}</span>
        <span class="duration">{item.meta.hours}</span>
      </div>

    </div>
  </div>
{/if}

<style>
  .card {
    width: 360px;
    height: 320px;
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
  .details {
    padding: 5px 9px;
  }
  h3.title {
    margin: 0;
    line-height: 1.1em;
    max-height: 2.2em;
    overflow: hidden;
  }
  span {
    line-height: 1.1em;
    max-height: 1.1em;
    overflow: hidden;
  }
</style>
