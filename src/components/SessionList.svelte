<script>
  export let CourseID = ''
  export let sessions
  let today = (new Date()).toISOString().split('T')[0]
</script>

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
    CourseID && typeof CourseID === 'string'
      ? v.CourseID === CourseID
      : true
  )) as session}
    <tr class="session pb-1 even:bg-gray-200"
      class:full={session.Total >= session.Capacity}
      class:closed={session.StartDate < today}
      class:tentative={!session.Confirmed}>
      <td class="date">{session.StartDateDisplay} – {session.EndDateDisplay}</td>
      <td class="title"><a href="courses/{session.CourseID}" on:click={() => {
        if (window && localStorage) localStorage.setItem('sessionDate', session.StartDate)
      }}>
      {session.Title}
      {#if !session.Confirmed} (tentative){/if}</a></td>
      <td class="cost">{session.Cost ? `$${session.Cost}` : ''}</td>
      <td class="places">{(session.Capacity - session.Total)} / {session.Capacity}</td>
    </tr>
  {:else}
    <p>No sessions found.</p>
  {/each}
  </table>
{/if}




<style lang="scss">
  table {
    font-size: 16px;

    width: 100%;
    .full, .tentative, p {
      font-style: italic;
      opacity: .7;
    }
    .full, .tentative {
      font-weight: 100;
    }
    .closed {
      text-decoration: line-through;
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