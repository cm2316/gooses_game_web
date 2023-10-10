import classNames from 'classnames'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Aspect from './Aspect'
import './game_item.scss'
const GameItem = ({
  className,
  showTitle = true,
  showSubTitle = true,
  aspectClass = 'ratio-1-1',
}) => {
  return (
    <div className={classNames(['skeleton_gameItem', className])}>
      <Aspect className='skeleton_gameItemMain' aspectClass={aspectClass} />
      {showTitle ? (
        <p className='skeleton_gameItemTitle'>
          <Skeleton height='100%' borderRadius={4} />
        </p>
      ) : null}
      {showSubTitle ? (
        <p className='skeleton_gameItemSubTitle'>
          <Skeleton height='100%' borderRadius={4} />
        </p>
      ) : null}
    </div>
  )
}

export default GameItem
