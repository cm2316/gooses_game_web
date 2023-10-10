import React from 'react'
import classNames from 'classnames'

import { usePxToPx } from '@/hook/useViewport'
import './index.scss'

const BannerWrap = ({ className, children }) => {
  const mingHeightPx = usePxToPx(676)

  return (
    <div
      className={classNames(['commonBannerWrap-container', className])}
      style={{
        minHeight: `${mingHeightPx}px`,
      }}
    >
      {children}
    </div>
  )
}

export default BannerWrap
