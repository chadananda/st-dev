<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`articles.json`).then(r => r.json()).then(articles => {
			return { articles };
		});
	}
</script>

<script>
	 export let articles;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
	.author {font-size: .8em; color: darkgray; padding-left: 1em; font-style: italic;}
</style>

<svelte:head>
	 <title>Articles Index Page</title>
</svelte:head>

<h1>Recent Articles</h1>

<ul>
	{#each articles as ar}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li>
		  <a rel='prefetch' href='articles/{ar.slug}'>{ar.title}</a>
		  <span class="author"> by {ar.author}</span>
			</li>
	{/each}
</ul>