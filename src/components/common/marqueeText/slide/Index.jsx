import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import useMarquee from './useMarquee'
import './index.scss'
import { useImperativeHandle } from 'react'

const MarqueeSlide = ({ list, className, enable = true, animation = true }, ref) => {
  const listRef = useRef()
  const wrapRef = useRef()
  const { start, stop, index, transition, transform } = useMarquee({
    size: list.length,
    listRef,
  })

  useEffect(() => {
    if (animation && enable) {
      start({ delay: 3000, duration: 500 })
    } else {
      stop()
    }
  }, [animation, enable, start, stop])

  useImperativeHandle(ref, () => {
    return {
      getIndex: () => index,
    }
  })
  return (
    <div
      className={classNames([
        'marquee-slide-container',
        className,
        { 'marquee-slide-enable': enable },
      ])}
      ref={wrapRef}
    >
      <div ref={listRef} style={{ transform, transition, height: '100%' }}>
        {[0, 1].map((domItem) => (
          <div className='marquee-slide-item' key={domItem}>
            {list[(domItem + index) % list.length]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.forwardRef(MarqueeSlide)
