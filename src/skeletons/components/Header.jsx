import classNames from 'classnames'
import React from 'react'
import SvgIcon from '@/components/common/svg-icon/Index'
import FormattedText from '@/components/common/formatted-text/Index'

import './header.scss'

const Header = ({
  title,
  titleId,
  titleClass = null,
  renderRight = null,
  renderLeft = null,
  backIcon = false,
  type = 'section',
  onClick,
}) => {
  return (
    <div className={classNames(['skeleton_header', titleClass, `${type}Heading`, 'heading'])}>
      <div className='skeleton_headerLeft' onClick={onClick}>
        {backIcon && <SvgIcon icon='prev' className={['pointer', 'margin-right-10']} />}
        <FormattedText title={title} id={titleId} />
        {renderLeft}
      </div>
      <div className='skeleton_headerRight'>{renderRight}</div>
    </div>
  )
}

export default Header
