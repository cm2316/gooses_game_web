/**
 * Show all game list module
 */

import React from 'react'
import KeyboardGridLayout from '@/components/layout/grid-layout/KeyboardGridLayout'
import AppItem from '@/components/common/app-item/Index'
const GameGridLayout = ({ gameItemProps = {}, ...layoutProps }) => {
  return (
    <KeyboardGridLayout keyId='packageName' {...layoutProps}>
      {({ tabIndex, tabId, gridItem }) => {
        return <AppItem game={gridItem} tabIndex={tabIndex} tabId={tabId} {...gameItemProps} />
      }}
    </KeyboardGridLayout>
  )
}

export default GameGridLayout
