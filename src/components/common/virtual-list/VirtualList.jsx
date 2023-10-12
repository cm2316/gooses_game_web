import { useSize } from 'ahooks'
import classnames from 'classnames'
import React, { useDeferredValue, useEffect, useImperativeHandle, useState } from 'react'
import { useRef } from 'react'
import { flushSync } from 'react-dom'
import useKeyboardFocus from '@/hook/useKeyboardFocus'

const VirsualList = (
  {
    getItemHeight,
    itemCount,
    paddingCount = 3,
    className,
    children,
    contentInnerClass,
    fixedHeight,
    listCount = itemCount,
    columnCount = 1,
  },
  ref
) => {
  const containerRef = useRef()
  const { height: containerHeight } = useSize(containerRef)
  const Component = children
  const [scrollTop, setScrollTop] = useState(0)

  const genOffsets = () => {
    const offsets = [getItemHeight(0)]
    for (let i = 1; i < itemCount; i++) {
      if (fixedHeight) {
        offsets[i] = getItemHeight(0) * (i + 1)
      } else {
        offsets[i] = offsets[i - 1] + getItemHeight(i)
      }
    }
    return offsets
  }

  const [offsets, setOffsets] = useState(() => genOffsets())

  useEffect(() => {
    setOffsets(() => genOffsets())
  }, [itemCount])

  let startIdx = offsets.findIndex((pos) => pos > scrollTop)
  let endIdx = offsets.findIndex((pos) => pos > scrollTop + containerHeight)
  if (endIdx === -1) {
    endIdx = itemCount
  }

  startIdx = Math.max(startIdx - paddingCount, 0)
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1)
  const contentHeight = offsets[offsets.length - 1]

  const items = []

  const { focusIndex, fId, onKeyDown } = useKeyboardFocus({
    columns: columnCount,
    count: listCount,
  })

  for (let i = startIdx; i <= endIdx; i++) {
    const top = i === 0 ? 0 : offsets[i - 1]
    const height = i === 0 ? offsets[0] : offsets[i] - offsets[i - 1]

    items.push(
      <Component
        key={i}
        index={i}
        focusIndex={focusIndex}
        fId={fId}
        style={{
          // transition: 'top 0.1s ease-in-out',
          position: 'absolute',
          left: 0,
          top: `${top}px`,
          width: '100%',
          height: `${height}px`,
        }}
      />
    )
  }

  useImperativeHandle(ref, () => ({
    resetHeight: () => {
      setOffsets(genOffsets())
    },
    resetScroll: () => {
      containerRef.current.scrollTop = 0
    },
  }))
  const deferredValue = useDeferredValue(items)
  return (
    <div
      style={{
        height: '100%',
        overflowY: 'scroll',
        // position: 'relative',
      }}
      onScroll={(e) => {
        flushSync(() => {
          setScrollTop(e.target.scrollTop)
        })
      }}
      ref={containerRef}
      className={className}
      onKeyDown={onKeyDown}
      data-focus-block
    >
      <div
        style={{ height: contentHeight, position: 'relative' }}
        className={classnames(contentInnerClass)}
      >
        {itemCount > 200 ? deferredValue : items}
      </div>
    </div>
  )
}

export default React.forwardRef(VirsualList)
