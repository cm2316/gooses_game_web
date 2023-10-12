import React from 'react'
import SvgIcon from '@/components/common/svg-icon/Index'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import './index.scss'
const BackIcon = ({ className, titleId = 'goBack', children, ...props }) => {
  return (
    <button
      className={classNames(['backIcon-container', className])}
      aria-labelledby={titleId}
      {...props}
    >
      <span className='backIcon-container-icon'>
        <SvgIcon size={1} icon='prev' />
      </span>
      {children}
      <span id={titleId}>
        <FormattedMessage id={titleId} />
      </span>
    </button>
  )
}

export default BackIcon
