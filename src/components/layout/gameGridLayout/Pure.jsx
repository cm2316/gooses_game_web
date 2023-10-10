/**
 * Show all game list module
 */

import React from 'react'
import GridLayout from '@/components/layout/gridLayout/Index'
import GameListItem from '@/components/common/GameListItem/GameListItem'
const PureGameGridLayout = ({
  gameItemProps = {},
  focusIndex = [0, 0],
  slideIndex = 0,
  fId,
  gridLayoutRef,
  ...gridLayoutProps
}) => {
  return (
    <GridLayout {...gridLayoutProps} ref={gridLayoutRef} scrollLoad={false}>
      {(item, index) => {
        const [row, col] = focusIndex
        const tabIndex = row === slideIndex && col === index ? 0 : -1
        return (
          <GameListItem
            game={item}
            tabIndex={tabIndex}
            tabId={`${fId}-${slideIndex}-${index}`}
            itemIndex={index}
            {...gameItemProps}
          />
        )
      }}
    </GridLayout>
  )
}

export default React.memo(PureGameGridLayout)
