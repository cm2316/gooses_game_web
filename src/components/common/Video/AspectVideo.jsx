import React, { useMemo } from 'react'
import AspectContainer from '@/components/common/AspectContainer/Index'
import PlayerVideo from './PlayerVideo/Index'
import EmberYoutubeVideo from './EmberYoutubeVideo/Index'

const VideoType = {
  player: 'player',
  youtube: 'youtube',
}

const AspectVideo = ({ className, aspectClass, src, posturl, type = VideoType.player }) => {
  const typeVideoJSX = useMemo(() => {
    if (type === VideoType.player) {
      return <PlayerVideo src={src} />
    }
    if (type === VideoType.youtube) {
      return <EmberYoutubeVideo src={src} posturl={posturl} />
    }
    return null
  }, [src, posturl])
  return (
    <AspectContainer className={className} aspectClass={aspectClass}>
      {typeVideoJSX}
    </AspectContainer>
  )
}

export default AspectVideo
