import React from 'react'
import AppItem from '@/components/common/app-item/Index'

const Item = ({ app, ...props }) => {
  return (
    <AppItem
      className='bannerAppList-item'
      imgPlaceholderClass='ratio-3-4'
      game={app}
      imageUrlGet={(game) => game.banner_url_v}
      {...props}
    />
  )
}

export default Item
