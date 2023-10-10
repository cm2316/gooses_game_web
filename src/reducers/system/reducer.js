import produce from 'immer'
import * as types from './constant'
import { themeIsValid } from '@/tool/themeConfig'
// Language storage key
export const LANGUAGE_STORAGE_KEY = 'LANGUAGE_STORAGE_KEY'

const INIT_STATE = {
  language: window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || navigator.language,
  theme: 'dark',
}
export default produce((draft, { type, payload }) => {
  switch (type) {
    case types.SET_APP_LANGUAGE: {
      if (payload) {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, payload)
        document.documentElement.setAttribute('lang', payload)
        draft.language = payload
      }
      break
    }
    case types.SET_THEME: {
      if (themeIsValid(payload)) {
        draft.theme = payload
      }
      break
    }
    default: {
      /* empty */
    }
  }
}, INIT_STATE)
