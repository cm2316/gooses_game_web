// import axios from './fetch'

window.flexible = window.flexible || { rem: 101 }

export default class Utils {
  static isDev() {
    return process.env.NODE_ENV === 'development'
  }
  static getParamByName(param) {
    const queryParams = new URLSearchParams(window.location.search)
    return queryParams.get(param)
  }
  static getParams() {
    const queryParams = new URLSearchParams(window.location.search)
    const params = queryParams.entries()
    let urlParams = ''
    for (let key of params) {
      urlParams += `&${key[0]}=${key[1]}`
    }
    return urlParams.substring(1, urlParams.length)
  }
  static handleReloadPage = () => {
    window.location.reload()
  }
}
