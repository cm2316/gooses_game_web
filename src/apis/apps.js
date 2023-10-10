import cloudGameMock from './mock/cloudGame'
import gameRotation from './mock/gameRotation'
import gameCenter from './mock/gameCenter'

/**
 * Fetch rotation-banner request
 * @returns Promise
 */
export const getRotationAppsApi = () => {
  return Promise.resolve(gameRotation)
}

/**
 * Fetch popular cloud game request
 * @returns Promise
 */
export const getNCMAppList = () => {
  return Promise.resolve(cloudGameMock)
}

/**
 * Fetch game-center-home request
 * @returns Promise
 */
export const getHomeAppsApi = () => {
  return Promise.resolve(gameCenter.result)
}

export const getTopicInfo = () => {
  return Promise.resolve([])
}
