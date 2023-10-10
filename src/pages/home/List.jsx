import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GamePageHeader from '@/components/common/Heading/SpaceBetween/Index'
import GameGridLayout from '@/components/layout/gameGridLayout/Index'
import { useGridBaseCount } from '@/hook/useViewport'

const CloudGameList = () => {
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title')
  const category = searchParams.get('category')
  const categoryMap = useSelector((state) => state.cloud.categoryMap)

  const gridCount = useGridBaseCount()

  const appList = categoryMap[category] || []

  return (
    <GameGridLayout
      overscrollBehavior='none'
      gameItemProps={{
        imgPlaceholderClass: 'ratio-3-4',
        showCloudBtn: true,
        imageUrlGet: (game) => game.banner_url_v,
      }}
      list={appList}
      contentInnerClass={['breakScreen', 'margin-bottom-30']}
      columns={gridCount - 1}
      headerRender={() => {
        return <GamePageHeader title={title} count={appList.length} className='breakScreen' />
      }}
    />
  )
}

export default CloudGameList
