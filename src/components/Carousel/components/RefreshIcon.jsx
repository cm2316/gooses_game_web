import React from 'react'
import { useIntl } from 'react-intl'
import RcTooltip from '@/components/rc-components/tooltip/Index'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import './refreshIcon.scss'
const RefreshIcon = ({ onRefresh, titleId = 'shuffleTip' }) => {
  const intl = useIntl()
  const tipMessage = intl.formatMessage({ id: titleId })
  return (
    <RcTooltip placement='right' key='cloudButtonTooltip' trigger='hover' overlay={tipMessage}>
      <button aria-label={tipMessage} onClick={onRefresh} className='refresh-icon'>
        <SvgIcon size={1} icon='shuffle' />
      </button>
    </RcTooltip>
  )
}

export default RefreshIcon
