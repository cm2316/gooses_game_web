import React, { useEffect } from 'react'
import classNames from 'classnames'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ViewportProvider } from '@/hook/useViewport'
import { Router } from '@/router'
import { AliveScope } from 'react-activation'

const App = () => {
  const theme = useSelector((state) => state.system.theme)
  useEffect(() => {
    document.body.setAttribute('class', theme)
  }, [theme])
  return (
    <ViewportProvider>
      <div className={classNames(['appContainer', 'contentInner'])}>
        <BrowserRouter>
          <AliveScope>
            <Router />
          </AliveScope>
        </BrowserRouter>
      </div>
    </ViewportProvider>
  )
}

export default App
