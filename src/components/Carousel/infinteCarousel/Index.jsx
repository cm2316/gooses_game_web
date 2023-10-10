import classNames from 'classnames'
import React from 'react'

import { usePxToPx } from '@/hook/useViewport'

import './index.scss'

export const InifiteCarousel = ({ className, children, gap = 24, duration }) => {
  const gridGap = usePxToPx(gap)
  const count = React.Children.count(children)
  const style = {
    gap: `${gridGap}px`,
    animationDuration: `${duration || count * 6}s`,
    paddingRight: `${gridGap}px`,
  }
  return (
    <div className={classNames(['inifite-carousel', className])}>
      <ul className='inifite-carousel-inner' style={style}>
        {children}
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { key: `${child.key}-${index}` })
        })}
      </ul>
    </div>
  )
}

export const InifiteCarouselItem = ({ className, children }) => {
  return <li className={classNames(['inifite-carousel-item', className])}>{children}</li>
}
