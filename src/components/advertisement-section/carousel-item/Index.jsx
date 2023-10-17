import React from 'react'
import classNames from 'classnames'
import AspectImage from '@/components/common/Image/AspectImage'
import './index.scss'
const Advertisement = ({ app, imgPlaceholderClass, className }) => {
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
        backgroundImage: `linear-gradient(0, #000000 0%, rgba(0,0,0,0.8) 47%, rgba(0,0,0,0.4) 79%, rgba(0,0,0,0.3) 100%),url(${app.banner_url})`,
      }}
    >
      {/* 小图片 */}
      <div className='advertisement-containerInner'>
        {/* 左边 */}
        <AspectImage className='advertisement-smallIconContainer' src={app.icon_url} />
      </div>
    </div>
  )
}

export default Advertisement
