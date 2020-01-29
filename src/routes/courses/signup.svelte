<script context="module">
  export async function preload({ query }) {
    let course = {}
    try {
      course = await this.fetch(`courses/${query.id}.json`).then(r => r.json())
    }
    catch(e) {
      console.error(e)
    }
    return { CourseID: query.id, StartDate: query.date, course }
  }
</script>

<script>
  export let CourseID
  export let StartDate
  export let course = {}
  let session
  import getSessions from '../../components/getSessions'
  import SignupForm from '../../components/SignupForm.svelte'
  getSessions().then(sessions => {
    session = sessions.filter(v => (v.CourseID === CourseID && v.StartDate === StartDate))[0] || false
  })
</script>


{#if typeof session === 'undefined'}
  <h1 class="title">Session signup</h1>
  <p>Refreshing session information...</p>
{:else if !session}
  <h1 class="title">Session signup</h1>
  <p class="error">This session was not found. Return to the <a href="courses">course list</a>.</p>
{:else}
  <h1 class="title">Session signup: {session.Title}</h1>

  {#if session.Total >= session.Capacity}
  <p class="error">This session is full.</p>
  {/if}

  {#if course.excerpt}
    {@html course.excerpt}
  {:else if session.Description}
    <p>{session.Description}</p>
  {/if}

  <div class="row"><span>Dates:</span> {session.StartDateDisplay} – {session.EndDateDisplay}</div>
  <div class="row"><span>Cost:</span> {session.Cost ? `$${session.Cost} per person` : ''}</div>

  <SignupForm {session} />
{/if}



<style>


</style>



