<script>
  import { onMount } from 'svelte'
  let sessions
  let el
  let calendar

  onMount(async () => {
    const { Calendar } = await import('@fullcalendar/core')
    const dayGridPlugin = await import('@fullcalendar/daygrid')
    // const res = await fetch('https://script.google.com/macros/s/AKfycbwey1mm7ceT_uydbuTN9iEsNVtM6pKK04-bS2Fa3Q/exec').then(r => r.json())
    // let allSessions = res.data || []
    // allSessions = allSessions.filter(v => {v.StartDate && v.EndDate})
    // if (course) allSessions = allSessions.filter(v => {v.CourseID === course})
    // sessions = allSessions.map(o => {
    //   return Object.assign({}, {
    //     title: o.Title,
    //     start: o.StartDate,
    //     end: o.EndDate
    //   })
    // })
    // console.log(sessions)
    calendar = new Calendar(el, {
      plugins: [ dayGridPlugin ],
    })
    calendar.render()
  })

</script>

<div id="calendar" bind:this={el}/>
