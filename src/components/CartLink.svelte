<script>
  import { cart } from '../store'
  cart.useLocalStorage()
</script>

{#if $cart.length}
<a href="courses/register">{$cart.length}</a>
{/if}

<style>
  a {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: lightgray;
    border-radius: 5px;
  }
</style>
