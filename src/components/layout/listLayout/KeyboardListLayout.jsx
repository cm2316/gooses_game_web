/**
 * Show all game list module(Support keyboard event)
 */

import React, { useRef } from 'react'
import ListLayout from '@/components/layout/listLayout/Index'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
const KeyBoardListLayout = ({ children, ...gridLayoutProps }) => {
  const contentRef = useRef(null)

  const { focusIndex, fId } = useKeyboardFocus({
    count: gridLayoutProps.list.length,
    direction: 'vertical',
    target: contentRef,
  })
  return (
    <ListLayout {...gridLayoutProps} ref={contentRef}>
      {(item, index) => {
        const tabIndex = focusIndex === index ? 0 : -1
        return children({ tabIndex, gridItem: item, index, tabId: `${fId}-${index}` })
      }}
    </ListLayout>
  )
}

export default KeyBoardListLayout
