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

  {#each values.people as p,i}
    {#if !values.people[i].deleted}
      <div class="person" id="person{i}" transition:slide class:show={values.people[i].show} class:deleted={values.people[i].deleted}>
        <div class="label container" class:show={values.people[i].show} class:new={!values.people[i].FirstName} on:click={() => {setValue(`people[${i}].show`, !values.people[i].show)}}>
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
            </div>

            <!-- HOUSING -->

            <div class="group housing">
              <h3>Housing</h3>
              <p>
Our facility has separate dormitories for men and women. For other genders,
please call to make arrangements. It is also possible to bring an RV and park
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
              <div class="options">
                <label for="people[{i}].Allergies">Allergies</label>
                <Choice name="people[{i}].Allergies" options={values.people[i].opts.allergies} multiple />
                <input style="width:95px; margin-left:5px;" type="text" name="add-allergies" placeholder="more?" on:keydown={(e) => {
                  let opt = addOpts(e,i,values)
                  if (opt) setValue(`people[${i}].Allergies`, [...values.people[i].Allergies, opt])
                }} />
              </div>
            </div>

            <!-- TRANSPORT -->

            <div class="group transport">
              <h3>Transportation</h3>
              <label for="Transport">How will {personName(i,values)} arrive at Firm Foundation Academy?</label>
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

  <a bind:this={addPersonLink} href="#person[0]" on:click|preventDefault={(e) => {
    let p = new Person((values.people ? values.people[0] : {}))
    let i = values.people.length
    setValue(`people[${i}]`, p)
    setValue(`people[${i}].idx`,i)
  }}>+ person</a>

  <div class="clearfix" />
  <div class="container">
    <button type="submit">Submit</button>
  </div>

  {#if modalVisible}
    <div class="modal">
      <div id="paypal-buttons"></div>
    </div>
  {/if}
</Form>
</div>

<svelte:head>
  <script src="https://www.paypal.com/sdk/js?client-id=ARLTZyWHyejtubwFnzlatVehD-WIp7wj-9Kfxfzj9YvPZVCB5e0W8Xe9LXf_we7NZ25OlGN_YxzVgKRr"></script>
</svelte:head>

<script>

  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import { Form, Input, Select, Choice } from 'sveltejs-forms';
  import * as yup from 'yup';

  export let CourseID
  export let StartDate
  let values

  let modalVisible
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
          then: yup.string().matches(/(^\+[-\d\.]+$|\(\d{3}\) \d{3}-\d{3}( x\d{1,5})?)/, {message: 'A valid phone number is required'}),
          otherwise: yup.string().matches(/(^\+[-\d\.]+$|\(\d{3}\) \d{3}-\d{3})/, { excludeEmptyString: true }),
        }),
        Housing: yup.string().label('Housing').oneOf(['dorm', 'RV']),
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

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    
    //       https://script.google.com/macros/s/AKfycbwey1mm7ceT_uydbuTN9iEsNVtM6pKK04-bS2Fa3Q/exec
    //       https://script.google.com/macros/s/AKfycbyUVbn2gNvdJqjGuMnjt7HMxcvevS73m0ZBNYtYCeXGLeIDUT6A/exec
    let url="https://script.google.com/macros/s/AKfycbwey1mm7ceT_uydbuTN9iEsNVtM6pKK04-bS2Fa3Q/exec"
    fetch(url, {
      method: "POST",
      body: JSON.stringify(Object.assign({}, values, {testing: true})),
    })
    .then(r => {
      r.json().then(result => {
        setSubmitting(false)
        console.log(result)
      })
    })
    .catch(e => {
      setSubmitting(false)
      console.log(e)
    })
  }

  let opts = {
    housing: [
      { id: "dorm", title: "Dorm" },
      { id: "RV", title: "RV" },
    ],
    sex: [
      { id: "M", title: "Male" },
      { id: "F", title: "Female" }
    ],
    diet: [
      { id: "V", title: "Vegetarian" },
      { id: "Vegan", title: "Vegan" },
      { id: "GF", title: "Gluten-Free" },
    ],
    sleep: [
      { id: "1", title: "Very light" },
      { id: "2", title: "Light" },
      { id: "3", title: "Normal" },
      { id: "4", title: "Heavy" },
      { id: "5", title: "Very heavy" },
    ],
    snore: [
      { id: "1", title: "Unlikely" },
      { id: "2", title: "Lightly" },
      { id: "3", title: "Not sure" },
      { id: "4", title: "Yes" },
      { id: "5", title: "Often" },
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

<style>
  .form { max-width:480px; margin:0 auto; }
  .container, .group { padding:.4em; }
  .group>h3 {
    margin: 1.2em 0 .4em;
    font-weight: bold;
    opacity: .6
  }
  .group>p { 
    font-size: 85%;
    font-style: italic;
    opacity: .8;
  }
  .person {
    border-radius: 5px;
    border: 1px solid lightgray;
    margin: 10px 0;
  }
  .person .new { color:darkgray; }
  .person .label {
    width: 100%;
    background: lightgray;
  }

  :global(.field .message) { font-size:80%; font-style:italic; }
  :global(.field.error) { color:red; }
  :global(.field.error input, .field.error select) { box-shadow: 0 0 4px red; }
  :global(.group>.field>input[type="text"], .group>.field>select) { width:100%; }
  :global(.options>.field) { display:inline; }
  :global(.options>label) { display:block; }

</style>
