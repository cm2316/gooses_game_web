import React from 'react'
// import SplitLine from '@/components/common/splitLine/Index'
import AppDetailBanner from './appDetail/AppDetailBanner'
// import AppDetailOverview from './appDetail/AppDetailOverview'
import GameList from './GameList'
import Wrap from './Wrap'
import { usePxToPx } from '@/hook/useViewport'
import './app_detail.scss'

const AppDetail = ({ enable, count = 3, gap = 32 }) => {
  const largeLen = usePxToPx(490)
  return (
    <Wrap enable={enable}>
      <div className='skeleton_appDetail'>
        {[
          <AppDetailBanner key='banner' />,
          <GameList
            gridTemplateColumns={`${largeLen}px ${largeLen}px ${largeLen}px ${largeLen}px`}
            key='screenshotsAndVideo'
            titleId='screenshotsAndVideo'
            gameItemProps={{ showTitle: false, showSubTitle: false }}
            column={count}
            imgPlaceholderClass='skeleton_appDetail_item'
            gap={gap}
          />,
          // <SplitLine key="splitLine" />,
          // <AppDetailOverview key="overview" titleId="overview" />,
          // <SplitLine key="splitLine2" />,
        ]}
      </div>
    </Wrap>
  )
}

export default AppDetail
