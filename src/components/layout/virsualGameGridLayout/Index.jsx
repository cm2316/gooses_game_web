/**
 * Show all game list module
 */

import React from 'react'
import VirsualLayout from '@/components/layout/virsualLayout/Index'
import GameListItem from '@/components/common/GameListItem/GameListItem'
const GameVirsualLayout = ({ gameItemProps = {}, ...layoutProps }) => {
  return (
    <VirsualLayout {...layoutProps}>
      {({ item, key, tabId, tabIndex }) => {
        return (
          <GameListItem
            game={item}
            key={key}
            tabId={tabId}
            tabIndex={tabIndex}
            {...gameItemProps}
          />
        )
      }}
    </VirsualLayout>
  )
}

export default GameVirsualLayout
