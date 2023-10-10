import React, { useRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import BaseHeader from '@/components/common/Heading/BaseHeader'
import BackIcon from '@/components/common/icons/back/Index'

import useScrollBarActive from '@/hook/useScrollBarActive'

import './index.scss'
const PageLayout = (
  { onScroll, children, onBack = () => {}, titleId = 'goBack', className, renderHeader = null },
  ref
) => {
  const contentRef = useRef(null)
  useScrollBarActive(contentRef, { onScroll })

  useImperativeHandle(ref, () => {
    return {
      getScrollTop: () => contentRef.current?.scrollTop || 0,
      getContent: () => contentRef.current,
    }
  })

  return (
    <main className={classNames(['pageLayout', className])}>
      <BaseHeader className='pageLayoutHeader' type='page' data-focus-block>
        {renderHeader || (
          <BackIcon className='gamePageHeaderLeft' onClick={onBack} titleId={titleId} />
        )}
      </BaseHeader>
      <div className='pageLayoutContent' ref={contentRef}>
        {children}
      </div>
    </main>
  )
}

export default React.forwardRef(PageLayout)
