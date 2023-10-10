import React from 'react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Aspect from './Aspect'
import './app_banner.scss'

const AppBanner = ({ className, aspectClass = 'ratio-1-1', actionCount = 2 }) => {
  return (
    <div className={classNames(['skeleton_appBanner', className])}>
      <div className='skeleton_appBannerLeft'>
        <Aspect aspectClass={aspectClass} />
      </div>
      <div className='skeleton_appBannerRight'>
        <div className='skeleton_appBannerTitle'>
          <Skeleton height='100%' />
        </div>
        <div className='skeleton_appBannerSubTitle'>
          <Skeleton height='100%' borderRadius={4} />
        </div>
        <div className='skeleton_appBannerActions'>
          {Array.from({ length: actionCount }).map((_, index) => (
            <Skeleton key={index} height='100%' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AppBanner
