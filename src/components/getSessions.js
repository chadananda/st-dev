import url from './getUrl'
import Moment from 'moment';
let sessions = []
let cacheMinutes = 15

export default async function getSessions() {
  if (process.browser) {
    sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    let cacheTime = new Date()
    cacheTime.setMinutes(cacheTime.getMinutes() - cacheMinutes)
    if ((localStorage.getItem('sessionCacheTime') || '0') < cacheTime.toString()) {
      let response = await fetch(url).then(r => r.json())
      if (!response.data) console.error(response)
      sessions = response.data.filter(v => v.CourseID).map(v => {
        v.StartDate = v.StartDate.substring(0,10)
        v.EndDate = v.EndDate.substring(0,10)
        v.StartDateDisplay = (v.StartDate
          ? new Moment(v.StartDate, 'YYYY-MM-DD').format('MMM D')
          : '')
        v.EndDateDisplay = (v.EndDate
          ? new Moment(v.EndDate, 'YYYY-MM-DD').format('MMM D')
          : '')
        return v
      }).sort((a,b) => {
        if (a.StartDate < b.StartDate) return -1
        if (a.StartDate > b.StartDate) return 1
        return a.Title < b.Title ? -1 : 1
      })
      localStorage.setItem('sessions', JSON.stringify(sessions))
      localStorage.setItem('sessionCacheTime', new Date())
    }
  }
  return sessions
}
