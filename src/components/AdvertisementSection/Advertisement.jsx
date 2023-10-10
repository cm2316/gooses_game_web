import React from 'react'
import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import AspectImage from '@/components/common/Image/AspectImage'
import { onGameClickAction } from '@/actions/commonActions'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import ActionButton from '@/components/actionButton/Index'
import './advertisement.scss'
const Advertisement = ({ app, imgPlaceholderClass, className, tabIndex = 0, tabId }) => {
  const intl = useIntl()
  // 点击游戏按钮
  const handleOnClick = ({ app, evt }) => {
    onGameClickAction({
      app,
      evt,
    })
  }
  // 是否显示查看详情按钮
  const hasDetailAction = !app.isAppDetailAccessable ? false : true

  const onKeyDown = (evt) => {
    if (evt.keyCode === 13 || evt.keyCode === 32) {
      handleOnClick({ app, evt })
      evt.stopPropagation()
    }
  }

  return (
    <div
      className={classNames([
        'advertisement-container',
        {
          [imgPlaceholderClass]: imgPlaceholderClass,
          'responsive-container': imgPlaceholderClass,
        },
        className,
      ])}
      style={{
        backgroundImage: `linear-gradient(90deg, #000000 0%, rgba(0,0,0,0.8) 47%, rgba(0,0,0,0.4) 79%, rgba(0,0,0,0.3) 100%),url(${app.banner_url})`,
      }}
    >
      {/* 小图片 */}
      <div className='advertisement-containerInner'>
        {/* 左边 */}
        <div
          aria-label={app.game_name + intl.formatMessage({ id: 'viewDetails' })}
          tabIndex={tabIndex}
          id={tabId}
          onKeyDown={onKeyDown}
        >
          <AspectImage className='advertisement-smallIconContainer' src={app.icon_url}>
            {hasDetailAction && (
              <div
                className='advertisement-detailClickPanel'
                onClick={(evt) => handleOnClick({ app, evt })}
              >
                <SvgIcon size={1} icon='zoom-in' />
              </div>
            )}
          </AspectImage>
        </div>
        {/* 右边 */}
        <div className='advertisement-appDetails'>
          {!app.isOpenInBrowser && (
            <p className='advertisement-availableText'>
              <FormattedMessage id='availableNow'></FormattedMessage>
            </p>
          )}
          <p className='advertisement-appName'>{app.game_name}</p>
          {app.platform_name && <p className='advertisement-platformName'>{app.platform_name}</p>}
          {/* 操作按钮 */}
          <ActionButton
            className='advertisement-bannerAction'
            app={app}
            handleOnClick={handleOnClick}
            tabIndex={-1}
          />
        </div>
      </div>
    </div>
  )
}

export default Advertisement
