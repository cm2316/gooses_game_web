import { useEffect, useRef } from 'react'
import useLatest from '@/hook/base/useLatest'
const defaultOptions = { enable: true, onScroll: () => {}, scrollbarTrigger: false }
const Hook = (ref, options) => {
  const _options = { ...defaultOptions, ...(options || {}) }
  const _onScrollRef = useLatest(_options.onScroll)
  const _scrollbarTriggerRef = useLatest(_options.scrollbarTrigger)
  const timerRef = useRef(null)

  const onHandlerScroll = (evt) => {
    const onScroll = _onScrollRef.current
    if (onScroll && typeof onScroll === 'function') {
      onScroll(evt)
    }
    if (_scrollbarTriggerRef.current) {
      const scrollTarget = evt.target
      clearTimeout(timerRef.current)
      if (!scrollTarget.classList?.contains('activeScroll')) {
        scrollTarget.classList.add('activeScroll')
      }
      timerRef.current = setTimeout(() => {
        scrollTarget.classList?.remove('activeScroll')
      }, 1000)
    }
  }
  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  })
  useEffect(() => {
    const refValue = ref.current
    if (_options.enable) {
      refValue?.addEventListener('scroll', onHandlerScroll, false)
    }
    return () => {
      refValue?.removeEventListener('scroll', onHandlerScroll)
    }
  }, [_options.enable])
}

export default Hook
