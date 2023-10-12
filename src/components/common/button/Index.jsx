import classNames from 'classnames'
import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import svgLoading from './assets/loading.svg'
import SvgIcon from '@/components/common/svg-icon/Index'
import { ButtonGroupContext } from './ButtonGroup'
import { getProps } from '@/tool/getProps'

const Button = (props) => {
  const {
    className,
    onClick,
    title,
    titleId,
    renderLabel,
    isLoading = false,
    children,
    tag = 'button',
    icon = null,
    ...tagProps
  } = props
  const buttonGroupProps = useContext(ButtonGroupContext)
  const { type, size, mode, disabled } = getProps(
    props,
    buttonGroupProps,
    ['type', 'size', 'mode', 'disabled'],
    {
      type: 'primary',
      size: 'default',
      mode: 'normal',
      disabled: false,
    }
  )
  let labelJsx = null
  let iconJsx = null
  if (isLoading) {
    iconJsx = <img src={svgLoading} alt='loading' className='loadingButtonImg' />
  } else {
    if (icon) {
      if (typeof icon === 'string') {
        iconJsx = <SvgIcon size={1} icon={icon} />
      } else if (icon.icon) {
        iconJsx = <SvgIcon size={1} {...icon} />
      } else {
        iconJsx = icon
      }
    }
  }
  if (renderLabel) {
    labelJsx = renderLabel()
  } else {
    labelJsx = children ? (
      children
    ) : titleId ? (
      <FormattedMessage id={titleId} />
    ) : title ? (
      <span>{title}</span>
    ) : null
  }

  const buttonTypeClass = type ? `${type}Button` : ''
  const Tag = tag
  return (
    <Tag
      className={classNames([
        'button',
        `${size}Button`,
        `${mode}Button`,
        buttonTypeClass,
        className,
        { loadingButton: isLoading },
        { disabledButton: disabled },
      ])}
      onClick={(evt) => {
        if (isLoading || disabled) {
          return
        }
        onClick && onClick(evt)
      }}
      {...tagProps}
    >
      {iconJsx && (
        <div className='buttonIcon' style={!labelJsx ? { marginRight: 0 } : {}}>
          {iconJsx}
        </div>
      )}
      {labelJsx && <div className='buttonContent'>{labelJsx}</div>}
    </Tag>
  )
}

export default Button
