import React from 'react'
import classNames from 'classnames'

import BaseDesc from './components/BaseDesc'
import Wrap from './Wrap'
import './home_banner.scss'

const HomeBanner = ({ className, actionCount = 2, enable }) => {
  return (
    <Wrap enable={enable}>
      <div className={classNames(['skeleton_homeBanner', className])}>
        <BaseDesc actionCount={actionCount} className='skeleton_homeBannerDesc' />
      </div>
    </Wrap>
  )
}

export default HomeBanner
