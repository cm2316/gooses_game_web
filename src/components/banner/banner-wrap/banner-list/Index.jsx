import React, { useRef } from 'react'
import { useUnactivate } from 'react-activation'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
import Item from './Item'
import './index.scss'
const clearTimers = (timers) => {
  for (let timer of timers.current) {
    clearTimeout(timer)
  }
  timers.current = []
}
const BannerAppList = ({ list, gridCount }) => {
  const timerRef = useRef([])
  // 列表样式
  const contentInnerStyl = {
    gridTemplateColumns: `repeat(${gridCount}, minmax(10px, 1fr))`,
  }
  useUnactivate(() => {
    clearTimers(timerRef)
  })
  const { focusIndex, fId, onKeyDown } = useKeyboardFocus({
    columns: gridCount,
    count: gridCount,
  })
  return (
    <div
      className='bannerAppList-container'
      style={contentInnerStyl}
      onKeyDown={onKeyDown}
      data-focus-block
    >
      {list.slice(0, gridCount).map((app, index) => {
        return (
          <Item
            key={app.package_name}
            app={app}
            tabId={`${fId}-${index}`}
            tabIndex={focusIndex === index ? 0 : -1}
          />
        )
      })}
    </div>
  )
}

export default BannerAppList
