<h2>Registration</h2>

<form class="form max-w-full mx-auto" style="width:600px;" on:submit|preventDefault|stopPropagation={handleSubmit} on:blur={validateForm} >

  {#if sessions.length > 1}
    <div class="field">
    <label>Session date</label>
    <select name="StartDate" bind:value={values.StartDate} class="w-full" class:error={errors.StartDate} on:change={validateForm} >
    
      <option disabled selected value="" class="italic grey-500">- please select a date -</option>
      {#each sessionOptions as item}
        <option disabled={item.disabled ? true : false} value={item.id}>{item.title}</option>
      {/each}
    </select>
    {#if errors.StartDate} <p class="error">{errors.StartDate}</p> {/if}
    </div>
  {/if}

  <div class="field">
    <label>Name</label>
    <input type="text" name="FullName" bind:value={values.FullName} class:error={errors.FullName} autocomplete="name" class="w-full"
      on:blur={validateForm}
      on:change={(e) => {
        let first = e.target.value.split(' ')
        let last = ''
        if (first.length > 1) last = first.splice(-1, 1)[0]
        values.FirstName = first.join(' ') || ''
        values.LastName = last || ''
      }} />
    {#if errors.FullName || errors.FirstName || errors.LastName} <p class="error">{errors.FullName} {errors.FirstName} {errors.LastName}</p> {/if}
  </div>

  <div class="field">
    <label>Email address</label>
    <input type="email" name="Email" bind:value={values.Email} class:error={errors.Email} autocomplete="email" class="w-full" on:blur={validateForm} />
    {#if errors.Email} <p class="error">{errors.Email}</p> {/if}
  </div>

  <div class="field">
    <label>Phone number</label>
    <input type="tel" name="Phone" bind:value={values.Phone} class:error={errors.Phone} autocomplete="tel" class="w-full" on:keyup={formatPhone} on:blur={validateForm} />
    {#if errors.Phone} <p class="error">{errors.Phone}</p> {/if}
  </div>

  <div class="field clearfix w-full">
    <label class="w-1/2 inline-block">How many people are in your party?</label>
    <input class="w-12 inline-block text-right" type="text" name="People" bind:value={values.People} class:error={errors.People} on:blur={validateForm} />
    {#if errors.People} <p class="error">{errors.People}</p> {/if}
  </div>

  <div class="field clearfix options-chips">
    <label>Where do you plan to stay?</label>
    {#each housingOptions as item}
      <input type="radio" bind:group={values.Housing} name="Housing" id="Housing-{item.id}" value="{item.id}" class:error={errors.Housing} checked={item.id === 'dorm'} on:blur={validateForm} >
      <label for="Housing-{item.id}">
        {item.title}
        {#if session && session.CourseID}
          (${item.id === 'dorm' ? session.Cost : session.DayCost })
        {/if}
      </label>
    {/each}
    {#if errors.Housing}
      <p class="error">{errors.Housing}</p>
    {:else if values.Housing === 'other'}
      <p class="warning">Please be aware that there are NO hotels in the area; this option is only meant for local students.</p>
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

  <button class="big fab" type="submit" disabled={!session} >Add to cart</button>
</form>

{#if dev}
  <Debug variable={{values, errors}} />
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
  $: session = (sessions.filter(s => s.CourseID === (course.meta || {}).id && s.StartDate === values.StartDate)[0]) || {}

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
  let errors = {}
  let schema = object({
    StartDate: string().default('').label('Session date').required().oneOf(sessionOptions.filter(s=>!s.disabled).map(s=>s.id), 'Please choose a session' ),
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

  // Form validation
  function validateForm(event) {
    let el = event.target
    let path = el.getAttribute('name')
    errors[path] = ''
    schema.validate(values, {abortEarly:false}).catch(validationErrors => {
      validationErrors.inner.forEach(err => {
        if (err.path === path) errors[err.path] = err.message
      })
      console.error(validationErrors)
    })
  }

  // Form submit
  import url from './getUrl'
  import { goto } from '@sapper/app'
  function handleSubmit() {
    errors = {}
    schema.validate(values, {abortEarly:false}).then(() => {
      if (session) {
        cart.add(Object.assign(totals, {session}, values))
        goto('/courses/checkout')
      }
    }).catch(validationErrors => {
      validationErrors.inner.forEach(err => {
        errors[err.path] = err.message
      })
      console.error(validationErrors)
    })
  }

</script>

<style lang="scss">
  .error {
    color: red;
    border-color: red;
  }
  select.error { color: inherit; }
  .warning {
    background: yellow;
    padding: .5em;
  }
</style>