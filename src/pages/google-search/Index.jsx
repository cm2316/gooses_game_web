import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageLayout from '@/components/layout/pageLayout/Index'
import GameCarouselSection from '@/components/CarouselSection/GameCarouselSection'
import ErrorFallback from '@/components/error-fallback/Index'

import RecentSearch from './components/recentSearch/Index'
import Search from './components/search/Index'
import style from './index.module.scss'
import { useGridBaseCount } from '@/hook/useViewport'
const GoogleSearch = () => {
  const navigate = useNavigate()

  // Recommended Games
  const recommendedApps = useSelector((state) => state.app.recommendedApps)

  const gridCount = useGridBaseCount()

  return (
    <PageLayout className={[style.container]} onBack={() => navigate(-1)}>
      <div className={style.searchContainer}>
        <Search />
      </div>
      <div className={style.content}>
        <RecentSearch className={[style.recentSearches]} gridCount={gridCount} />
        {/* Recommended For You */}
        {recommendedApps.length ? (
          <ErrorFallback>
            <GameCarouselSection
              // slideConfig={{ spaceBetween: 43 }}
              className={[style.recommendedForYou]}
              carouselKeyId='recommendedGames'
              titleId='recommendedGames'
              list={recommendedApps.slice(0, gridCount)}
              pagination={false}
              showPlayBtn
              showCloudBtn
              imgPlaceholderClass='ratio-1-1'
              showInstalledState
              slidesPerView={gridCount}
              isGroup={false}
              gap={28}
            />
          </ErrorFallback>
        ) : null}
      </div>
    </PageLayout>
  )
}

export default GoogleSearch
