/**
 * Show all game list module
 */

import React from 'react'
import VirsualLayout from '@/components/layout/virsual-layout/Index'
import AppItem from '@/components/common/app-item/Index'
const GameVirsualLayout = ({ gameItemProps = {}, ...layoutProps }) => {
  return (
    <VirsualLayout {...layoutProps}>
      {({ item, key, tabId, tabIndex }) => {
        return (
          <AppItem game={item} key={key} tabId={tabId} tabIndex={tabIndex} {...gameItemProps} />
        )
      }}
    </VirsualLayout>
  )
}

export default GameVirsualLayout
