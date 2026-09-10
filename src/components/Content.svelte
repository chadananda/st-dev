<script>
  export let content
  content.meta.title = content.meta.title || "Untitled"
  content.meta.schema = content.meta.schema || {}
</script>

<svelte:head>
	<title>{content.meta.title} | 𝑺𝒂𝒄𝒓𝒆𝒅-𝑻𝒓𝒂𝒅𝒊𝒕𝒊𝒐𝒏𝒔.𝒐𝒓𝒈</title>

	<meta name="title" content="{content.meta.title}">
	<meta name="description" content="{content.meta.description}">
	<link rel="canonical" href="https://sacred-traditions.org/{content.meta.href.replace(/^\/*/, '')}">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="{(content.meta.schema.ogType || content.meta[content.meta.schema.type] || content.meta.schema.type || 'website').toLowerCase()}">
	<meta property="og:url" content="https://sacred-traditions.org/{content.meta.href.replace(/^\/*/, '')}">
	<meta property="og:title" content="{content.meta.title}">
	<meta property="og:description" content="{content.meta.description}">
  {#if content.meta.schema.ogImage || content.meta.image.src}
  	<meta property="og:image" content="https://sacred-traditions.org/{(content.meta.schema.ogImage || content.meta.image.src).replace(/^\/*/, '')}">
  {/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="{content.meta.twitterCard || 'summary_large_image'}">
	<meta property="twitter:url" content="https://sacred-traditions.org/{content.meta.href.replace(/^\/*/, '')}">
	<meta property="twitter:title" content="{content.meta.title}">
	<meta property="twitter:description" content="{content.meta.description}">
  {#if content.meta.schema.twitterImage || content.meta.image.src}
  	<meta property="twitter:image" content="https://sacred-traditions.org/{(content.meta.schema.twitterImage || content.meta.image.src).replace(/^\/*/, '')}">
  {/if}
</svelte:head>


<div itemscope itemtype="https://schema.org/{content.meta[content.meta.schema.type] || content.meta.schema.type || 'Thing'}" id="content">
  <h1 itemprop="name" class="title">{content.meta.title}</h1>

  {#if content.meta.hero && content.meta.hero.src}
    <img itemprop="image" src="{content.meta.hero.src}#full" alt="{content.meta.hero.alt || content.meta.title || ''}" title="{content.meta.hero.title || ''}" />
  {/if}

  <slot></slot>

  {@html content.html}
</div>

<style>
</style>

