<h1 class="title">Registration Checkout</h1>

{#each $cart as item,i}
  <div class="ticket flex flex-col font-circus">
    <div class="text-3xl overflow-hidden" style="line-height:1.25em; max-height:2.5em;">
      <span class="text-base w-8 h-8 leading-loose inline-block text-center cursor-pointer float-right" on:click={(e) => {
        e.preventDefault()
        e.stopPropagation()
        cart.remove(i)
      }}>✖️</span>
      {item.session.Title}
    </div>
    <div class="flex-grow text-xl">{item.session.StartDateDisplay} – {item.session.EndDateDisplay}</div>
    <div>Reserved:
      <span class="w-3/4 h-12 overflow-hidden text-center inline-block border-b border-black text-3xl font-calligraphy">
        <span class="inline-block">{item.FirstName || ''}</span> <span class="inline-block">{item.LastName || ''}</span>
      </span>
    </div>
  </div>
{:else}
  <p>Your cart is empty.</p>
{/each}

{#if otherSessions.length}
  <h2>Want to stay a little longer?</h2>
  <p>There are some other things happening right around when you will be here:</p>
  <SessionList sessions={otherSessions} />
{/if}

<div id="paypal-buttons" class:hide={!$cart.length}></div>

<svelte:head>
  <script src="https://www.paypal.com/sdk/js?client-id=ARLTZyWHyejtubwFnzlatVehD-WIp7wj-9Kfxfzj9YvPZVCB5e0W8Xe9LXf_we7NZ25OlGN_YxzVgKRr"></script>
</svelte:head>

<script>
  import { cart } from '../../store'
  cart.useLocalStorage()
  import url from '../../components/getUrl'
  import SessionList from '../../components/SessionList.svelte'

  // for adding on sessions around the same time
  import getSessions from '../../components/getSessions'
  import Moment from 'moment'
  let sessions = []
  let otherSessions = []
  let today = (new Date()).toISOString().split('T')[0]
  let startDates = {}, endDates = {}
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

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
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
  >div {
    text-align: center;
  }
}
// .button.close { background: rgba(0,0,0,.2) }
</style>