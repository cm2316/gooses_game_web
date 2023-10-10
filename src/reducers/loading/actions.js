import * as types from './constant'

export const setMainLoading = (loading = true) => {
  return {
    type: types.SET_MAIN_LOADING,
    payload: loading,
  }
}
