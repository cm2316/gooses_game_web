import React from 'react'
import classNames from 'classnames'
import './index.scss'
const DrawerBody = ({ className, children }) => {
  return <div className={classNames(['drawerBody-container', className])}>{children}</div>
}

export default DrawerBody
