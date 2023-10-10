/**
 * Reduc combine
 */
import { combineReducers } from 'redux'
import appReducer from './app/reducer'
import systemReducer from './system/reducer'
import loadingReducer from './loading/reducer'

const reducer = combineReducers({
  app: appReducer,
  system: systemReducer,
  loading: loadingReducer,
})

export default reducer
