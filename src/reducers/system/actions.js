import * as types from './constant'

// Set language action
export const setLanguage = (lang) => {
  return {
    type: types.SET_APP_LANGUAGE,
    payload: lang,
  }
}

// Set theme action
export const setTheme = (theme) => {
  return {
    type: types.SET_THEME,
    payload: theme,
  }
}

export const DefaultLangValue = 'en-US'
