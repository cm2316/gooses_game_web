import storeEngine from 'store/src/store-engine'
import storeForLocalStorage from 'store/storages/localStorage'
import storeDefaultPlugin from 'store/plugins/defaults'
const namespaceStore = storeEngine.createStore(
  [storeForLocalStorage],
  [storeDefaultPlugin],
  'Search-History'
)

const sessionKey = 'SearchHistpryKey'
let historys = namespaceStore.get(sessionKey, [])

export const getHistorys = () => {
  return Promise.resolve(historys)
}

export const addHistory = (word) => {
  historys.push(word)
  namespaceStore.set(sessionKey, historys)
  return historys
}

export const removeHistory = (word) => {
  const index = historys.indexOf(word)
  if (index > -1) {
    historys.splice(index, 1)
    namespaceStore.set(sessionKey, historys)
    return true
  }
  return false
}

export const clearHistory = () => {
  historys = []
  namespaceStore.set(sessionKey, historys)
}
