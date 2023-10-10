/**
 * Show all game list module(Support keyboard event)
 */

import React, { useRef } from 'react'
import GridLayout from '@/components/layout/gridLayout/Index'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
const KeyBoardGridLayout = ({ children, ...gridLayoutProps }) => {
  const contentRef = useRef(null)

  const { focusIndex, fId } = useKeyboardFocus({
    columns: gridLayoutProps.columns,
    count: gridLayoutProps.list.length,
    target: contentRef,
  })
  return (
    <GridLayout {...gridLayoutProps} ref={contentRef}>
      {(item, index) => {
        const tabIndex = focusIndex === index ? 0 : -1
        return children({ tabIndex, gridItem: item, index, tabId: `${fId}-${index}` })
      }}
    </GridLayout>
  )
}

export default KeyBoardGridLayout
