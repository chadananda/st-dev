<Form
  {initialValues}
  on:submit={handleSubmit}
  let:isSubmitting
  let:setValue
  let:values
  let:errors
  let:touched>

  <Input type="hidden" name="CourseID" value="{CourseID}" />
  <Input type="hidden" name="StartDate" value="{StartDate}" />

  {#each people as p,i}
    {#if !people[i].deleted}
      <div class="person" id="person{i}" transition:slide class:show={people[i].show} class:deleted={people[i].deleted}>
        {#if (values.people && values.people[i])}
          <div class="label container" class:show={people[i].show} class:new={!values.people[i].FirstName} on:click={() => {people[i].show = !people[i].show}}>
            {values.people[i].FirstName || "[new person]"} {values.people[i].LastName}
          </div>
        {/if}
        {#if people[i].show}
          <div class="inputs container" transition:slide>
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
            <div class="group housing">
              <h3>Housing</h3>
              <p>
Our facility has separate dormitories for men and women. For other genders,
please call to make arrangements. It is also possible to bring an RV and park
in the lot. While some of our rooms are fully enclosed, others are open near
the ceiling. We realize some of our questions can be sensitive in nature, so
your responses will be shared only on a need to know basis).
              </p>
              <label>Housing arrangement</label>
              <Select name="people[{i}].Housing" options={opts.housing} />
              {#if values.people && values.people[i] && values.people[i].Housing === "dorm"}
                <label>Gender</label>
                <Choice name="people[{i}].Sex" options={opts.sex} />
                <label>How deeply does {values.people[i].FirstName || 'this person'} sleep?</label>
                <Select name="people[{i}].Sleep" options={opts.sleep} value="3" />
                <label>How likely is {values.people[i].FirstName || 'this person'} to snore?</label>
                <Select name="people[{i}].Snore" options={opts.snore} value="3" />
              {/if}
            </div>
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
            <label for="people[{i}].Diet">Diet</label>
            <Choice name="people[{i}].Diet" options={opts.diet} multiple />
            <label for="people[{i}].Allergies">Allergies</label>
            <Choice name="people[{i}].Allergies" options={people[i].allergies} multiple />
            <label for="add-allergy">Other food allergies:</label>
            <input type="text" name="add-allergy" placeholder="e.g. 'eggs'" on:keydown={(e) => {
              let a = addAllergy(e,i)
              if (a) setValue(`people[${i}].Allergies`, [...values.people[i].Allergies, a])
            }} />
            </div>
          </div>
        {/if}
      </div>
    {/if}
  {/each}

  <a href="#person{people.length}" on:click|preventDefault={(e) => {
    addPerson()
    let i = people.length - 1
    setValue(`people[${i}]`, people[i])
  }}>+ person</a>

  <div class="clearfix" />
  <div class="container">

    <label for="FlightIn">Flight In</label>
    <Input type="text" name="FlightIn" placeholder="9am Southwest #867" />
    <label for="FlightOut">Flight Out</label>
    <Input type="text" name="FlightOut" placeholder="10pm Southwest #1032" />
  </div>
  <div class="container">
    <button type="submit">Submit</button>
  </div>
  <div class="clearfix" />
  {JSON.stringify(values)}
</Form>


<script>

  import { slide } from 'svelte/transition'
  import { Form, Input, Select, Choice } from 'sveltejs-forms';
  import * as yup from 'yup';

  export let CourseID
  export let StartDate

  class Person {
    constructor(template = {}) {
      this.FirstName = ''
      this.LastName = template.LastName || ''
      this.Email = ''
      this.Phone = ''
      this.Housing = template.Housing || 'dorm'
      this.Sleep = "3"
      this.Snore = "3"
      this.show = true
      this.deleted = false
      this.allergies = [
        { id: "corn", title: "corn" },
        { id: "dairy", title: "dairy" },
        { id: "nuts", title: "nuts" },
        { id: "soy", title: "soy" },
        { id: "sugar", title: "sugar" },
      ]
    }
  }

  let initialValues = { 
    CourseID: CourseID,
    StartDate: StartDate,
    people: [ new Person ]
  }

  let people = [new Person]

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 2000)
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
      { id: "VGN", title: "Vegan" },
      { id: "V", title: "Vegetarian" },
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
  }

  function addAllergy(e,i) {
    if (e.key === "Enter") {
      let a = e.target.value
      people[i].allergies.push({id: a, title: a})
      people = people
      e.target.value = ''
      return a
    }
  }

  function addPerson() {
    for (let i = 0; i < people.length; i++) {
      people[i].show = false
    }
    people.push(new Person())
    people = people
  }

</script>

<style>
  div.container, div.group { padding:.4em; }

  div.group>h3 {
    margin: 1.2em 0 .4em;
    font-weight: bold;
    opacity: .6
  }
  div.group>p { 
    font-size: 85%;
    font-style: italic;
    opacity: .8;
  }

  .person {
    display: inline-block;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin: 0 10px 10px 0;
  }
  .person.show { display:block; margin: 0; }
  .person.deleted { display:none; }

  .person .new { color:darkgray; }
  .person .label {
    width: 100%;
    background: lightgray;
  }

  .clearfix:after { content:""; clear:both; display:table; }

</style>
