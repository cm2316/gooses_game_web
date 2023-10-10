import { useState, useRef, useCallback, useEffect } from 'react'

function useMarquee({ size, listRef }) {
  const [transform, setTransform] = useState('none')
  const [transition, setTransition] = useState('none')
  const [index, setIndex] = useState(0)
  const durationRef = useRef()
  const delayRef = useRef()

  const move = useCallback(
    (duration) => {
      let height = 0
      const element = listRef.current?.children[0]
      if (element) {
        height = element.offsetHeight
        setTransform(`translateY(-${height}px)`)
        setTransition(`transform ${duration / 1000}s linear`)
      }
    },
    [listRef]
  )
  const reset = useCallback(() => {
    setIndex((index) => {
      let val = index + 1
      if (val > size - 1) {
        val = 0
      }
      return val
    })
    setTransform('none')
    setTransition('none')
  }, [size])
  const start = useCallback(
    ({ delay, duration }) => {
      if (!listRef.current?.children[0]) {
        return
      }
      window.clearTimeout(delayRef.current)
      delayRef.current = window.setTimeout(() => {
        move(duration)
        window.clearTimeout(durationRef.current)
        durationRef.current = window.setTimeout(reset, duration)
        start({ delay, duration })
      }, delay)
    },
    [size, listRef, move, reset]
  )

  const stop = () => {
    window.clearTimeout(delayRef.current)
    window.clearTimeout(durationRef.current)
  }
  useEffect(() => {
    return stop
  }, [])
  return { start, stop, index, transform, transition }
}

export default useMarquee
