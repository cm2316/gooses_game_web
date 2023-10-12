import React, { useImperativeHandle, useState } from 'react'
import Drawer from 'rc-drawer'
import 'rc-drawer/assets/index.css'
import SvgIcon from '@/components/common/svg-icon/Index'
import motionProps from './motion'
import './index.scss'

const RcDrawer = ({ render, visibleInitial = false, renderHeader, ...props }, ref) => {
  const [visible, setVisible] = useState(visibleInitial)
  const _onClose = () => {
    setVisible(false)
  }
  useImperativeHandle(ref, () => ({
    onClose: () => {
      return new Promise((resolve) => {
        _onClose()
        setTimeout(() => {
          resolve()
        }, 300)
      })
    },
    onOpen: () => {
      setVisible(true)
    },
  }))
  const getRenderHeader = () => {
    if (renderHeader) {
      return typeof renderHeader === 'function' ? renderHeader({ onClose: _onClose }) : renderHeader
    }
    return (
      <div className='rcDrawer-header--inner flex spaceBetween alignCenter'>
        <div className='rcDrawer-header--left flex alignCenter'></div>
        <div className='rcDrawer-header--right flex alignCenter'>
          <div className='text--clickable rcDrawer-header--close'>
            <SvgIcon size={1} icon='close' onClick={_onClose} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <Drawer open={visible} {...motionProps} {...props}>
      <div className='rcDrawer-container'>
        <div className='rcDrawer-header'>{getRenderHeader()}</div>
        <div className='rcDrawer-body'>{render({ onClose: _onClose })}</div>
      </div>
    </Drawer>
  )
}

export default React.forwardRef(RcDrawer)
