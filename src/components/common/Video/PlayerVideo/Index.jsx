import React from 'react'
import { Player, ControlBar, BigPlayButton } from 'video-react'

const PlayerVideo = ({ src, className }) => {
  return (
    <Player src={src} className={className}>
      <BigPlayButton position='center' />
      <ControlBar autoHideTime={1000} disableDefaultControls={true}></ControlBar>
    </Player>
  )
}

export default PlayerVideo
