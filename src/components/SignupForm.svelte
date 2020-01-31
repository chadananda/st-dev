<h2>Register for {course.meta.title}</h2>

<div class="form max-w-full mx-auto" style="width:600px;">
<Form
  initialValues={signupFormSchema.cast({StartDate: StartDate})}
  schema={signupFormSchema}
  on:submit={handleSubmit}
  let:isSubmitting
  let:setValue
  let:values
  let:errors
  let:touched>

  {#if sessions.length > 1}
    <div class="field">
    <label>Session date</label>
    <select bind:value={StartDate} name="date" class="w-full" on:blur={e => setValue('StartDate', e.target.value)}>
    
      <option disabled selected value="" class="italic grey-500">- please select a date -</option>
      {#each sessionOptions as item}
        <option disabled={item.disabled ? true : false} value={item.id}>{item.title}</option>
      {/each}
    </select>
    </div>
  {/if}
  <Input type="hidden" name="StartDate" />

  <label>Name</label>
  <input type="text" name="firstname" class="w-full" on:blur={(e) => {
    let first = e.target.value.split(' ')
    let last = ''
    if (first.length > 1) last = first.splice(-1, 1)[0]
    setValue('FirstName', first.join(' ') || '')
    setValue('LastName', last || '')
  }} />
  <Input type="hidden" name="FirstName" />
  <Input type="hidden" name="LastName" />

  <label>Email address</label>
  <input type="email" class="w-full" on:blur={e => setValue('Email', e.target.value)} />
  <Input type="hidden" name="Email" />

  <label>Phone number</label>
  <div class="field">
    <input type="tel" class="w-full" on:keyup={formatPhone}
      on:blur={e => setValue('Phone', e.target.value)} />
    <Input type="hidden" name="Phone" />
  </div>

  <div class="field clearfix w-full">
    <label class="w-1/2 inline-block">How many people are in your party?</label>
    <input class="w-12 inline-block text-right" type="text" value=1
      on:blur={e => setValue('People', e.target.value)} />
    <Input type="hidden" name="People" />
  </div>

  <div class="field clearfix options-chips">
    <label>Where do you plan to stay?</label>
    {#each housingOptions as item}
      <input type="radio" name="housing" id="housing-{item.id}" value="{item.id}"
        on:click={e => setValue('Housing', e.target.value)} checked={item.id === 'dorm'} >
      <label for="housing-{item.id}">
        {item.title}
        {#if session}
          (${item.id === 'dorm' ? session.Cost : session.DayCost })
        {/if}
      </label>
    {/each}
    <Input type="hidden" name="Housing" />
    {#if values.Housing === 'other'}
      <p class="color-warning">Please be aware that there are NO hotels in the area; this option is only meant for local students.</p>
    {/if}
  </div>

  {#if session}
    <div class="p-4 text-lg leading-loose">
      <div class="sm:flex">
        <div class="sm:flex-grow">{session.StartDateDisplay} – {session.EndDateDisplay} : {session.Title}</div>
        <span class="sm:block">{values.People} x </span>
        <span class="sm:block flex-none text-right w-16">$&nbsp;{values.Housing === 'dorm' ? session.Cost : session.DayCost}</span>
      </div>
      <div class="sm:flex">
        <span class="sm:flex-grow font-bold text-right">Total: </span>
        <span class="sm:block font-bold text-right flex-none w-16">$&nbsp;{values.People * (values.Housing === 'dorm' ? session.Cost : session.DayCost)}</span>
      </div>
      <hr>
      <div class="sm:flex">
        <span class="sm:flex-grow text-right">Registration fee due now: </span>
        <span class="sm:block text-right flex-none w-16">$&nbsp;{values.People * 5}</span>
      </div>
      <div class="sm:flex">
        <span class="sm:flex-grow text-right">Due upon arrival: </span>
        <span class="sm:block text-right flex-none w-16">$&nbsp;{(values.People * (values.Housing === 'dorm' ? session.Cost : session.DayCost)) - (values.People * 5)}</span>
      </div>
    </div>
    <p>A $5 per person registration fee is payable immediately;
    the remainder of the full amount is due upon arrival.</p>
  {/if}

  <button class="big fab" type="submit" disabled={!session || isSubmitting}>Add to cart</button>
  {#if dev}
    <Debug variable={values} />
  {/if}
</Form>
</div>

<script>

  export let sessions
  export let course
  export let StartDate = ''

  import { goto } from '@sapper/app'
  import { cart } from '../store'
  cart.useLocalStorage()
  import { Form, Input } from 'sveltejs-forms';
  import * as yup from 'yup';
  import url from './getUrl.js'
  import Debug from './Debug.svelte'
  let dev = process.env.NODE_ENV !== 'production'
  let today = (new Date()).toISOString().split('T')[0]

  let session
  $: session = sessions.filter(s => s.CourseID === course.meta.id && s.StartDate === StartDate)[0]

  let sessionOptions = sessions.map(s => {
    return {
      id: s.StartDate,
      title: `${s.StartDateDisplay} – ${s.EndDateDisplay}`,
      disabled: (s.StartDate < today),
    }
  })
  if (sessionOptions.length===1) StartDate = sessionOptions[0].id
  let housingOptions = [
    {id: 'dorm', title: 'Our dormitory'},
    {id: 'RV', title: 'Your own RV'},
    {id: 'other', title: 'Other'},
  ];
  let signupFormSchema = yup.object({
    StartDate: yup.string().default('').label('Session date').required().oneOf(sessionOptions.filter(s=>!s.disabled).map(s=>s.id)),
    FirstName: yup.string().default('').label('Name').required().max(255),
    LastName: yup.string().default('').label('Name').max(255),
    Email: yup.string().default('').label('Email').required().email(),
    Phone: yup.string().default('').label('Phone number').matches(/(^\+[-\d\. ]+$|^\(?\d{3}[-\.\) ]*\d{3}[-\. ]*\d{4}$)/, { message: 'A valid phone number is required'}),
    People: yup.number({message: 'At least one person is required'}).default(1).label('Number of people').min(1).max(40),
    Housing: yup.string().default('dorm').label('Housing').oneOf(['dorm', 'RV', 'other'])
  })


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

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    if (typeof session !== undefined) {
      cart.add(Object.assign({session}, values))
      goto('/courses/checkout')
    }
  }

</script>
