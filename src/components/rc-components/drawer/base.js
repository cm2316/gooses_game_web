import { createRoot } from 'react-dom/client'
import React from 'react'
import BaseDrawer from './Index'

function popupDrawer(params) {
  const drawerRef = React.createRef(null)
  return new Promise((resolve, reject) => {
    let {
      getContainer = () => {
        return document.getElementById('root')
      },
      onClose,
      ...others
    } = params
    const tempDiv = document.createElement('div')
    let container = null
    if (typeof getContainer === 'string') {
      container = document.querySelector(getContainer)
    }
    if (typeof getContainer === 'function') {
      container = getContainer()
    }
    if (!(getContainer instanceof Element)) {
      container = document.body
    }
    container.appendChild(tempDiv)

    const root = createRoot(tempDiv)
    // 关闭dialog
    const onCloseRewrite = async () => {
      try {
        onClose && (await onClose())
        await drawerRef.current?.onClose()
        root.unmount()
        if (tempDiv.parentElement === container) {
          container.removeChild(tempDiv)
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    }
    root.render(
      <BaseDrawer
        ref={drawerRef}
        visibleInitial={true}
        getContainer={getContainer}
        onClose={onCloseRewrite}
        onMount={() => drawerRef.current.onOpen()}
        keyboard
        {...others}
      />
    )
  })
}

export const baseDrawer = (params) => {
  return popupDrawer(params)
}

export default BaseDrawer
