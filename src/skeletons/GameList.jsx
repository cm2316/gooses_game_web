import React from 'react'
import classNames from 'classnames'
import GameItem from './components/GameItem'
import Header from './components/Header'
import './game_list.scss'
import Wrap from './Wrap'
import { useMemo } from 'react'
import { usePxToPx } from '@/hook/useViewport'
const GameList = ({
  showHeader = true,
  column = 6,
  row = 1,
  count = column * row,
  className,
  titleClassName = 'spaceBetween',
  title,
  titleId,
  imgPlaceholderClass,
  itemNode,
  enable,
  gameItemProps,
  backIcon,
  onClick,
  headerRender,
  gridTemplateColumns = `repeat(${column}, minmax(10px, 1fr))`,
  gap = 24,
}) => {
  const responseGap = usePxToPx(gap)
  const bodyStyle = { gridTemplateColumns, gap: responseGap }

  const _minCount = Math.min(count, column * row)

  const itemTemps = useMemo(() => {
    const _gameItemProps = gameItemProps || {}
    return Array.from({ length: _minCount }).map((_, index) =>
      itemNode ? (
        <div key={index}>{itemNode}</div>
      ) : (
        <GameItem key={index} aspectClass={imgPlaceholderClass} {..._gameItemProps} />
      )
    )
  }, [_minCount, imgPlaceholderClass, itemNode, gameItemProps])

  return (
    <Wrap enable={enable}>
      <div className={classNames(['skeleton_gameList', className])}>
        {showHeader ? (
          headerRender ? (
            headerRender()
          ) : (
            <div className='skeleton_gameListHeader'>
              <Header
                className={titleClassName}
                title={title}
                titleId={titleId}
                titleClass={titleClassName}
                backIcon={backIcon}
                onClick={onClick}
              />
            </div>
          )
        ) : null}
        <div className='skeleton_gameListContent'>
          <div className='skeleton_gameListContentInner' style={bodyStyle}>
            {itemTemps}
          </div>
        </div>
      </div>
    </Wrap>
  )
}

export default GameList
