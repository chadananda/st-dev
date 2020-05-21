import {get, readable, writable} from 'svelte/store';

function noop(data) { return data }

function setPersist(key, value, timestamp = false) {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
    if (timestamp) localStorage.setItem(`${key}_timestamp`, JSON.stringify(new Date()))
  }
  return value
}

function getPersist(key) {
  if (process.browser) return JSON.parse(localStorage.getItem(key))
}

function isExpired(key, ttl) {
  if (process.browser) {
    let stamp = new Date(JSON.parse(localStorage.getItem(`${key}_timestamp`)))
    let now = new Date()
    return stamp.getTime() + (ttl * 1000) < now.getTime()
  }
}

// export function writablePersistant(key, initialValue, transformLocalData = noop) {
//   let localValue = getPersist(key)

//   if (typeof localValue === 'undefined') localValue = setPersist(key, initialValue)
//   else if (transformLocalData !== noop) localValue = transformLocalData(localValue)

//   const store = writable(typeof localValue !== 'undefined' ? localValue : initialValue)

//   const {set: realSet, subscribe, update: realUpdate} = store

//   return {
//     set(value) {
//       realSet(value)
//       setPersist(key, value)
//     },
//     subscribe,
//     update(fn) {
//       realUpdate(fn)
//       setPersist(key, get(store))
//     }
//   };
// }

// export function readableUpdating(initialValue, getData, freq = 3600) {
//   return readable(initialValue, set => {
//     Promise.resolve(getData()).then(value => {
//       set(value)
//     })
//     const interval = setInterval(() => {
//       Promise.resolve(getData()).then(value => {
//         set(value)
//       })
//     }, freq * 1000)

//     return () => {
//       clearInterval(interval)
//     }
//   })
// }

export function readablePersistantUpdating(key, initialValue, getData, freq = 600, transformLocalData = noop) {

  // GET data from localStorage
  let localValue = getPersist(key)
  let immediateUpdate = false

  // IF no local value is stored, just update immediately
  if (localValue === null || localValue === undefined) {
    localValue = initialValue
    immediateUpdate = true
  }
  else {
    // IF the data is expired, use it, but also update immediately
    if (isExpired(key, freq)) immediateUpdate = true
    // IF the data must be transformed, do so
    if (transformLocalData !== noop) localValue = transformLocalData(localValue)
  }

  return readable(localValue, set => {

    if (immediateUpdate) {
      Promise.resolve(getData()).then(value => {
        set(value)
        setPersist(key, value, true)
      })
    }

    const interval = setInterval(() => {
      Promise.resolve(getData()).then(value => {
        set(value)
        setPersist(key, value, true)
      })
    }, freq * 1000)

    return () => {
      clearInterval(interval)
    }
  })
}

// // CREATING THE STORE
// import { readablePersistentUpdating } from 'svelte-persistent-updating'
// export const webinars = readable(
//   'webinars',
//   {
//     calendar: false,
//     archive: false,
//   },
//   async () => {
//     // fetch data
//     // mess with data
//     // return data
//   },
//   600,
//   (data) => {
//     // mess with local data, e.g. to init dates as spacetime.js objects
//   })

// // USING THE STORE
// import { webinars } from './store'
// if ($webinars.calendar) {
//   // ...
// }
