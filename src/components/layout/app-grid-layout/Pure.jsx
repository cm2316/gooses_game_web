/**
 * Show all game list module
 */

import React from 'react'
import GridLayout from '@/components/layout/grid-layout/Index'
import AppItem from '@/components/common/app-item/Index'
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
          <AppItem
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
