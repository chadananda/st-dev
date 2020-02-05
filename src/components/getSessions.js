import url from './getUrl'
const cacheMinutes = 15
const adjacentDays = 3

async function doGet() {
  let sessions = []
  let response = await fetch(url).then(r => r.json())
  if (!response.data) throw new Error('No database connection.')
  sessions = response.data.filter(v => v.CourseID)
  .sort((a,b) => {
    if (a.StartDate < b.StartDate) return -1
    if (a.StartDate > b.StartDate) return 1
    return a.Title < b.Title ? -1 : 1
  })
  .map(v => {
    v.StartDate = v.StartDate.substring(0,10)
    v.EndDate = v.EndDate.substring(0,10)
    return v
  })
  sessions = sessions.map((v,i) => {
    let x
    v.next = []
    v.prev = []
    let NearStartDate = new Date(v.StartDate + 'T00:00:00.000Z')
    NearStartDate.setDate(NearStartDate.getDate() - adjacentDays)
    NearStartDate = NearStartDate.toISOString().split('T')[0]
    let NearEndDate = new Date(v.EndDate + 'T00:00:00.000Z')
    NearEndDate.setDate(NearEndDate.getDate() + adjacentDays)
    NearEndDate = NearEndDate.toISOString().split('T')[0]
    for (x=i; x>0; x--) {
      if (sessions[x-1].EndDate >= NearStartDate && sessions[x-1].EndDate <= v.EndDate) v.prev.push(Object.assign({}, sessions[x-1], {next: undefined, prev: undefined}))
      else break;
    }
    for (x=i+1; x<sessions.length; x--) {
      if (sessions[x].StartDate <= NearEndDate && sessions[x].StartDate >= v.EndDate) v.next.push(Object.assign({}, sessions[x]))
      else break;
    }
    return v
  })
  localStorage.setItem('sessions', JSON.stringify(sessions))
  localStorage.setItem('sessionCacheTime', new Date())
  return sessions
}

export default async function getSessions(update = false) {
  let sessions = []
  if (process.browser) {
    if (update) {
      sessions = await doGet()
      return sessions
    }
    sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    let cacheTime = new Date()
    cacheTime.setMinutes(cacheTime.getMinutes() - cacheMinutes)
    if ((localStorage.getItem('sessionCacheTime') || '0') < cacheTime.toString()) {
      sessions = await doGet()
    }
  }
  return sessions
}
