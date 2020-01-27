<div class="form">
<Form
  {initialValues}
  {schema}
  on:submit={handleSubmit}
  let:isSubmitting
  let:setValue
  let:values
  let:errors
  let:touched>

  <Input type="hidden" name="CourseID" value="{CourseID}" />
  <Input type="hidden" name="StartDate" value="{StartDate}" />
  <Input type="hidden" name="Ref" />
  <Input type="hidden" name="testing" value="true"></Input>

  {#each values.people as p,i}
    {#if !values.people[i].deleted}
      <div class="person" id="person{i}" transition:slide class:show={values.people[i].show} class:deleted={values.people[i].deleted}>
        <div class="label container" class:show={values.people[i].show} class:new={!values.people[i].FirstName} on:click={() => {setValue(`people[${i}].show`, !values.people[i].show)}}>
          {#if i>0}
            <span data-i="{i}" class="button close right" on:click={(e) => {
              e.preventDefault()
              e.stopPropagation()
              let newPeople = [...values.people]
              newPeople.splice(parseInt(e.target.getAttribute('data-i'),10),1)
              setValue('people', newPeople)
            }}>✖️</span>
          {/if}
          {values.people[i].FirstName || "[new person]"} {values.people[i].LastName}
        </div>
        <Input type="hidden" name="people[{i}].idx" value="{i}" />
        {#if values.people[i].show}
          <div class="inputs container" transition:slide>

            <!-- INFO -->

            <div class="group info">
              <h3>Personal information</h3>
              <label>First name</label>
              <Input name="people[{i}].FirstName" />
              <label>Last name</label>
              <Input name="people[{i}].LastName" />
              <label>Email address</label>
              <Input name="people[{i}].Email" />
              <label>Phone number</label>
              <Input name="people[{i}].Phone" />
              <Choice name="people[{i}].remember" multiple options={[{id:'remember', title: `Remember ${personName(i,values)} in this browser`}]} />
            </div>

            <!-- HOUSING -->

            <div class="group housing">
              <h3>Housing</h3>
              <p>
Our facility has dormitories and bathrooms for men and women; for other needs
please contact us. It is also possible to bring an RV and park
in the lot. While some of our rooms are fully enclosed, others are open near
the ceiling. We realize some of our questions can be sensitive in nature, so
your responses will be shared only on a need to know basis.
              </p>
              <label>Housing arrangement</label>
              <Select name="people[{i}].Housing" options={opts.housing} />
              {#if values.people[i].Housing === "dorm"}
                <label>Gender</label>
                <Choice name="people[{i}].Sex" options={opts.sex} />
                <label>How deeply does {personName(i,values)} sleep?</label>
                <Select name="people[{i}].Sleep" options={opts.sleep} value="3" />
                <label>How likely is {personName(i,values)} to snore?</label>
                <Select name="people[{i}].Snore" options={opts.snore} value="3" />
              {/if}
            </div>

            <!-- FOOD -->

            <div class="group food">
              <h3>Food</h3>
              <p>
While this section is optional, please keep in mind that due to our location 
there are no supermarkets close to us. We would appreciate you being as detailed 
as possible as we strive to create meals and snacks that appeal to all of our 
participants. We do provide a small refrigerator and cupboard for participant's 
personal food you might bring with you. The dorm is a food-free zone and consumables 
should not be left in your vehicle due to local wildlife.
              </p>
              <div class="options">
                <label for="people[{i}].Diet">Diet</label>
                <Choice name="people[{i}].Diet" options={opts.diet} multiple />
              </div>
              <div class="options inline">
                <label for="people[{i}].Allergies">Allergies</label>
                <Choice name="people[{i}].Allergies" options={values.people[i].opts.allergies} multiple />
                <input style="width:95px;" type="text" name="add-allergies" placeholder="more?" on:keydown={(e) => {
                  let opt = addOpts(e,i,values)
                  if (opt) setValue(`people[${i}].Allergies`, [...values.people[i].Allergies, opt])
                }} />
              </div>
            </div>

            <!-- TRANSPORT -->

            <div class="group transport">
              <h3>Transportation</h3>
              <label for="Transport">How will {personName(i,values)} travel here?</label>
              <Select name="people[{i}].Transport" options={opts.transport} />
              {#if values.people[i].Transport}
                <p>
If you need transportation to/from Firm Foundation Academy, we will be at
Sacramento Airport on arrival and departure days at the following times: <br>
- 9am - 9:45am <br>
- 3pm - 3:45pm <br>
If your arrival and departure times do not fit this schedule, there is a local
shuttle company that you can book through directly with them (we can provide
contact information upon request).
                </p>
                <label for="people[{i}].Arrival">Flight In</label>
                <Input type="text" name="people[{i}].Arrival" />
                <label for="people[{i}].Departure">Flight Out</label>
                <Input type="text" name="people[{i}].Departure" />
              {/if}
            </div>

          </div>
        {/if}
      </div>
    {/if}
  {/each}
  <div class="clearfix" />
  <div class="container">

    <button type="button" class="big" bind:this={addPersonLink} 
      on:click={(e) => {
        let p = new Person((values.people ? values.people[0] : {}))
        let i = values.people.length
        setValue(`people[${i}]`, p)
        setValue(`people[${i}].idx`,i)
      }}
      on:focus={(e) => {
        for (let i = 0; i < values.people.length; i++) {
          setValue(`people[${i}].show`, false)
        }
      }}
    >+ person</button>

    <button class="big fab" type="submit">Register</button>
  </div>
  {#if dev}
    <Debug variable={values} />
  {/if}
</Form>
</div>

{#if submitVisible}
  <div class="modal" class:success={submitResponse.success}>
    {#if submitResponse === {}}
      <h3>Registering...</h3>
      <p>We're waiting for confirmation on your registrations:</p>
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
      <p>We're not sophisticated enough to know exactly what it was,
      but we hope you'll give us a call to sort things out.</p>
    {/if}
    <button type="button" class="center" on:click={() => submitVisible = false}>OK</button>
  </div>
{/if}

<script>

  export let CourseID
  export let StartDate

  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import { Form, Input, Select, Choice } from 'sveltejs-forms';
  import * as yup from 'yup';
  import url from './getUrl.js'
  import Debug from './Debug.svelte'
  let dev = process.env.NODE_ENV === 'development'

  let submitVisible
  let submitResponse = {}

  let values

  let addPersonLink

  let initialValues = { 
    CourseID: CourseID,
    StartDate: StartDate,
    Ref: getRef(),
    people: []
  }

  function getRef() {
    let ref = Math.random().toString(36).substring(2,8).toUpperCase()
    if (!/[A-Z0-9]{6}/.test(ref)) return getRef()
    return ref
  }

  const schema = yup.object().shape({
    Ref: yup.string().required().matches(/[A-Z0-9]{6}/),
    CourseID: yup.string().required().max(50),
    StartDate: yup.string().required().matches(/\d{4}-\d{2}-\d{2}/),
    people: yup.array().min(1).of(
      yup.object().shape({
        idx: yup.mixed(),
        FirstName: yup.string().label('First Name').required().max(255),
        LastName: yup.string().label('Last Name').max(255),
        Email: yup.mixed().label('Email').when('idx', {
          is: 0,
          then: yup.string().required().email(),
          otherwise: yup.string().email()
        }),
        Phone: yup.mixed().label('Phone number').when('idx', {
          is: 0,
          then: yup.string().matches(/(^\+[-\d\. ]+$|^\(?\d{3}[-\.\) ]*\d{3}[-\. ]*\d{4}$)/, {message: 'A valid phone number is required'}),
          otherwise: yup.string().matches(/(^\+[-\d\. ]+$|^\(?\d{3}[-\.\) ]*\d{3}[-\. ]*\d{4}$)/, { excludeEmptyString: true, message: 'This is not a valid phone number.'}),
        }),
        Housing: yup.string().label('Housing').oneOf(['dorm','RV','day']),
        Sex: yup.mixed().label('Dorm gender').when('Housing', {
          is: 'dorm',
          then: yup.string().required().oneOf(['M', 'F']),
        }),
        Sleep: yup.mixed().label('Slumber depth').when('Housing', {
          is: 'dorm',
          then: yup.number().oneOf([1,2,3,4,5])
        }),
        Snore: yup.mixed().label('Snore probability').when('Housing', {
          is: 'dorm',
          then: yup.number().oneOf([1,2,3,4,5]),
        }),
        Diet: yup.array().label('Diet'),
        Allergies: yup.array().label('Allergies'),
        Transport: yup.string().label('Transport').oneOf(['', 'flight', 'bus', 'train']),
        Arrival: yup.string().label('Arrival').max(255),
        Departure: yup.string().label('Departure').max(255),
      })),
  })

  class Person {
    constructor(template = {}) {
      this.FirstName = ''
      this.LastName = ''
      this.Email = ''
      this.Phone = ''
      this.Housing = template.Housing || 'dorm'
      this.Sleep = '3'
      this.Snore = '3'
      this.Diet = []
      this.Allergies = []
      this.Transport = template.Transport || ''
      this.Arrival = template.Arrival || ''
      this.Departure = template.Departure || ''
      this.remember = ['remember']
      this.show = true
      this.deleted = false
      this.opts = {
        allergies: [
          { id: "corn", title: "corn" },
          { id: "dairy", title: "dairy" },
          { id: "nuts", title: "nuts" },
          { id: "soy", title: "soy" },
          { id: "sugar", title: "sugar" },
        ]
      }
    }
  }

  $: personName = (i, v) => {
    if (v.people && v.people[i]) return v.people[i].FirstName.trim() || 'this person'
    return 'this person'
  }

  onMount(() => {
    addPersonLink.click()
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
    submitVisible = true
    setSubmitting(true)
    fetch(url, {
      method: "POST",
      body: JSON.stringify(Object.assign({}, values, {testing: true})),
    })
    .then(r => {
      r.json().then(result => {
        setSubmitting(false)
        submitResponse = result
        console.log(result)
      })
    })
    .catch(e => {
      setSubmitting(false)
      submitResponse = e
      console.log(e)
    })
  }

  let opts = {
    housing: [
      { id: "dorm", title: "Dorm" },
      { id: "RV", title: "RV" },
      { id: "day", title: "Outside / day student"},
    ],
    sex: [
      { id: "M", title: "men" },
      { id: "F", title: "women" }
    ],
    diet: [
      { id: "V", title: "vegetarian" },
      { id: "Vegan", title: "vegan" },
      { id: "GF", title: "gluten-free" },
    ],
    sleep: [
      { id: "1", title: "1: very light" },
      { id: "2", title: "2: light" },
      { id: "3", title: "3: don't know" },
      { id: "4", title: "4: heavy" },
      { id: "5", title: "5: very heavy" },
    ],
    snore: [
      { id: "1", title: "1. unlikely" },
      { id: "2", title: "2. occasionally" },
      { id: "3", title: "3. don't know" },
      { id: "4", title: "4. likely" },
      { id: "5", title: "5. definitely" },
    ],
    transport: [
      { id: "", title: "Drive / I will make arrangements"},
      { id: "flight", title: "Flight (SMF, Sacramento Airport)" },
      { id: "train", title: "Train (Sacramento / Auburn)"},
      { id: "bus", title: "Bus (Sacramento)"},
    ]
  }

  function addOpts(e,i,values) {
    if (e.key === "Enter") {
      let opt = e.target.name.replace('add-', '')
      let a = e.target.value
      values.people[i].opts[opt].push({id: a, title: a})
      e.target.value = ''
      e.preventDefault()
      e.stopPropagation()
      return a
    }
  }

</script>

<style lang="scss">
  @import "../style/theme.scss";
  .form { max-width:600px; margin:0 auto; }
  div.modal {
    width: 80%;
    max-width: 560px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $color-bg;
    border-radius: .5em;
    box-shadow: 2px 0 20px 8px rgba(126,126,126,.8);
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 80%;
    padding: 2em;
  }
  .container, .group { padding:.4em; }
  .group>h3 {
    margin: .6em 0 .4em;
    font-weight: bold;
    opacity: .6;
    font-size: 170%;
  }
  .group>p {
    font-style: italic;
    opacity: .8;
  }
  .person {
    border-radius: 5px;
    border: 1px solid $color-border;
    margin: 10px 0;
  }
  .person .new { color: darken($color-border, 30%); }
  .person .label {
    font-size: 120%;
    font-variant: small-caps;
    text-transform: capitalize;
    width: 100%;
    background: $color-border;
  }

</style>
