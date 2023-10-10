import React, { useMemo, useCallback, useRef } from 'react'
import { useIntl } from 'react-intl'
import AspectImage from '@/components/common/Image/AspectImage'
import Button from '@/components/common/Button/Button'
import { onGameClickAction } from '@/actions/commonActions'
import style from './resultItem.module.scss'
import classNames from 'classnames'
const ResultItem = ({ app, keyword, as = 'div', ...props }) => {
  const intl = useIntl()
  const containerRef = useRef(null)
  /**
   * On click app event
   */
  const handleOnClick = useCallback(({ app, evt }) => {
    evt.stopPropagation()
    onGameClickAction({
      app,
      evt,
    })
  }, [])

  // Click item event(direct to app detail)
  const onItemClick = useCallback(
    (evt) => {
      handleOnClick({ app: app, evt })
    },
    [handleOnClick]
  )
  const AsDOm = as
  const onKeyDown = (evt) => {
    if (evt.target === containerRef.current) {
      if (evt.keyCode === 13 || evt.keyCode === 32) {
        onItemClick(evt)
        evt.stopPropagation()
      }
    }
  }
  const gameNameHtml = keyword
    ? app.game_name.replace(
        new RegExp(
          keyword.replace(/[()+*[\]]/g, (match) => `\\${match}`),
          'gi'
        ),
        (match) => {
          return `<span class="${style.matchString}">${match}</span>`
        }
      )
    : app.game_name
  return (
    <AsDOm
      className={classNames([style.container, 'pointer'])}
      ref={containerRef}
      role='listitem'
      aria-label={app.game_name}
      onKeyDown={onKeyDown}
      {...props}
    >
      <div className={style.left}>
        <AspectImage aspectClass='ratio-1-1' src={app.icon_url} />
      </div>
      <div className={style.right}>
        <div className={style.title} dangerouslySetInnerHTML={{ __html: gameNameHtml }}></div>
        <div className={style.actions}></div>
      </div>
    </AsDOm>
  )
}

export default ResultItem
