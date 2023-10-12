import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import Logo from '@/images/logo-full.png'
import Image from '@/components/common/image/Index'
import SvgIcon from '@/components/common/svg-icon/Index'
import PlayGroundSearchBox from '@/components/search-box/Index'
import RcDrawer from '@/components/rc-components/drawer/Index'
import ErrorFallback from '@/components/error-fallback/Index'
import SpaceBetweenHeader from '@/components/common/heading/space-between/Index'
import './index.scss'
const PlayGroundHeader = ({ className }) => {
  const drawerRef = useRef()
  const [isSearchActive, setIsSearchActive] = useState(false)
  const onOpenSearchDrawer = () => {
    if (isSearchActive) {
      drawerRef.current.onClose()
      return
    }
    drawerRef.current.onOpen()
  }
  return (
    <SpaceBetweenHeader
      className={classNames(['play-ground-header', className])}
      renderLeft={
        <div className='play-ground-header--left flex alignCenter'>
          <Image className='brand-logo' src={Logo} showMask={false} lazy={false} />
        </div>
      }
      renderRight={
        <div className='play-ground-header--right flex alignCenter'>
          <div
            className={classNames([
              'play-ground-header--search text--clickable flex perfectCenter pointer icon-text',
              { 'is-active': isSearchActive },
            ])}
            onClick={onOpenSearchDrawer}
          >
            <SvgIcon size={1} icon='search' />
          </div>
        </div>
      }
    >
      {/* Search drawer */}
      <ErrorFallback>
        <RcDrawer
          ref={drawerRef}
          getContainer={() => document.querySelector('.playGround--body')}
          styles={{
            wrapper: {
              width: '80%',
              height: '100%',
              left: 0,
              right: 0,
              margin: '0 auto',
            },
            content: {
              padding: '20px',
            },
          }}
          afterOpenChange={(value) => {
            setIsSearchActive(value)
          }}
          placement='bottom'
          render={() => {
            return <PlayGroundSearchBox />
          }}
        />
      </ErrorFallback>
    </SpaceBetweenHeader>
  )
}

export default PlayGroundHeader
