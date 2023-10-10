import React from 'react'
import { useSelector } from 'react-redux'
import { onGameClickAction } from '@/actions/commonActions'
import BannerAppList from '@/components/banner/bannerWrap/bannerlist/Index'
import SkeletonGameList from '@/skeletons/GameList'
import classNames from 'classnames'
const CloudGameBanner = ({ gridCount, className }) => {
  const apps = useSelector((state) => state.app.html5) || []
  const loadingStore = useSelector((state) => state.loading)

  // 打开游戏
  const onClick = (app) => {
    onGameClickAction({
      app,
    })
  }
  const onMouseEnter = (app) => {}
  const onMouseLeave = () => {}

  return (
    <div className={classNames(['home-banner', className])}>
      {apps.length > 0 ? (
        <>
          <BannerAppList
            onClick={onClick}
            list={apps}
            gridCount={gridCount}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
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

export default CloudGameBanner
