import React from 'react'
import classNames from 'classnames'
import BaseHeader from '../BaseHeader'

import './index.scss'

const SpaceBetweenHeader = ({ className, innerClassName, renderLeft, renderRight, children }) => {
  return (
    <BaseHeader
      className={classNames(['space-between-header', 'flex', 'alignCenter', className])}
      type='page'
      data-focus-block
    >
      <div
        className={classNames([
          'flex spaceBetween alignCenter space-between-header--inner container',
          innerClassName,
        ])}
      >
        {renderLeft}
        {renderRight}
      </div>
      {children}
    </BaseHeader>
  )
}

export default SpaceBetweenHeader
