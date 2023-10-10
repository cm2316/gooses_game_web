import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function RouterBeforeEach() {
  const location = useLocation()
  useLayoutEffect(() => {
    console.timeEnd('Router switch time cost.')
    return () => {
      console.time('Router switch time cost.')
    }
  }, [location.pathname])

  return null
}

export default RouterBeforeEach
