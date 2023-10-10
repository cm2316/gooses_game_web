import React from 'react'
import AspectImage from '@/components/common/Image/AspectImage'
import { onGameClickAction } from '@/actions/commonActions'
import useNarrorClick from '@/hook/useNarrorClick'
import './index.scss'
const Item = ({ app, ...props }) => {
  const handler = (evt) => {
    onGameClickAction({
      app,
      evt,
    })
  }
  const onHandlerProps = useNarrorClick(handler)
  return (
    <div className='game-item' {...onHandlerProps} {...props}>
      <div className='left'>
        <AspectImage aspectClass='ratio-1-1' src={app.icon_url} />
      </div>
      <div className='right'>
        <span className='title'>{app.game_name}</span>
        <span className='subTitle'>{app.introduction}</span>
      </div>
    </div>
  )
}

export default Item
