<h2>Register for {course.meta.title}</h2>

<form class="form max-w-full mx-auto" style="width:600px;" on:submit={handleSubmit}>

  {#if sessions.length > 1}
    <div class="field">
    <label>Session date</label>
    <select name="StartDate" bind:value={values.StartDate} class="w-full" >
    
      <option disabled selected value="" class="italic grey-500">- please select a date -</option>
      {#each sessionOptions as item}
        <option disabled={item.disabled ? true : false} value={item.id}>{item.title}</option>
      {/each}
    </select>
    </div>
  {/if}

  <div class="field">
    <label>Name</label>
    <input type="text" name="FullName" bind:value={values.FullName} autocomplete="name" class="w-full" on:change={(e) => {
      let first = e.target.value.split(' ')
      let last = ''
      if (first.length > 1) last = first.splice(-1, 1)[0]
      values.FirstName = first.join(' ') || ''
      values.LastName = last || ''
    }} />
  </div>

  <div class="field">
    <label>Email address</label>
    <input type="email" name="Email" bind:value={values.Email} autocomplete="email" class="w-full" />
  </div>

  <div class="field">
    <label>Phone number</label>
    <input type="tel" name="Phone" bind:value={values.Phone} autocomplete="tel" class="w-full" on:keyup={formatPhone} />
  </div>

  <div class="field clearfix w-full">
    <label class="w-1/2 inline-block">How many people are in your party?</label>
    <input class="w-12 inline-block text-right" type="text" name="People" bind:value={values.People} />
  </div>

  <div class="field clearfix options-chips">
    <label>Where do you plan to stay?</label>
    {#each housingOptions as item}
      <input type="radio" bind:group={values.Housing} name="Housing" id="Housing-{item.id}" value="{item.id}" checked={item.id === 'dorm'} >
      <label for="Housing-{item.id}">
        {item.title}
        {#if session && session.CourseID}
          (${item.id === 'dorm' ? session.Cost : session.DayCost })
        {/if}
      </label>
    {/each}
    {#if values.Housing === 'other'}
      <p class="color-warning">Please be aware that there are NO hotels in the area; this option is only meant for local students.</p>
    {/if}
  </div>

  {#if session && session.CourseID}
    <div class="p-4 text-lg leading-loose">
      <div class="sm:flex">
        <div class="sm:flex-grow">{session.StartDateDisplay} – {session.EndDateDisplay} : {session.Title}</div>
        <span class="sm:block">{values.People} x </span>
        <span class="sm:block flex-none text-right w-16">$&nbsp;{values.Housing === 'dorm' ? session.Cost : session.DayCost}</span>
      </div>
      <div class="sm:flex">
        <span class="sm:flex-grow font-bold text-right">Total: </span>
        <span class="sm:block font-bold text-right flex-none w-16">$&nbsp;{totals.fullAmount}</span>
      </div>
      <hr>
    </div>
    <p>A $5 per person registration fee (${totals.registrationAmount}) is payable immediately;
    the remainder may be paid now or upon arrival.</p>
  {/if}

  <button class="big fab" type="submit" disabled={!session}>Add to cart</button>
</form>

{#if dev}
  <Debug variable={{values, session}} />
{/if}

<script>

  export let sessions
  export let course
  export let StartDate = ''

  // initialize cart
  import { cart } from '../store'
  cart.useLocalStorage()
  let values = {
    StartDate: StartDate,
    FullName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    People: 1,
    Housing: 'dorm',
  }

  // onMount: set form values based on cart item
  import { onMount } from 'svelte'
  onMount(() => {
    if ($cart.length) values = Object.assign(values, {
      FullName: $cart[0].FullName || `${$cart[0].FirstName} ${$cart[0].LastName}` || '',
      FirstName: $cart[0].FirstName || '',
      LastName: $cart[0].LastName || '',
      Email: $cart[0].Email || '',
      Phone: $cart[0].Phone || '',
      People: $cart[0].People || 1,
      Housing: $cart[0].Housing || 'dorm',
    })
  })

  // Elements for debugging and development
  import Debug from './Debug.svelte'
  let dev = process.env.NODE_ENV !== 'production'

  // Calculate session based on form value
  let session = {}
  $: session = (sessions.filter(s => s.CourseID === course.meta.id && s.StartDate === values.StartDate)[0]) || {}

  // Calculate totals
  let totals = { fullAmount:0, registrationAmount:0 }
  $: totals = Object.assign({}, {
    fullAmount: ((values.Housing === 'dorm') ? session.Cost || 0 : session.DayCost || 0) * values.People || 1,
    registrationAmount: 5 * values.People || 1,
  })

  // Get selectable session options
  let today = (new Date()).toISOString().split('T')[0]
  let sessionOptions = sessions.map(s => {
    return {
      id: s.StartDate,
      title: `${s.StartDateDisplay} – ${s.EndDateDisplay}`,
      disabled: (s.StartDate < today),
    }
  })
  if (sessionOptions.length===1) values.StartDate = sessionOptions[0].id

  // Get selectable housing options
  let housingOptions = [
    {id: 'dorm', title: 'Our dormitory'},
    {id: 'RV', title: 'Your own RV'},
    {id: 'other', title: 'Other'},
  ];

  // Form validation
  import {object, string, number} from 'yup';
  let schema = object({
    StartDate: string().default('').label('Session date').required().oneOf(sessionOptions.filter(s=>!s.disabled).map(s=>s.id)),
    FirstName: string().default('').label('Name').required().max(255),
    LastName: string().default('').label('Name').max(255),
    Email: string().default('').label('Email').required().email(),
    Phone: string().default('').label('Phone number').matches(/(^\+[-\d\. ]+$|^\(?\d{3}[-\.\) ]*\d{3}[-\. ]*\d{4}$)/, { message: 'A valid phone number is required'}),
    People: number({message: 'At least one person is required'}).default(1).label('Number of people').min(1).max(40),
    Housing: string().default('dorm').label('Housing').oneOf(['dorm', 'RV', 'other'])
  })

  // Phone field typing helper
  let formatPhone = (e) => {
    let bksp = (e.keyCode == 8 || e.keyCode == 46)
    if (/^\+/.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^-\+\d\. \(\)x]/g,'')
    }
    else {
      let ph = e.target.value.replace(/\D/g,'').substring(0,10)
      let len = ph.length
      if(len==0){
          ph=ph;
      }else if(len<3){
          ph='('+ph;
      }else if(len==3){
          ph = '('+ph + (bksp ? '' : ') ');
      }else if(len<6){
          ph='('+ph.substring(0,3)+') '+ph.substring(3,6);
      }else if(len==6){
          ph='('+ph.substring(0,3)+') '+ph.substring(3,6)+ (bksp ? '' : '-');
      }else{
          ph='('+ph.substring(0,3)+') '+ph.substring(3,6)+'-'+ph.substring(6,10);
      }
      e.target.value = ph;
    }
  }

  // Form submit
  import url from './getUrl'
  import { goto } from '@sapper/app'
  function handleSubmit() {
    if (session) {
      cart.add(Object.assign(totals, {session}, values))
      goto('/courses/checkout')
    }
  }

</script>
