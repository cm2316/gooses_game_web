import React from 'react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Wrap from './Wrap'
import './large_carousel.scss'

const LargeCarousel = ({ className, aspectClass = 'ratio-131-50', enable }) => {
  return (
    <Wrap enable={enable}>
      <div
        className={classNames([
          'responsive-container',
          'skeleton_largeCarousel',
          className,
          aspectClass,
        ])}
      >
        <div className='skeleton_largeCarouselInner'>
          <Skeleton height='100%' borderRadius={12} />
        </div>
      </div>
    </Wrap>
  )
}

export default LargeCarousel
