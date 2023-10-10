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
const BannerAppList = ({
  list,
  gridCount,
  onClick,
  onMouseEnter,
  onMouseLeave,
  mouseEnterDelay = 200,
}) => {
  const timerRef = useRef([])
  // 列表样式
  const contentInnerStyl = {
    gridTemplateColumns: `repeat(${gridCount}, minmax(10px, 1fr))`,
  }
  const _onMouseEnter = (app) => {
    clearTimers(timerRef)
    timerRef.current.push(setTimeout(() => onMouseEnter(app), mouseEnterDelay))
  }
  const _onMouseLeave = (app) => {
    clearTimers(timerRef)
    timerRef.current.push(setTimeout(() => onMouseLeave(app), mouseEnterDelay))
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
            onClick={onClick}
            onMouseEnter={_onMouseEnter}
            onMouseLeave={_onMouseLeave}
            tabId={`${fId}-${index}`}
            tabIndex={focusIndex === index ? 0 : -1}
          />
        )
      })}
    </div>
  )
}

export default BannerAppList
