import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GamePageHeader from '@/components/common/heading/space-between/Index'
import GameVirsualLayout from '@/components/layout/virsual-app-grid-layout/Index'
import { useGridBaseCount } from '@/hook/useViewport'

const Apps = () => {
  const [searchParams] = useSearchParams()
  const gameType = searchParams.get('type')
  const titleId = searchParams.get('titleId')
  const title = searchParams.get('title')

  const gridCount = useGridBaseCount()

  // Game list selector function
  const selectorFn = (state) => {
    return state.app[gameType] || state.cloud[gameType] || []
  }
  // Get games by game type (cloud games, android games...)
  const allTypeGames = useSelector(selectorFn)

  // Stat location

  return (
    <GameVirsualLayout
      overscrollBehavior='none'
      gameItemProps={{
        imgPlaceholderClass: 'ratio-1-1',
      }}
      list={allTypeGames}
      contentInnerClass={['breakScreen', 'margin-bottom-30']}
      columns={gridCount}
      headerRender={() => {
        return (
          <GamePageHeader
            titleId={titleId}
            title={title}
            count={allTypeGames.length}
            className='breakScreen'
          />
        )
      }}
    />
  )
}

export default React.memo(Apps)
