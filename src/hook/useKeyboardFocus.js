import { useEffect, useState, useId } from 'react'
import { containerValueFinder } from '@/tool'
import useLatest from './base/useLatest'
// import getFirstFocusableElement from '@/tool/getFirstFocusableElement'

const defaultOptions = {
  columns: 1,
  count: 0,
  initial: 0,
  direction: 'both',
  target: null,
}

const Hook = (options = {}) => {
  const fId = useId()
  const [focusIndex, setFocusIndex] = useState(0)
  const optionsRef = useLatest({ ...defaultOptions, ...options, focusIndex, fId })
  // useEffect(() => {
  //   setTimeout(() => {
  //     const firstFocusableElement = getFirstFocusableElement(target.current)
  //     if (firstFocusableElement) {
  //       firstFocusableElement?.focus()
  //     }
  //   }, 100)
  // }, [])

  const onKeyDown = (evt) => {
    let shouldStop = false
    const { count, columns, fId, direction, focusIndex } = optionsRef.current
    if (direction === 'both' || direction === 'horizontal') {
      if (evt.keyCode === 39) {
        if (focusIndex < count - 1) {
          setFocusIndex(focusIndex + 1)
          document.getElementById(`${fId}-${focusIndex + 1}`)?.focus()
          shouldStop = true
        }
      }
      if (evt.keyCode === 37) {
        if (focusIndex > 0) {
          setFocusIndex(focusIndex - 1)
          document.getElementById(`${fId}-${focusIndex - 1}`)?.focus()
          shouldStop = true
        }
      }
    }
    if (direction === 'both' || direction === 'vertical') {
      if (evt.keyCode === 40) {
        if (focusIndex <= count - 1 - columns) {
          setFocusIndex((index) => index + columns)
          document.getElementById(`${fId}-${focusIndex + columns}`)?.focus()
          shouldStop = true
        }
      }
      if (evt.keyCode === 38) {
        if (focusIndex > columns - 1) {
          setFocusIndex((index) => index - columns)
          document.getElementById(`${fId}-${focusIndex - columns}`)?.focus()
          shouldStop = true
        }
      }
    }
    evt.stopPropagation()
    if (!shouldStop) {
      document.dispatchEvent(new KeyboardEvent('keydown', evt))
    }
  }
  useEffect(() => {
    let contentDom
    const _target = options.target
    if (_target) {
      contentDom = containerValueFinder(_target)
      contentDom?.addEventListener('keydown', onKeyDown, false)
    }
    return () => {
      if (_target) {
        contentDom?.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [options.target])

  return { focusIndex, fId, onKeyDown }
}

export default Hook
