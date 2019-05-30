<script>
   export let prev;
   export let next;
</script>

<div class="flex justify-between w-100 main">

 <div class="w-50  prev">
  <div class="image"><a href="/articles/{prev.slug}">
    <img class="" src="/articles/{prev.img}" alt={prev.title} /></a>
  </div>
  <div class="text">
    <div class="label"> ⬿ Previous</div>
    <div class="title"><a href="/articles/{prev.slug}">{prev.title}</a></div>
  </div>
 </div>

 <div class="w-50  next">
  <div class="image"><a href="/articles/{next.slug}">
    <img class="" src="/articles/{next.img}" alt={next.title} /></a>
  </div>
  <div class="text">
    <div class="label"> Next ⤳ </div>
    <div class="title"><a href="/articles/{next.slug}">{next.title}</a></div>
  </div>
 </div>

</div>




<style>
  .main {position: relative;}
  .next {padding-left:  2em;}
  .prev {padding-right: 2em; border-right: 1px silver dashed;}
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    float: left;
  }
  .next img {float: right;}
  .text { text-align: right; }
  .next .text {text-align: left; }
  .label {font-weight: bold; color: gray; padding-bottom: .5em;}
  .title {font-size: 1.5em; line-height: 1.25em;}
  a {text-decoration: none;}
</style>