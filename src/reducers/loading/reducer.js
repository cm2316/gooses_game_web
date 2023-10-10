import produce from 'immer'
import * as types from './constant'

const INIT_STATE = {
  loading: false,
}
const loadingReducer = produce((state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.SET_MAIN_LOADING: {
      state.gameCenterRotationLoading = payload
      break
    }
    default: {
      /* empty */
    }
  }
}, INIT_STATE)

export default loadingReducer
