import React from 'react'
import classNames from 'classnames'

import AppBanner from '../components/AppBanner'
import Wrap from '../Wrap'
import './app_detail_banner.scss'

const AppDetailBanner = ({ className, actionCount = 2, enable }) => {
  return (
    <Wrap enable={enable}>
      <div className={classNames(['skeleton_appDetailBanner', className])}>
        <AppBanner actionCount={actionCount} className='skeleton_appDetailBannerInner' />
      </div>
    </Wrap>
  )
}

export default AppDetailBanner
