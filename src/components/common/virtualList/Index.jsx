import React, { useEffect, useRef } from 'react'
import VirtualList from './VirtualList'
import { createGroup } from '@/tool'
import { usePxToPx } from '@/hook/useViewport'

const VirsualRow = ({
  column,
  index,
  gap = 24,
  list = [],
  setHeight,
  renderItem,
  focusIndex,
  fId,
}) => {
  const rowRef = useRef()
  const gapPx = usePxToPx(gap)

  const onMount = () => {}

  const childData = list.map((item, i) => {
    const _index = column * index + i
    return renderItem({
      item,
      onMount,
      key: index + '_' + i,
      tabIndex: _index === focusIndex ? 0 : -1,
      tabId: `${fId}-${_index}`,
    })
  })
  useEffect(() => {
    setTimeout(() => {
      if (rowRef.current) {
        setHeight(index, rowRef.current.getBoundingClientRect().height)
      }
    }, 0)
  }, [])
  return (
    <div
      style={{
        display: 'grid',
        gap: `${gapPx}px`,
        paddingBottom: `${gapPx}px`,
        gridTemplateColumns: `repeat(${column}, minmax(10px, 1fr))`,
      }}
      ref={rowRef}
    >
      {childData}
    </div>
  )
}

const VirtualColumnList = ({
  columnCount = 5,
  list = [],
  estimatedHeight = 216,
  className,
  renderItem,
  paddingCount,
  contentInnerClass,
  fixedHeight,
}) => {
  const virtualListRef = useRef()

  const itemHeightRef = useRef([])

  const getHeight = (index) => {
    return itemHeightRef.current[index] ?? estimatedHeight
  }

  const setHeight = (index, height) => {
    if (itemHeightRef.current[index] !== height && height) {
      itemHeightRef.current[index] = height
      virtualListRef.current.resetHeight()
    }
  }

  useEffect(() => {
    virtualListRef.current.resetScroll()
  }, [list.length])

  const rowList = createGroup(columnCount, list)
  return (
    <VirtualList
      className={className}
      getItemHeight={getHeight}
      paddingCount={paddingCount}
      itemCount={rowList.length}
      ref={virtualListRef}
      contentInnerClass={contentInnerClass}
      fixedHeight={fixedHeight}
      columnCount={columnCount}
      listCount={list.length}
    >
      {({ index, style, focusIndex, fId }) => {
        return (
          <div style={style}>
            <VirsualRow
              column={columnCount}
              index={index}
              list={rowList[index]}
              setHeight={setHeight}
              renderItem={renderItem}
              focusIndex={focusIndex}
              fId={fId}
            />
          </div>
        )
      }}
    </VirtualList>
  )
}

export default VirtualColumnList
