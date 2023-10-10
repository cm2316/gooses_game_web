import Utils from '../Utils'
const params = Utils.getParams()

/**
 * loop empty function
 */
export const loop = () => {}

/**
 * Get query params and merge values from [append]
 * @param {object} append Merge params
 * @returns object
 */
export const getFormDataBySearch = (append = {}) => {
  const formData = new FormData()
  const queryParams = new URLSearchParams(params)
  for (let [key, value] of queryParams.entries()) {
    formData.set([key], value)
  }
  for (let key in append) {
    formData.set(key, append[key])
  }
  return formData
}

/**
 * Log function
 * @param  {...any} args Log params
 */
export const log = (...args) => {
  console.log(...args)
}
/**
 * Log error function
 * @param  {...any} args Log params
 */
export const errorLog = (...args) => {
  console.error(...args)
}

/**
 * Judge whether it is a child node
 * @param {Element} child Child node
 * @param {Element} parent Parent node
 * @returns boolean
 */
export const isChildOf = (child, parent) => {
  if (child && parent) {
    let parentNode = child.parentNode
    while (parentNode) {
      if (parent === parentNode) {
        return true
      }
      parentNode = parentNode.parentNode
    }
  }
  return false
}

/**
 * Get container dom
 * @param {string|function|object|Element} domFinder Dom finder
 * @returns Element
 */
export const containerValueFinder = (domFinder) => {
  if (typeof domFinder === 'string') {
    return document.querySelector(domFinder)
  }
  if (domFinder instanceof Element) {
    return domFinder
  }
  if (typeof domFinder === 'function') {
    return domFinder()
  }
  if (typeof domFinder === 'object' && domFinder.current) {
    return domFinder.current
  }
  return document.body
}

/**
 * Shuffle array
 * @param {array} array Array to be shuffle
 * @returns array
 */
export const arrayShuffle = (array) => {
  for (
    let j, x, i = array.length;
    i;
    j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x
  );
  return array
}

/**
 * Create group lists by size
 * @param {number} size Group size
 * @param {array} arr Origin list
 * @returns array<array>
 */
export const createGroup = (size, list) => {
  const translateList = []
  list.forEach((item, index) => {
    const page = Math.floor(index / size)
    if (!translateList[page]) {
      // Create a new list
      translateList[page] = []
    }
    translateList[page].push(item)
  })
  return translateList
}

/**
 * Create a promise
 * @returns Promise
 */
export const createPromise = () => {
  const promise = {}
  const r = new Promise((resolve, reject) => {
    promise.resolve = resolve
    promise.reject = reject
  })
  promise.then = Promise.prototype.then.bind(r)
  promise.catch = Promise.prototype.catch.bind(r)
  return promise
}

export const escapeString = (string = '') => {
  try {
    return decodeURIComponent(JSON.parse('"' + string.replace(/"/g, '\\"') + '"'))
  } catch (error) {
    return string
  }
}

export const escapeHtml = (text) => {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }

  return text.replace(/[&<>"']/g, function (m) {
    return map[m]
  })
}

export const getCurrentDate = (date = new Date(), split = '-') => {
  return `${date.getFullYear()}${split}${date.getMonth() + 1}${split}${date.getDate()}`
}

export const getFullAssetPath = (abslutePath) =>
  `${window.location.origin}${process.env.PUBLIC_URL}${abslutePath}`
