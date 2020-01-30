<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`courses/${params.slug}.json`);
		const course = await res.json();
		const StartDate = ( query.date ? query.date : ( process.browser ? localStorage.getItem('sessionDate') : '' ))

		if (res.status === 200) {
			return { course, StartDate };
		} else {
			this.error(res.status, course.message);
		}
	}
</script>

<script>
	export let course
	export let StartDate
	import Content from '../../components/Content.svelte'
	import SignupForm from '../../components/SignupForm.svelte'
	import getSessions from '../../components/getSessions'
	let sessions = []
	getSessions().then(data => {
		sessions=data.filter(s => s.CourseID === course.meta.id)
	}).catch(e => {console.log(e)})
</script>

<Content {...course}>
</Content>

{#if sessions.length }
	<SignupForm {sessions} {course} {StartDate} />
{/if}
