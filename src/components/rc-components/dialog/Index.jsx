import React, { useState, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'

import RcDialog from 'rc-dialog'

import Button from '@/components/common/button/Index'
import './index.scss'

const BaseDialog = (
  {
    children,
    title,
    onCancel,
    onConfirm,
    renderFooter = true,
    visibleInitial = false,
    className,
    getContainer,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    isCenter = true,
  },
  ref
) => {
  const [visible, setVisible] = useState(visibleInitial)
  const [loading, setLoading] = useState(false)

  const titleJsx = typeof title === 'function' ? title() : title

  const footerJsx = () => {
    if (renderFooter === true) {
      return (
        <div className='baseDialogFooterInner'>
          <Button
            onClick={onCancel}
            key='cancelButton'
            type='success'
            className='ellipsis cancelButton'
            size='medium'
            title={cancelText}
          />
          <Button
            onClick={onConfirm}
            isLoading={loading}
            key='confirmButton'
            type='primary'
            className='ellipsis confirmButton'
            size='medium'
            title={confirmText}
          />
        </div>
      )
    }
    if (renderFooter) {
      return typeof renderFooter === 'function' ? renderFooter() : renderFooter
    } else {
      return null
    }
  }

  useImperativeHandle(ref, () => ({
    onClose: () => {
      return new Promise((resolve) => {
        setVisible(false)
        setTimeout(() => {
          resolve()
        }, 300)
      })
    },
    onOpen: () => {
      setVisible(true)
    },
    loading: (loading) => {
      console.log(loading)
      setLoading(loading)
    },
  }))

  return (
    <RcDialog
      ref={ref}
      visible={visible}
      animation='zoom'
      maskAnimation='fade'
      onClose={() => onCancel('close')}
      forceRender
      destroyOnClose
      maskClosable={false}
      className={classNames(['baseRcDialog', className, { isCenter }])}
      title={titleJsx}
      getContainer={getContainer}
    >
      <div className='baseDialogBody'>{children}</div>
      <div className='baseDialogFooter'>{footerJsx()}</div>
    </RcDialog>
  )
}

export default forwardRef(BaseDialog)
