import React from 'react'

import PlayerVideo from './PlayerVideo/Index'
import EmberYoutubeVideo from './EmberYoutubeVideo/Index'

export const VideoType = {
  player: 'player',
  youtube: 'youtube',
}

const Video = ({ src, posturl, type = VideoType.player, onLoad }) => {
  if (type === VideoType.player) {
    return <PlayerVideo src={src} />
  }
  if (type === VideoType.youtube) {
    return <EmberYoutubeVideo src={src} posturl={posturl} onLoad={onLoad} />
  }
  return null
}

export default Video
