import { writable } from 'svelte/store'

export const getItemID = (item) => {
  return [
    item.CourseID || '',
    item.StartDate || '',
    (item.FirstName || '').trim(),
    (item.LastName || '').trim(),
  ].filter(v=>v).join(':')
}

export const getItemIndex = (arr, item) => {
  if (typeof item === 'number') return item
  for (let i=0; i < arr.length; i++) {

    if (item.cartAppID === arr[i].cartAppID &&
        item.FirstName === arr[i].FirstName) return i

    if (arr[i].FirstName === item.FirstName    // where FirstName is equal
        && (arr[i].LastName === item.LastName  // and LastName is equal
          || !arr[i].LastName)                 //     or empty
    ) return i

  }
  return false
}

const writableCartItem = (key, startValue) => {
  const { subscribe, set, update } = writable(startValue);
  
  return {
    subscribe,
    set,
    update,
    add: (item) => update(existing => {
      let i = getItemIndex(existing, item)
      item.cartAppID = getItemID(item)
      if (i !== false) {
        existing.splice(i,1,item)
      }
      else {
        existing.push(item)
      }
      return existing
    }),
    remove: (item) => update(existing => {
      let i = getItemIndex(existing, item)
      if (i !== false) existing.splice(i,1)
      return existing
    }),
    useLocalStorage: () => {
      if (process.browser) {
        const json = localStorage.getItem(key);
        if (json) {
          set(JSON.parse(json));
        }
        subscribe(current => {
          localStorage.setItem(key, JSON.stringify(current));
        });
      }
    }
  };
}

export const cart = writableCartItem('cart', [])
