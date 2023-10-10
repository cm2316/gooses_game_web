import ReactDOM from 'react-dom'
import React from 'react'
import BaseDialog from './Index'
export const DialogTypes = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
  PROMPT: 'prompt',
}

function popupDialog(params) {
  const dialogRef = React.createRef(null)
  return new Promise((resolve, reject) => {
    let {
      getContainer = () => {
        return document.getElementById('root')
      },
      onConfirm,
      onCancel,
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

    // 关闭dialog
    const onCloseRewrite = async () => {
      onClose && (await onClose())
      await dialogRef.current?.onClose()
      ReactDOM.unmountComponentAtNode(tempDiv)
      if (tempDiv.parentElement === container) {
        container.removeChild(tempDiv)
      }
    }
    // 确定
    const onConfirmRewrite = async (data) => {
      dialogRef.current?.loading(true)
      onConfirm && (await onConfirm(data))
      dialogRef.current?.loading(false)
      resolve(data)
      onCloseRewrite()
    }
    // 取消
    const onCancelRewrite = async (data) => {
      onCancel && (await onCancel(data))
      reject()
      onCloseRewrite()
    }
    ReactDOM.render(
      <BaseDialog
        ref={dialogRef}
        visibleInitial={true}
        onCancel={onCancelRewrite}
        onConfirm={onConfirmRewrite}
        getContainer={getContainer}
        {...others}
      />,
      tempDiv
    )
  })
}

const dialogMethods = {
  alert(params) {
    return popupDialog({ type: DialogTypes.ALERT, ...params })
  },
  confirm(params) {
    return popupDialog({ type: DialogTypes.CONFIRM, ...params })
  },
  prompt(params) {
    return popupDialog({ type: DialogTypes.PROMPT, ...params })
  },
}

export const baseDialog = (params) => {
  const { type = DialogTypes.CONFIRM, ...options } = params
  return popupDialog({ type, ...options })
}

Object.assign(baseDialog, dialogMethods)

export default BaseDialog
