import produce from 'immer'
import * as types from './constant'

const INIT_STATE = {
  html5: [],
}

export default produce((draft, { type, payload }) => {
  switch (type) {
    case types.SET_APPS: {
      draft.html5 = payload
      break
    }
    default: {
      /* empty */
    }
  }
}, INIT_STATE)
