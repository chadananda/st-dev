<script>
   export let ar;
   import {goto} from '@sapper/app'

   function openArticle() {
     goto(`/articles/${ar.slug}`)
   }
</script>

<div class="w-full main border rounded shadow m-4 relative p-5 bg-gray-100 cursor-pointer" on:click={openArticle}>
  <div class="w-32 h-32 border rounded-full ml-3 float-right -mr-16 -mt-8 shadow"
    style={`background: url(/articles/${ar.img}); background-size: cover; background-position: center`}>
  </div>

  <a href="/articles/{ar.slug}" rel=prefetch><div class="title text-2xl -mt-3 font-cabin">{ar.title}</div></a>
  <div class="author text-base italic -mt-1 ml-1 mb-2">by {ar.author}</div>

  <p class="snip text-lg">{ar.snip}</p>
</div>
<div class="clearfix" />


