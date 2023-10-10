import axios from 'axios'

// Revalidate response data
const defaultValidate = (response) => {
  if (response.data && response.data.success) {
    return response.data.result
  }
  return false
}

// Cancel token map
const cancelTokenMap = new Map()

const CancelToken = axios.CancelToken
/**
 * Fetch method
 */
const fetch = (config, validate = defaultValidate) => {
  const source = CancelToken.source()
  return new Promise((resolve, reject) => {
    // Repeat request handling
    const cacheSeed = config.cacheSeed || 'seed'
    const seedUrl = `${config.url}_${cacheSeed}`
    if (cancelTokenMap.has(seedUrl)) {
      const cancel = cancelTokenMap.get(seedUrl)
      cancel('Cancel duplicate API')
      cancelTokenMap.delete(seedUrl)
    }
    cancelTokenMap.set(seedUrl, source.cancel)
    try {
      axios({ ...config, cancelToken: source.token }).then(
        (response) => {
          if (cancelTokenMap.has(seedUrl)) {
            cancelTokenMap.delete(seedUrl)
          }
          if (config.noValidate) {
            resolve(response.data)
          } else {
            const _validateResponse = validate(response)
            if (_validateResponse) {
              resolve(_validateResponse)
            } else {
              reject(response)
            }
          }
        },
        (error) => {
          // Cancelled request will not be processed
          if (axios.isCancel(error)) {
            return reject(error)
          }
          if (cancelTokenMap.has(seedUrl)) {
            cancelTokenMap.delete(seedUrl)
          }
          reject(error)
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}

export default fetch
