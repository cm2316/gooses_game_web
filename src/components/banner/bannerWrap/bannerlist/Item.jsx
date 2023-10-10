import React from 'react'
import GameListItem from '@/components/common/GameListItem/GameListItem'

const Item = ({ app, onMouseEnter, onMouseLeave, ...props }) => {
  return (
    <GameListItem
      className='bannerAppList-item'
      imgPlaceholderClass='ratio-3-4'
      game={app}
      imageUrlGet={(game) => game.banner_url_v}
      // onFocusWithin={() => onMouseEnter(app)}
      onMouseEnter={() => onMouseEnter(app)}
      onMouseLeave={() => onMouseLeave(app)}
      {...props}
    />
  )
}

export default Item
