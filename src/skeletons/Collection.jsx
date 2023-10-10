import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import GameList from './GameList'
import './collection.scss'

const Collection = ({
  showHeader = true,
  column = 6,
  row = 1,
  className,
  titleClassName = 'spaceBetween',
  title,
  titleId,
  enable,
}) => {
  return (
    <GameList
      enable={enable}
      showHeader={showHeader}
      column={column}
      row={row}
      title={title}
      titleId={titleId}
      titleClassName={titleClassName}
      className={[className, 'skeleton_collect']}
      itemNode={
        <div className={'skeleton_colectionItem'}>
          <Skeleton height='100%' />
        </div>
      }
    />
  )
}

export default Collection
