/**
 *
 */
import React, { useRef } from 'react'
import classnames from 'classnames'
import Scrollload from '@/components/scrollload/Scrollload'
import useScrollBarActive from '@/hook/useScrollBarActive'
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback'
import BaseHeader from '@/components/common/Heading/BaseHeader'

import './index.scss'

function getRenderValue(render) {
  let titleJSX = null
  if (render) {
    titleJSX = typeof render === 'function' ? render() : render
  }
  return titleJSX
}
const ListLayout = (
  {
    className,
    contentInnerClass,
    columns,
    list,
    titleRender,
    headerRender,
    headerType = 'page',
    children,
    keyId,
    suffix = null,
    prefix = null,
    numberOfItems = columns,
    overscrollBehavior = 'auto',
    scrollLoad = true,
  },
  ref
) => {
  const scrollContainerRef = useRef(null)
  // 标题栏
  const titleRenderValue = getRenderValue(titleRender)

  // Header栏
  const headerRenderValue = getRenderValue(headerRender)

  useScrollBarActive(scrollContainerRef, { enable: scrollLoad })
  const itemJsx = (list) => {
    return list.map((item, index) => {
      return (
        <div
          className='gridLayout-contentItem'
          key={item[keyId] + '_' + index || index}
          role='listitem'
        >
          {children(item, index)}
        </div>
      )
    })
  }
  return (
    <div className={classnames(['listLayout-container', className])}>
      {headerRenderValue ||
        (titleRenderValue && (
          <BaseHeader className='listLayout-header' type={headerType} data-focus-block>
            {titleRenderValue}
          </BaseHeader>
        ))}
      <div
        className='listLayout-content'
        ref={scrollContainerRef}
        style={{ overscrollBehavior }}
        role={headerRenderValue || titleRenderValue ? 'main' : 'group'}
      >
        <div className='listLayout-prefix' data-focus-block>
          {prefix && prefix(list)}
        </div>
        <div
          className={classnames(['listLayout-contentInner', contentInnerClass])}
          role='list'
          ref={ref}
          data-focus-block
        >
          <ErrorFallback>
            {scrollLoad ? (
              <Scrollload
                list={list}
                scrollContainer={scrollContainerRef}
                numberOfItems={numberOfItems}
                render={itemJsx}
              />
            ) : (
              itemJsx(list)
            )}
          </ErrorFallback>
        </div>
        <div className='listLayout-suffix' data-focus-block>
          {suffix && suffix(list)}
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(ListLayout)
