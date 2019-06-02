<!-- the best way to predict the future is to create it. (Alan Kay) -->
<footer>
  {#each boxes as ar}
  <div class="box" >
    <a href="/articles/{ar.slug}"><img src="/articles/{ar.img}" alt="{ar.title}" /></a>
  </div>
  {/each}
</footer>

<style>
  footer {width: 100%; height: 300px; display: flex; flex-direction: row; flex-wrap: wrap;
    margin-top: 3em; margin-bottom: 0; overflow: hidden;
  }
  .box {width: 100px; height: 102px; flex: 1 1 100px;
    border: 1px solid white;

  }
  a {text-decoration: none; cursor: pointer;}
  img {width: 100px; height: 100px; object-fit: cover; border-radius: 8px; opacity: .5;}
  /* img, div.box, footer { transition: all .2s linear; } */
  img:hover {opacity: 1;}
</style>

<script>
  //import articles from '../routes/articles/_articles.js';
  import { onMount } from 'svelte';
	 // import { slide } from 'svelte/transition';
	 // import { quintOut } from 'svelte/easing';

  let boxes = []

  function randomArticle() {
    //return articles[Math.floor(Math.random()*articles.length)]
    let imgs =  ['2000px-Society_of_Our_Lady_of_the_Most_Holy_Trinity_badge.svg.png',
                 '46122bc4dca93e61413c2e750ca0974b.jpg',
                 'Dalailama1_20121014_4639.jpg',
                 'Dhirendra-Brahmachari.jpeg',
                 'Martin-Luther-King.jpg',
                 'What-if-Artificial-Intelligence-Was-Enlightened-1038x583.jpg',
                 'adam-and-eve-with-the-infants-cain-and-abel-lorenzo-de-ferrari.jpg',
                 'tolsoy-portrait.jpg']
    return { img: imgs[Math.floor(Math.random()*imgs.length)], title: 'Random article', slug: '' }
  }

  function articleTimer() {
    boxes = [randomArticle(), ...boxes]
    boxes.pop()
    setTimeout(articleTimer, (Math.floor(Math.random()*5000)+100 ))
  }

  onMount(() => {
    while (boxes.length<200) boxes.push(randomArticle())
    articleTimer()
  });
</script>