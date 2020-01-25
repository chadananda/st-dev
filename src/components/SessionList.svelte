<script>
  export let course = ''
  import getSessions from './getSessions'
  import Moment from 'moment'
  let sessions
  getSessions().then(res => {
    sessions = res
  })
</script>

<h3>Upcoming sessions</h3>

{#if typeof sessions === 'undefined'}
  <p>Updating sessions...</p>
{:else}
  <table>
    <tr>
      <th class="date">Date</th>
      <th class="title">Course</th>
      <th class="cost">Cost</th>
      <th class="places">Places</th>
    </tr>
  {#each sessions.filter(v => (
    course && typeof course === 'string' 
      ? v.CourseID === course 
      : (course || false)
  )) as session}
    <tr class="session" class:full={session.Total >= session.Capacity}>
      <td class="date">{session.StartDateDisplay}</td>
      <td class="title"><a href="courses/signup?id={session.CourseID}&date={session.StartDate}">{session.Title}</a></td>
      <td class="cost">{session.Cost ? `$${session.Cost}` : ''}</td>
      <td class="places">{(session.Capacity - session.Total) || 'full'}</td>
    </tr>
  {:else}
    <p>No sessions found.</p>
  {/each}
  </table>
{/if}

<style lang="scss">
  table {
    width: 100%;
    .full, p {
      font-style: italic;
      opacity: .7;
    }
    th {
      text-align: left;
    }
  }
</style>