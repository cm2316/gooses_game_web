import React from 'react'
import AspectImage from '@/components/common/Image/AspectImage'
import { onGameClickAction } from '@/actions/commonActions'
import useNarrorClick from '@/hook/useNarrorClick'
import style from './index.module.scss'
const Item = ({ app, ...props }) => {
  const onClick = (evt) => {
    onGameClickAction({
      app,
      evt,
    })
  }
  const narrorClickprops = useNarrorClick(onClick)
  return (
    <div className={style.itemContainer} {...narrorClickprops} {...props}>
      <div className={style.left}>
        <AspectImage aspectClass='ratio-1-1' src={app.icon_url} />
      </div>
      <div className={style.right}>
        <span className={style.title}>{app.game_name}</span>
        <span className={style.subTitle}>{app.category}</span>
      </div>
    </div>
  )
}

export default Item
