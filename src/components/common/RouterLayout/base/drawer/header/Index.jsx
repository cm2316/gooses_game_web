import React from 'react'
import Logo from '@/images/logo.png'
import Image from '@/components/common/Image/Image'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import SpaceBetweenHeader from '@/components/common/Heading/SpaceBetween/Index'
import './index.scss'
const DrawerHeader = ({ onClose }) => {
  return (
    <SpaceBetweenHeader
      className='drawer-header'
      renderLeft={
        <div className='drawer-header--left flex alignCenter'>
          <Image className='brand-logo' src={Logo} showMask={false} />
        </div>
      }
      renderRight={
        <div className='drawer-header--right flex alignCenter'>
          <div className='text--clickable drawer-header--close icon-text'>
            <SvgIcon size={1} icon='close' onClick={onClose} />
          </div>
        </div>
      }
    />
  )
}

export default DrawerHeader
