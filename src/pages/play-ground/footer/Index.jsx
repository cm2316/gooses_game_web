import React from 'react'
import classNames from 'classnames'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import './index.scss'
import { useFullscreen } from 'ahooks'
const PlayGroundFooter = ({ className }) => {
  const [, { toggleFull }] = useFullscreen(() => document.querySelector('.playGround--body'))
  return (
    <footer className={classNames(['playGroundFooter-container', 'flex', className])}>
      <div className='flex spaceBetween alignCenter'>
        <div className='playGroundFooter--left flex alignCenter'></div>
        <div className='playGroundFooter--right flex alignCenter'>
          <div
            className='text--clickable pointer playGroundFooter--fullscreen icon-text'
            onClick={toggleFull}
          >
            <SvgIcon size={1} icon='full-screen' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PlayGroundFooter
