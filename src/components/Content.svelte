<script>
    export let content
    content.meta.title = content.meta.title || "Untitled"
</script>

<svelte:head>
	 <title>{content.meta.title} | 𝑺𝒂𝒄𝒓𝒆𝒅-𝑻𝒓𝒂𝒅𝒊𝒕𝒊𝒐𝒏𝒔.𝒐𝒓𝒈</title>
</svelte:head>


<h1 class="title">{content.meta.title}</h1>

<div id="content">
  {@html content.html}
  <slot></slot>
</div>

<style>
</style>

