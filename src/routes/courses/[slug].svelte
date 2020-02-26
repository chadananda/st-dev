<script context="module">
	import getSessions from '../../components/getSessions'
	export async function preload({ params, query }) {
		const courseJson = await this.fetch(`courses/${params.slug}.json`);
		const course = await courseJson.json();
		const StartDate = ( query.date ? query.date : ( process.browser ? localStorage.getItem('sessionDate') : '' ))
		const sessions = await getSessions().then(sessions => {return sessions.filter(s => s.CourseID === course.meta.id)})

		if (courseJson.status === 200) {
			return { course, StartDate, sessions, noSerialize: () => {} };
		} else {
			this.error(res.status, course.message);
		}
	}
</script>

<script>
	export let course
	export let StartDate
	export let sessions
	export let noSerialize
	noSerialize()
	let displaySessions = sessions.filter(o => o.Confirmed)
	import Content from '../../components/Content.svelte'
	import SignupForm from '../../components/SignupForm.svelte'
</script>

<Content content={course}>
</Content>

{#if displaySessions.length}
<SignupForm sessions={displaySessions} {course} {StartDate} />
{/if}