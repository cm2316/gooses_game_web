/**
 *
 */
import React, { useMemo } from 'react'
import classnames from 'classnames'
import BaseHeader from '@/components/common/Heading/BaseHeader'
import VirtualList from '@/components/common/virtualList/Index'

import './index.scss'

function getRenderValue(render) {
  let titleJSX = null
  if (render) {
    titleJSX = typeof render === 'function' ? render() : render
  }
  return titleJSX
}
const VirsualLayout = ({
  list,
  columns,
  className,
  titleRender,
  headerRender,
  headerType = 'page',
  children,
  contentInnerClass,
  prefix,
  suffix,
  estimatedHeight,
}) => {
  // 标题栏
  const titleRenderValue = getRenderValue(titleRender)

  // Header栏
  const headerRenderValue = getRenderValue(headerRender)
  return (
    <div className={classnames(['virsualLayout-container', className])}>
      {headerRenderValue ||
        (titleRenderValue && (
          <BaseHeader className='virsualLayout-header' type={headerType} data-focus-block>
            {titleRenderValue}
          </BaseHeader>
        ))}
      <div className='virsualLayout-prefix' data-focus-block>
        {prefix && prefix(list)}
      </div>
      <VirtualList
        columnCount={columns}
        list={list}
        className={classnames(['virsualLayout-content'])}
        contentInnerClass={contentInnerClass}
        renderItem={children}
        fixedHeight={true}
        estimatedHeight={estimatedHeight}
      ></VirtualList>
      <div className='virsualLayout-suffix' data-focus-block>
        {suffix && suffix(list)}
      </div>
    </div>
  )
}

export default VirsualLayout
