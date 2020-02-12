<h1 class="title">Registration Checkout</h1>

{#if !submitVisible}
  {#each $cart as item,i}
    <span class="ticket flex flex-col font-circus">
      <span class="text-3xl text-center overflow-hidden" style="line-height:1.25em; max-height:2.5em;">
        <span class="text-base w-8 h-8 leading-loose inline-block text-center cursor-pointer float-right" on:click={(e) => {
          e.preventDefault()
          e.stopPropagation()
          cart.remove(i)
        }}>✖️</span>
        {item.session.Title}
      </span>
      <span class="flex-grow text-xl text-center">{item.session.StartDateDisplay} – {item.session.EndDateDisplay}</span>
      <span>Reserved:
        <span class="w-3/4 h-12 overflow-hidden text-center inline-block border-b border-black text-3xl font-calligraphy">
          <span class="inline-block">{item.FirstName || ''}</span> <span class="inline-block">{item.LastName || ''}</span>
        </span>
      </span>
    </span>

  {:else}
    <p>Your cart is empty.</p>
  {/each}

  {#if $cart.length}
    <span class="block my-4 mx-auto flex" style="width:400px;">
      <span class="block text-2xl flex-none">Pay</span>
      <span class="block flex-auto w-full">
        <select style="margin-left:1em; margin-right:1em;" bind:value={payAmount}>
          <option value="registration">registration only</option>
          <option value="full">full amount now</option>
        </select>
      </span>
      <span class="text-2xl flex-none">${total}</span>
    </span>
  {/if}

  {#if otherSessions.length}
    <h2>Want to stay a little longer?</h2>
    <p>Here are some other programs going on around when you will be here:</p>
    <SessionList sessions={otherSessions} />
  {/if}

  <Debug variable={$cart} />

{:else}
  {#if !submitResponse}
    <h3>Registering</h3>
    <p>We're waiting for confirmation on your registration....</p>

  {:else if submitResponse.success}
    <h3 class="success">You are registered!</h3>
    <p>Your registration has been received for the following courses:</p>
    <ul>
    {#each submitResponse.data.items as text}
      <li>{text}</li>
    {/each}
    </ul>
    <p>Your reference code is <span style="font-family:monospace; font-weight:bold;">{submitResponse.data.reference}</span>.
    You should also receive an email with this information.</p>

  {:else if submitResponse.success === false}
    <h3 class="error">Something went wrong!</h3>
    <p>Please give us a call to sort things out.</p>

  {/if}
{/if}

<div class="my-16 mx-auto" class:hidden={submitVisible} style="width:400px;">
  <div id="paypal-buttons"></div>
</div>



<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <script src="https://www.paypal.com/sdk/js?client-id=ARLTZyWHyejtubwFnzlatVehD-WIp7wj-9Kfxfzj9YvPZVCB5e0W8Xe9LXf_we7NZ25OlGN_YxzVgKRr&currency=USD" on:load={paypalLoaded}></script>
</svelte:head>

<script>
  import { cart } from '../../store'
  cart.useLocalStorage()
  import Debug from '../../components/Debug.svelte'
  import url from '../../components/getUrl'
  import SessionList from '../../components/SessionList.svelte'

  // for adding on sessions around the same time
  import { onMount } from 'svelte'
  let dev = process.env.NODE_ENV !== 'production'
  let otherSessions = []
  let today = (new Date()).toISOString().split('T')[0]
  let startDates = {}, endDates = {}
  let Ref = getRef()
  let payAmount = 'registration'
  let submitResponse = false
  let submitVisible = false
  let checkoutVisible = false
  let createOrder, onApprove
  let mounted, paypalReady
  let total
  $: total = $cart.reduce((t, v) => {
    return t + (payAmount === 'registration' ? v.registrationAmount : v.fullAmount)
  },0)
  $: cartKeys = $cart.map(s => s.session.Key)
  $: {
    otherSessions = $cart.reduce((acc, cur) => {
    return acc.concat((cur.session.prev || []).filter(s => s.StartDate >= today && cartKeys.indexOf(s.Key) === -1))
              .concat((cur.session.next || []).filter(s => s.StartDate >= today && cartKeys.indexOf(s.Key) === -1))
    }, [])
    createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total
          },
          custom_id: `${Ref}:${$cart[0].Email}`,
          invoice_id: Ref,
        }]
      })
    }
    onApprove = (data, actions) => {
      submitVisible = true
      // NOTE: Errors from the Google Apps script are often returned in strange ways,
      // e.g. a CORS error in the browser console, but the last request contains an HTML
      // error report, which triggers the CORS error.
      actions.order.capture().then((details) => {
        fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify(Object.assign({}, {items: $cart, orderID: data.orderID, Ref, testing: dev}))
        })
        .then(r => {
          cart.set([])
          r.json().then(result => {
            submitResponse = result
          })
        })
      })
      .catch(e => {
        submitResponse = e
        console.error(e)
      })
    }
  }

  function getRef() {
    let Ref = Math.random().toString(36).substring(2,8).toUpperCase()
    if (!/[A-Z0-9]{6}/.test(Ref)) return getRef()
    return Ref
  }

  onMount(() => {
    mounted = true
    if (paypalReady) showButtons()
  })

  function paypalLoaded() {
    paypalReady = true
    if (mounted) showButtons()
  }

  let showButtons = () => {
    if ($cart.length) {
      paypal.Buttons({createOrder,onApprove}).render('#paypal-buttons');
    }
  }

</script>

<style lang="scss">
@import "https://fonts.googleapis.com/css?family=Eagle+Lake|Rye&display=swap&subset=latin-ext";
.ticket {
  background: radial-gradient(white 30%,tan 35%), radial-gradient(white 30%,tan 35%), linear-gradient(100deg,tan 20%,hsl(34,44,76) 60%,tan 80%);
  background-size: 4% 17%, 4% 17%, auto;
  background-repeat: repeat-y;
  background-position: -2%, 102%;
  height: 180px;
  width: 480px;
  margin: 0 auto .4em;
  padding: .6em 1em;
  >span {
    text-align: center;
  }
}
// .button.close { background: rgba(0,0,0,.2) }
</style>