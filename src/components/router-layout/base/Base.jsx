import React, { useRef } from 'react'
import { useOutlet } from 'react-router-dom'
import Setup from '@/components/setup/Index'
import InitData from '@/components/setup/InitData'
import RouterBeforeEach from '@/components/setup/RouterBeforeEach'
import Header from './Header'
import Footer from './Footer'
import './index.scss'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useState } from 'react'

function RouterLayout() {
  const layoutRef = useRef()
  const currentOutlet = useOutlet()

  const [scrollClass, setScrollClass] = useState('')

  useEffect(() => {
    const target = layoutRef.current
    let lastScrollTop = 0
    const delta = 50
    const onScroll = () => {
      const st = target.scrollTop
      if (Math.abs(lastScrollTop - st) <= delta) {
        return
      }
      if (st > lastScrollTop) {
        if (st > 100) setScrollClass('scroll-down')
      } else {
        setScrollClass('scroll-up')
      }
      lastScrollTop = st
    }
    target.addEventListener('scroll', onScroll, false)
    return () => {
      target.removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <div className={classNames(['layout-base', scrollClass])} ref={layoutRef}>
      <Header className='layout-base--header' />
      <main className='layout-base--main container'>
        <InitData />
        <Setup />
        <RouterBeforeEach />
        {currentOutlet}
      </main>
      <Footer className='layout-base--footer' />
    </div>
  )
}

export default RouterLayout
