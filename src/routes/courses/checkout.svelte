<h1 class="title">Registration Checkout</h1>

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

<div class="my-16 mx-auto" style="width:400px;">
    <script src="https://www.paypal.com/sdk/js?client-id=ARLTZyWHyejtubwFnzlatVehD-WIp7wj-9Kfxfzj9YvPZVCB5e0W8Xe9LXf_we7NZ25OlGN_YxzVgKRr&currency=USD"></script>
    <div id="paypal-buttons"></div>
</div>

{#if otherSessions.length}
  <h2>Want to stay a little longer?</h2>
  <p>Here are some other programs going on around when you will be here:</p>
  <SessionList sessions={otherSessions} />
{/if}


{#if submitVisible}
  <div class="fixed inset-0 z-50 overflow-auto bg-smoke-light flex" on:click={() => submitVisible = false}>
  <div class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex" class:success={submitResponse.success}>
    {#if !submitResponse}
      <h3>Registering</h3>
      <p>We're waiting for confirmation on your registration....</p>
    {:else if submitResponse.success}
      <h3 class="success">You are registered!</h3>
      <p>Your registration has been received for the following people:</p>
      <ul>
      {#each submitResponse.data.people as p}
        <li>{p}</li>
      {/each}
      </ul>
      <p>Your reference code is <span style="font-family:monospace; font-weight:bold;">{submitResponse.data.reference}</span>.
      You should also receive an email with this information.</p>
    {:else if submitResponse.success === false}
      <h3 class="error">Something went wrong!</h3>
      <p>Please give us a call to sort things out.</p>
    {/if}
    <button type="button" class="center" on:click={() => submitVisible = false}>OK</button>
  </div>
  </div>
{/if}


<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
</svelte:head>

<script>
  import { cart } from '../../store'
  cart.useLocalStorage()
  import url from '../../components/getUrl'
  import SessionList from '../../components/SessionList.svelte'

  // for adding on sessions around the same time
  import getSessions from '../../components/getSessions'
  import Moment from 'moment'
  import { onMount } from 'svelte'
  let dev = process.env.NODE_ENV !== 'production'
  let sessions = []
  let otherSessions = []
  let today = (new Date()).toISOString().split('T')[0]
  let startDates = {}, endDates = {}
  let ref = getRef()
  let payAmount = 'registration'
  let submitResponse = false
  let submitVisible = false
  let total
  function getTotal(amount = 'registration') {
    return $cart.reduce((t, v) => {
      return t + (amount === 'registration' ? v.registrationAmount : v.fullAmount)
    },0)
  }
  $: total = getTotal(payAmount)
  $: for (let i=0; i<$cart.length; i++) {
    let StartDate = new Moment($cart[i].session.StartDate, 'YYYY-MM-DD')
    let EndDate = new Moment($cart[i].session.EndDate, 'YYYY-MM-DD')
    startDates[$cart[i].session.StartDate] = {from: StartDate.format('YYYY-MM-DD'), to: StartDate.subtract(3, 'days').format('YYYY-MM-DD')}
    endDates[$cart[i].session.EndDate] = {from: EndDate.format('YYYY-MM-DD'), to: EndDate.add(3, 'days').format('YYYY-MM-DD')}
  }
  getSessions().then(data => {
    sessions = data
  })
  $: otherSessions = sessions.filter(s => {
    if (s.startDate < today) return false
    let yes = false
    Object.keys(startDates).forEach(k => {
      if (s.EndDate >= startDates[k].from && s.EndDate <= startDates[k].to) yes = true
    })
    Object.keys(endDates).forEach(k => {
      if (s.StartDate >= endDates[k].from && s.StartDate <= endDates[k].to) yes = true
    })
    return yes
  })

  function getRef() {
    let ref = Math.random().toString(36).substring(2,8).toUpperCase()
    if (!/[A-Z0-9]{6}/.test(ref)) return getRef()
    return ref
  }

  onMount(() => {
    total = getTotal(payAmount)
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total
            },
            custom_id: `${ref}:${$cart[0].Email}`,
            invoice_id: ref,
          }]
        })
      },
      onApprove: (data, actions) => {
        submitVisible = true
        actions.order.capture().then((details) => {
          fetch(url, {
            method: "POST",
            body: JSON.stringify(Object.assign({}, $cart, {Ref: ref, testing: dev}))
          })
          .then(r => {
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
    }).render('#paypal-buttons');
  })

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