import React, { useRef, useEffect } from 'react'
import './index.scss'
import { useState } from 'react'
import { useSize } from 'ahooks'
import { usePxToPx } from '@/hook/useViewport'
import classNames from 'classnames'
// 跑马灯
const speed = 20
const Marquee = ({ text, children, space = 6, className, enable = true }) => {
  const textRef = useRef()
  const containerRef = useRef()

  const value = useRef(text || children)
  const [child, setChild] = useState(value.current)

  const spaceUnit = usePxToPx(space)
  const { width } = useSize(containerRef)

  const sizeInfoRef = useRef({ textWidth: 0, containerWidth: 0 })
  useEffect(() => {
    const textWidth = textRef.current.getBoundingClientRect().width
    const containerWidth = containerRef.current.getBoundingClientRect().width
    sizeInfoRef.current = {
      textWidth,
      containerWidth,
    }
    value.current = text || children
    setChild(value.current)
  }, [width, text, children])

  useEffect(() => {
    const { textWidth, containerWidth } = sizeInfoRef.current
    const move = (duration, textWidth) => {
      textRef.current.style = `
            animation: oneTextAnimation ${duration}s linear infinite;
            width:${textWidth + spaceUnit}px;
        `
      setChild([
        <span key='front'>{value.current}</span>,
        <span key='tail' style={{ marginLeft: `${spaceUnit}px` }}>
          {value.current}
        </span>,
      ])
    }
    const isNeedToMove = () => {
      const duration = Math.floor(containerWidth / speed)
      if (containerWidth < textWidth) {
        move(duration, textWidth)
      }
    }
    if (enable) {
      isNeedToMove()
    } else {
      textRef.current.style = ''
    }
  }, [spaceUnit, enable])
  return (
    <div className={classNames(['one-text-marquee-bar', className])} ref={containerRef}>
      <div className='one-text-marquee-bar-view' ref={textRef}>
        {child}
      </div>
    </div>
  )
}

export default Marquee
