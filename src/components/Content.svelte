<script>
    export let meta
    export let html
    meta.title = meta.title || "Untitled"
</script>

<svelte:head>
	 <title>{meta.title} | 𝑺𝒂𝒄𝒓𝒆𝒅-𝑻𝒓𝒂𝒅𝒊𝒕𝒊𝒐𝒏𝒔.𝒐𝒓𝒈</title>
</svelte:head>


<h1 class="title">{meta.title}</h1>

<div id="content">
  {@html html}
  <slot></slot>
</div>

<style>
</style>

