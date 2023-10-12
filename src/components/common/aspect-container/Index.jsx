import React from 'react'
import classNames from 'classnames'

const AspectContainer = ({ aspectClass, className, children, onClick }) => {
  return (
    <div className={classNames(['responsive-container', className, aspectClass])} onClick={onClick}>
      {children}
    </div>
  )
}

export default AspectContainer
