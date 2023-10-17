import React, { useMemo, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import AspectImage from '@/components/common/image/AspectImage'
import Button from '@/components/common/button/Index'
import { onGameClickAction } from '@/actions/commonActions'
import style from './resultItem.module.scss'
import classNames from 'classnames'
const ResultItem = ({ app, keyword, as = 'div', ...props }) => {
  const intl = useIntl()
  const containerRef = useRef(null)
  const installedApps = useSelector((state) => state.app.installedApps)
  const isInstalled = installedApps.includes(app.package_name)
  /**
   * On click app event
   */
  const handleOnClick = useCallback(
    ({ app, evt }) => {
      evt.stopPropagation()
      onGameClickAction({
        app,
        evt,
      })
    },
    [isInstalled]
  )

  // App actions list
  const buttonsJSX = useMemo(() => {
    const buttonJSX = []
    if (app.showCloudBtn) {
      buttonJSX.push(
        <Button
          size='mini'
          key='playOnCloudButton'
          type='pink'
          icon='nowgg'
          className={style.actionButton}
          onClick={(evt) =>
            handleOnClick({
              app,
              evt,
            })
          }
        />
      )
    }
    if (app.showPlayBtn) {
      buttonJSX.push(
        <Button
          size='mini'
          key='playOnBsButton'
          type='primary'
          className={style.actionButton}
          icon='android'
          onClick={(evt) =>
            handleOnClick({
              app,
              evt,
            })
          }
        >
          <font>详细</font>
        </Button>
      )
    }
    buttonJSX.reverse()
    return buttonJSX
  }, [app, handleOnClick, intl, isInstalled])

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
      className={classNames([style.container])}
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
        <div className={style.actions}>{buttonsJSX}</div>
      </div>
    </AsDOm>
  )
}

export default ResultItem
