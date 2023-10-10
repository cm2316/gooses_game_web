import React from 'react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from '../components/Header'
import './app_detail_overview.scss'
import Wrap from '../Wrap'
const AppDetailOverview = ({
  showHeader = true,
  className,
  titleClassName = 'spaceBetween',
  title,
  titleId,
  enable,
}) => {
  return (
    <Wrap enable={enable}>
      <div className={classNames(['skeleton_appDetailOverview', className])}>
        {showHeader ? (
          <div className='skeleton_appDetailOverviewHeader'>
            <Header
              className={titleClassName}
              title={title}
              titleId={titleId}
              titleClass={titleClassName}
            />
          </div>
        ) : null}
        <div className='skeleton_appDetailOverviewContent'>
          <div className='skeleton_appDetailOverviewContentTitle'>
            <Skeleton height='100%' width='46%' />
          </div>
          <div className='skeleton_appDetailOverviewContentDesc'>
            <Skeleton count={2} width='98%' height='16px' />
            <Skeleton width='35%' height='16px' />
            <div></div>
            <Skeleton count={3} width='98%' height='16px' />
            <Skeleton width='60%' height='16px' />
          </div>
        </div>
      </div>
    </Wrap>
  )
}

export default AppDetailOverview
