import { setMainLoading } from '../loading/actions'
import { getNCMAppList } from '@/apis/apps'
import { ncmAppsTransformer } from '@/transformers'
import * as types from './constant'
export const setTopicApps = () => {}

export const setHtml5 = (apps) => {
  return {
    type: types.SET_APPS,
    payload: ncmAppsTransformer(apps),
  }
}

// Fetch cloud apps action
export const initApps = () => {
  return async (dispatch) => {
    dispatch(setMainLoading(true))
    try {
      const apps = await getNCMAppList()
      dispatch(setHtml5(apps))
    } catch (error) {
      /* empty */
    }
    setTimeout(() => {
      dispatch(setMainLoading(false))
    }, 2000)
  }
}
// 初始化app
export const initializedApp = () => {
  return async (dispatch) => {
    try {
      await dispatch(initApps())
    } finally {
      /* empty */
    }
  }
}
