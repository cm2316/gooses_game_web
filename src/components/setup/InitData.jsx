import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// actions
import { initializedApp } from '@/reducers/app/actions'
const Init = () => {
  const dispatch = useDispatch()

  // Initialize app
  useEffect(() => {
    dispatch(initializedApp())
  }, [])
  return null
}

export default Init
