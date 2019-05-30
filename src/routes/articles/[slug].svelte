<svelte:head>
	 <title>{article.title} by {article.author} | 𝑺𝒂𝒄𝒓𝒆𝒅-𝑻𝒓𝒂𝒅𝒊𝒕𝒊𝒐𝒏𝒔.𝒐𝒓𝒈</title>

		<meta data-key="description" name="description" content="{article.snip}"/>
</svelte:head>




<article id={article.id}>
		<h1  class=title>{article.title}</h1>
		<img class='primary-image' src={`/articles/${article.img}`} alt={article.author} />
		<h5  class=author> by {article.author}</h5>
		<div class=content> {@html article.html} </div>
		{#if article.language != 'en'}
    <div class='translated-from'>
				   Translated from <a href='/articles/{article.base.slug}'>{article.base.title}</a>
				</div>
		{/if}
</article>

 <br>


<ArticleNextPrev next={article.nextinfo} prev={article.previnfo} />


{#if article.tagmatches && article.tagmatches.length>1}
<img class='hr' src="/squiggle.svg" alt="hr" />

<div class="similar">
		<h2> You may also like: </h2>
		<ArticlesSimilar similar={article.tagmatches} />
</div>
{/if}


 <img class='hr' src="/squiggle.svg" alt="hr" />

	 <!-- <pre style="border: 1px solid silver; margin:1em; padding:1em;"> {JSON.stringify(article, null, ' ')}</pre> -->







<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].html
		const res = await this.fetch(`articles/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { article: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
		export let article;
		import ArticleNextPrev from '../../components/ArticleNextPrev.svelte'
		import ArticlesSimilar from '../../components/ArticlesSimilar.svelte'
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{article.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}
	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}
	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}
	.content :global(ul) {
		line-height: 1.5;
	}
	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
	.primary-image {float: right; width: 300px; max-width: 80%;
	  /* border: .5em solid rbg(200,200,200); */
			border: 2px solid white;
			box-shadow: 0px 0px 5px 1px rgba(148,148,148,1);
			margin: .5em;
   border-radius: 10px 60px 10px 60px;
	}
 h1.title {margin-bottom:0;}
	h5.author {margin-top:.5em; margin-bottom: 3em; color: gray;}

 .similar h2 {font-size: 1.5em; text-align: center; font-style: italic; font-family: serif; color: #555; margin-bottom:.75em;}

	.hr {
		width: 100px;
		opacity: .5;
		max-width: 20%;
  display: block;
		margin: 2em;
  margin-left: auto;
  margin-right: auto;
}

</style>

