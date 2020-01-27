<footer style="display: flex; width:100%; ">
    <div class="links">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/privacy">Privacy</a>
    </div>
    <div class="copyright">
      <a href='/'>©{year} sacred-traditions.org</a>
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
