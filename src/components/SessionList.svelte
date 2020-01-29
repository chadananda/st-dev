<script>
  export let course = ''
  import getSessions from './getSessions'
  import Moment from 'moment'
  let sessions
  getSessions().then(res => {
    sessions = res
  })
</script>

<h3>Upcoming Study Retreats</h3>

{#if typeof sessions === 'undefined'}
  <p>Updating list...</p>
{:else}
  <table>
    <tr>
      <th class="date">Date</th>
      <th class="title">Course</th>
      <th class="cost">Cost</th>
      <th class="places">Open Seats</th>
    </tr>
  {#each sessions.filter(v => (
    course && typeof course === 'string'
      ? v.CourseID === course
      : (course || false)
  )) as session}
    <tr class="session pb-1 even:bg-gray-200" class:full={session.Total >= session.Capacity}>
      <td class="date">{session.StartDateDisplay}</td>
      <td class="title"><a href="courses/signup?id={session.CourseID}&date={session.StartDate}">{session.Title}</a></td>
      <td class="cost">{session.Cost ? `$${session.Cost}` : ''}</td>
      <td class="places">{(session.Capacity - session.Total)} / {session.Capacity}</td>
    </tr>
  {:else}
    <p>No courses found.</p>
  {/each}
  </table>
{/if}




<style lang="scss">
  table {
    font-size: 16px;

    width: 100%;
    .full, p {
      font-style: italic;
      opacity: .7;
    }
    th {
      text-align: left;
    }
    tr td {
      padding: 3px !important;
    }
  }
</style>