<script>
  // edit sessions at:
  // https://docs.google.com/spreadsheets/d/1NUscRAuSmD5sOVcRlBXokQa-5SBlg8bZAsFqqLApz44/edit
  //
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
      <th class="cost hidden sm:table-cell">Cost</th>
      <!-- <th class="places hidden sm:table-cell">Open Seats</th> -->
    </tr>
  {#each sessions.filter(v => (
    CourseID && typeof CourseID === 'string'
      ? v.CourseID === CourseID
      : true
  )) as session}
    <tr class="session pb-1 even:bg-gray-200"
      class:full={session.Total >= session.Capacity}
      class:closed={session.StartDate < today || true}
      class:tentative={!session.Confirmed}>
      <td class="date">{session.StartDateDisplay} – {session.EndDateDisplay}</td>
      <td class="title"><a href="{(session.meta || {}).href || session.href}" on:click={() => {
        if (typeof window !== 'undefined') localStorage.setItem('sessionDate', session.StartDate)
      }}>
      {session.Title}
      {#if !session.Confirmed} (tentative){/if}</a></td>
      <td class="cost hidden sm:table-cell">{session.Cost ? `$${session.Cost}` : ''}</td>
      <!-- <td class="places hidden sm:table-cell">{(session.Capacity - session.Total)} / {session.Capacity}</td> -->
    </tr>
  {:else}
    <p>Loading sessions...</p>
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
    .date { width:9em; }
    .cost { width:4em; text-align:center; }
    // .places { width:5em; text-align:center; }
  }
</style>

