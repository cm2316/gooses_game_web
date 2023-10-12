import React from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router'
import classNames from 'classnames'
import LanguageSwitch from '@/components/language-switch/Index'
import './index.scss'
const DrawerNav = ({ onClose }) => {
  // const navigate=useNavigate()
  const language = useSelector((state) => state.system.language)
  return (
    <nav className={classNames(['drawerNav-container', 'column', 'flex', 'alignCenter'])}>
      <div className='drawerNav--item'>
        <LanguageSwitch language={language} onChange={onClose} />
      </div>
    </nav>
  )
}

export default DrawerNav
