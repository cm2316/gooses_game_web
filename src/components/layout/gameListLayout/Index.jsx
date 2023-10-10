/**
 * Show all game list module
 */

import React from 'react'
import KeyboardListLayout from '@/components/layout/listLayout/KeyboardListLayout'
import GameItem from '@/components/gameItem/Index'
const GameListLayout = (props) => {
  return (
    <KeyboardListLayout scrollLoad={false} {...props}>
      {({ tabIndex, tabId, gridItem }) => {
        return <GameItem tabIndex={tabIndex} id={tabId} app={gridItem} />
      }}
    </KeyboardListLayout>
  )
}

export default GameListLayout
