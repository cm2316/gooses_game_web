import { escapeString } from '@/tool'

/**
 * NCM云游戏数据适配
 * @param {array<app>} apps
 * @returns array<app>
 */
export const ncmAppsTransformer = (apps) => {
  const cloudGames = apps.map((app) => {
    return {
      ...app,
      // client必须
      game_name: app.appName,
      platform_name: app?.appDeveloperInfo?.name,
      package_name: app.packageName,
      cloud_app_url: app.playUrl,
      icon_url: app.media?.icon,
      game_play_preference: ['cloud'],
      // webs使用
      category: app.appGenre,
      genre: app.appGenre,
      id: app.packageName,
      banner_url_v: app.media?.tile,
      banner_url: app.media.desktop?.banner,
      bg_image: app.media.desktop?.banner,
      bg_video: app.media.desktop?.launchVideo,

      app_rating: app.appRating,
    }
  })
  return cloudGames
}

/**
 * 查询接口适配
 * @param {{result:array<app>}} data
 * @returns array<app>
 */
export const searchResultsTransformer = (data) => {
  const {
    result: { search_result },
  } = data
  const searchResults = search_result
    .filter((app) => app.source !== 'steam')
    .map((app) => {
      const category = (app.genre && app.genre[0]) || (app.type && app.type[0])
      return {
        ...app,
        // client必须
        game_name: app.game_name || app.app_name || '',
        icon_url: app.icon_url,
        package_name: app.package_name,
        cloud_supported: app.cloud_supported,
        // webs使用
        banner_url: app.rotation_image_url,
        banner_url_v: app.game_tile_url,
        category: category,
        showCloudBtn: !!app.cloud_supported,
        showPlayBtn: true,
        // 个性化按钮文案(不显示availableNow)
        origin_icon_url: app.icon_url,
        $$dataSource: 'search',
        checkSupportCloud: true,
      }
    })
  return searchResults
}

/**
 * 专题Apps数据适配
 * @param {array<app>} apps
 * @returns array<app>
 */
export const topicAppsDataTransformer = (apps) => {
  const transformData = apps
    .filter((app) => app.id && app.title)
    .map((app) => {
      return {
        ...app,
        // client必须
        package_name: app.id,
        game_name: escapeString(app.title),
        cloud_supported: app.cloud_supported,
        // webs使用
        platform_name: app.platform_name,
        showCloudBtn: !!app.cloud_supported,
        showPlayBtn: true,
        origin_icon_url: app.icon_url,
        $$dataSource: 'app_center_topic_data',
        checkSupportCloud: true,
      }
    })
  return transformData
}
