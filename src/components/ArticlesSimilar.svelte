<script>
   export let similar;
</script>

<div class="flex flex-wrap justify-between w-100 main" style="width:100%">

{#each similar as ar,i}{#if i<5}
 <div class="item w-20 center"><a href="/articles/{ar.slug}">
  <div class="image">
    <img class="" src="/articles/{ar.img}" alt={ar.title} />
  </div>
  <div class="text">
    <div class="label">{ar.author}</div>
    <div class="title">{ar.title}</div>
  </div></a>
 </div>
{/if}{/each}

</div>




<style>
  .main {position: relative;}
  .item {text-align: center;}
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }
  .text  {text-align: center; }
  .label {font-weight: bold; color: gray; padding-bottom: .2em; font-size: .8em;}
  .title {font-size: .8em; line-height: 1em;}
  .item, a {text-decoration: none; cursor: hand !important;}



</style>