import React from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import BaseHeader from '../BaseHeader'
import BackIcon from '@/components/common/icons/back/Index'
import './index.scss'
const GamePageHeaderSlot = ({ headerRightRender, onBack, className, contentSlotRender }) => {
  const navigate = useNavigate()
  const _onBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <BaseHeader
      className={classNames(['gamePageHeader', 'gamePageHeaderSlot', className])}
      type='page'
    >
      <div className='headerSlot' data-focus-block>
        <BackIcon className='gamePageHeaderLeft' onClick={_onBack} />
        <div className='gamePageHeaderRight'>{headerRightRender}</div>
      </div>
      <div className='contentSlot' data-focus-block>
        {contentSlotRender}
      </div>
    </BaseHeader>
  )
}

export default GamePageHeaderSlot
