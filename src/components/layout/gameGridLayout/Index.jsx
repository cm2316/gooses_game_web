/**
 * Show all game list module
 */

import React from 'react'
import KeyboardGridLayout from '@/components/layout/gridLayout/KeyboardGridLayout'
import GameListItem from '@/components/common/GameListItem/GameListItem'
const GameGridLayout = ({ gameItemProps = {}, ...layoutProps }) => {
  return (
    <KeyboardGridLayout keyId='packageName' {...layoutProps}>
      {({ tabIndex, tabId, gridItem }) => {
        return <GameListItem game={gridItem} tabIndex={tabIndex} tabId={tabId} {...gameItemProps} />
      }}
    </KeyboardGridLayout>
  )
}

export default GameGridLayout
