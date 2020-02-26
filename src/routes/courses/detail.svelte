<svelte:head>
<title>Course Detail</title>
</svelte:head>

{#if s}
  <h1>{s.Title}</h1>
  <p>{s.Description}</p>
  {#if sessions.length}
    <SignupForm {sessions} course={s} {StartDate} />
  {/if}
{:else}
  <h1>Not Found</h1>
  <p>The requested course was not found.</p>
{/if}

<script context="module">
	import getSessions from '../../components/getSessions'
	export async function preload({ params, query }) {
    const courses = await this.fetch(`courses.json`).then(r => r.json()).then(r => r.reduce((a,c) => {
      if (a.indexOf(c.meta.id) === -1) a.push(c.meta.id)
      return a
    }, []))
    const CourseID = query.id
    if (courses.indexOf(CourseID) !== -1) this.redirect(301, `/courses/${CourseID}`)
    const StartDate = query.date
		let sessions = await getSessions()
    let s = sessions.filter(s => s.CourseID === CourseID && (!StartDate || s.StartDate === StartDate))[0] || false
    return { CourseID, StartDate, sessions, s, noSerialize: () => {} };
	}
</script>

<script>
  import SessionList from '../../components/SessionList.svelte'
  import SignupForm from '../../components/SignupForm.svelte'
  export let StartDate = ''
  export let CourseID
  export let sessions
  export let s
  export let noSerialize
  $: sessions = sessions.filter(s => s.CourseID === CourseID && s.Confirmed)
  noSerialize()
</script>