import Tooltip from 'rc-tooltip'
import classNames from 'classnames'
import React from 'react'
import 'rc-tooltip/assets/bootstrap.css'
import './index.scss'
const defaultTipProps = {
  placement: 'bottom',
  trigger: 'hover',
  key: 'commonRcTooltip',
  overlay: null,
  overlayStyle: { zIndex: 9999 },
  getTooltipContainer: () => document.querySelector('.appContainer'),
}

const modeOverlayClassMap = {
  dark: 'darkRcTooltip',
  light: 'lightRcTooltip',
  custom: 'customRcTooltip',
}
const RcTooltip = ({ children, overlayClassName, mode = 'light', disabled, ...props }) => {
  const _config = {
    ...defaultTipProps,
    ...props,
    overlayClassName: classNames([modeOverlayClassMap[mode], overlayClassName]),
  }
  if (disabled) {
    return children
  }
  return <Tooltip {..._config}>{children}</Tooltip>
}

export default RcTooltip
