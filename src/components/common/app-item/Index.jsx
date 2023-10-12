import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Core from './Core'
import './index.scss'

const GameListItem = ({
  className,
  imgPlaceholderClass,
  game,
  imageUrlGet = false,
  lazyRoot = null,
  lazyRootMargin,
  lazy = true,
  tabIndex = -1,
  tabId,
  imageLayoutRender,
  footerSlot,
  ...props
}) => {
  // 获取图片url值
  const imageUrl = (imageUrlGet && imageUrlGet(game)) || game.icon_url

  const gameFooterJSX = (game) => {
    return (
      <div className='game-item--footer' aria-hidden='true'>
        {game.game_name && <p className='gameItem-footer--title'>{game.game_name}</p>}
        {game.category && (
          <div className='gameItem-footer--subTitle'>
            <span>{game.category}</span>
          </div>
        )}
      </div>
    )
  }
  return (
    <Link
      className={classNames(['game-item', className])}
      to={{ pathname: `/play/${game.package_name}/${game.game_name}` }}
      target='_blank'
      tabIndex={tabIndex}
      id={tabId}
      aria-label={`${game.game_name}`}
      {...props}
    >
      <Core
        src={imageUrl}
        app={game}
        imageLayoutRender={imageLayoutRender}
        imgPlaceholderClass={imgPlaceholderClass}
        lazy={lazy}
        lazyRoot={lazyRoot}
        lazyRootMargin={lazyRootMargin}
      />
      {footerSlot ? footerSlot(game) : gameFooterJSX(game)}
    </Link>
  )
}

export default GameListItem
