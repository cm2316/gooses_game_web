let historys = []

export const getHistorys = () => {
  return Promise.resolve(historys)
}

export const addHistory = (word) => {
  return historys.push(word)
}

export const removeHistory = (word) => {
  const index = historys.indexOf(word)
  if (index > -1) {
    historys.splice(index, 1)
    return true
  }
  return false
}

export const clearHistory = () => {
  historys = []
}
