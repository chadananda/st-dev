<script>
export let item
</script>

<div itemscope itemtype="https://schema.org/" id="item">
  <h3 itemprop="name" class="title">{item.meta.title}</h3>

  {#if item.meta.hero && item.meta.hero.src}
    <img itemprop="image" src="{item.meta.hero.src}#full" alt="{item.meta.hero.alt || item.meta.title || ''}" title="{item.meta.hero.title || ''}" />
  {/if}

  <slot></slot>

  {@html item.html || ''}
</div>
