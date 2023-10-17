import React from 'react'
import classnames from 'classnames'
const BaseHeader = ({ className = null, type = 'section', children = null, ...props }) => {
  return (
    <header
      {...props}
      className={classnames(['baseHeader', 'heading', `${type}Heading`, className])}
    >
      {children}
    </header>
  )
}

export default BaseHeader
