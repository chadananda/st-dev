<h1 class="title">Registration Checkout</h1>

{#each $cart as item,i}
  <div class="item">
    <span class="name">{item.FirstName} {item.LastName || ''}</span>
    <span class="title">{item.Title}</span>
    <span class="date">{item.StartDateDisplay} – {item.EndDateDisplay}</span>
    <span class="button close right" on:click={(e) => {
      e.preventDefault()
      e.stopPropagation()
      cart.remove(i)
    }}>remove</span>
  </div>
{:else}
  <p>Your cart is empty.</p>
{/each}

<div id="paypal-buttons" class:hide={!$cart.length}></div>

<svelte:head>
  <script src="https://www.paypal.com/sdk/js?client-id=ARLTZyWHyejtubwFnzlatVehD-WIp7wj-9Kfxfzj9YvPZVCB5e0W8Xe9LXf_we7NZ25OlGN_YxzVgKRr"></script>
</svelte:head>

<script>
  import { cart } from '../../store'
  cart.useLocalStorage()
  import url from '../../components/getUrl'

  function getRef() {
    let ref = Math.random().toString(36).substring(2,8).toUpperCase()
    if (!/[A-Z0-9]{6}/.test(ref)) return getRef()
    return ref
  }

    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(Object.assign({}, values, {testing: dev})),
    // })
    // .then(r => {
    //   r.json().then(result => {
    //     setSubmitting(false)
    //     submitResponse = result
    //     console.log(result)
    //   })
    // })
    // .catch(e => {
    //   setSubmitting(false)
    //   submitResponse = e
    //   console.log(e)
    // })

</script>
