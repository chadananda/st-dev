<footer style="display: flex; width:100%; ">
    <div class="links">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/privacy">Privacy</a>
    </div>
    <div class="copyright">
      <a href='/'>©{year} sacred-traditions.org</a>
      <div class="inline text-gray-400 text-xs mr-0 pr-0">
        <span class="sm:hidden">xs</span>
        <span class="hidden sm:inline md:hidden">sm</span>
        <span class="hidden md:inline lg:hidden">md</span>
        <span class="hidden lg:inline xl:hidden">lg</span>
        <span class="hidden xl:inline">xl</span>
      </div>
    </div>
</footer>


<script>
  let year = new Date().getFullYear()
</script>


<style>
  footer {
    display: flex;
    width: 100%;
    background-color: rgba(252, 249, 249, .5);
    padding: 1em; border-radius: 1em; border-top: 1.5px solid #dbdbee;
    margin:0;
    font-size: .75em; font-weight: bold; color: rgb(169, 169, 169);
    justify-content: space-between;
  }
  div a {margin-right: 1em; text-decoration: none}
  div a:hover {text-decoration: underline; color: rgb(91, 91, 91)}
</style>
