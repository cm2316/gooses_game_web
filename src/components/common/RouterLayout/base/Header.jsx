import React, { useRef } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Image from '@/components/common/Image/Image'
import Logo from '@/images/logo-full.png'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import Search from '@/components/search/Index'
import LanguageSwitch from '@/components/languageSwitch/Index'
import RcDrawer from '@/components/rc-components/drawer/Index'
import DrawerHeader from './drawer/header/Index'
import DrawerBody from './drawer/body/Index'
import DrawerNav from './drawer/nav/Index'
import SpaceBetweenHeader from '@/components/common/Heading/SpaceBetween/Index'
import './response.scss'
const Header = ({ className }) => {
  const drawerRef = useRef()
  const language = useSelector((state) => state.system.language)
  const getNavMenus = () => {
    return (
      <nav className={classNames(['base-header--nav', 'base-nav', 'flex', 'alignCenter'])}></nav>
    )
  }
  const onOpenMenuDrawer = () => {
    drawerRef.current.onOpen()
  }
  const renderHeaderLeft = (
    <div className='base-header--left flex alignCenter'>
      <Image className='brand-logo' src={Logo} showMask={false} />
      {getNavMenus()}
    </div>
  )
  const renderHeaderRight = (
    <div className='base-header--right flex alignCenter'>
      <div className='base-search'>
        <div className='base-search--inner'>
          <Search />
        </div>
      </div>
      <div className='base-language text--clickable'>
        <LanguageSwitch language={language} />
      </div>
      {/* mobile */}
      <div className='base-layout--mobile flex alignCenter margin-right-20'>
        <div className='text--clickable flex perfectCenter icon-text' onClick={onOpenMenuDrawer}>
          <SvgIcon size={1} icon='menu' />
        </div>
      </div>
    </div>
  )
  return (
    <>
      <SpaceBetweenHeader
        className={classNames(['base-header', className])}
        renderLeft={renderHeaderLeft}
        renderRight={renderHeaderRight}
      />
      <RcDrawer
        ref={drawerRef}
        getContainer={() => document.querySelector('.layout-base--main')}
        renderHeader={({ onClose }) => {
          return <DrawerHeader onClose={onClose} />
        }}
        styles={{
          wrapper: {
            width: '100%',
            height: '100%',
          },
          content: {
            padding: 0,
          },
        }}
        placement='bottom'
        render={({ onClose }) => {
          return (
            <DrawerBody>
              <DrawerNav onClose={onClose} />
            </DrawerBody>
          )
        }}
      />
    </>
  )
}

export default Header
