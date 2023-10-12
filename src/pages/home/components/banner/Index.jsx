import React from 'react'
import { useSelector } from 'react-redux'
import BannerAppList from '@/components/banner/banner-wrap/banner-list/Index'
import SkeletonGameList from '@/skeletons/GameList'
import classNames from 'classnames'
const HomeBanner = ({ gridCount, className }) => {
  const apps = useSelector((state) => state.app.html5) || []
  const loadingStore = useSelector((state) => state.loading)

  return (
    <div className={classNames(['home-banner', className])}>
      {apps.length > 0 ? (
        <>
          <BannerAppList list={apps} gridCount={gridCount} />
        </>
      ) : (
        <>
          <SkeletonGameList
            className='baseRotationBanner-skeletion'
            column={gridCount}
            showHeader={false}
            gameItemProps={{ aspectClass: 'ratio-3-4' }}
            enable={loadingStore.cloudGameLoading}
          />
        </>
      )}
    </div>
  )
}

export default HomeBanner
