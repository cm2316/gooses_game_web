import React from 'react'
import classNames from 'classnames'
import SvgIcon from '@/components/common/svg-icon/Index'
import './index.scss'
const SwiperSwitch = ({
  className,
  prevElClassName,
  nextElClassName,
  iconPrev = 'prev',
  iconNext = 'next',
  size = 1,
  style,
}) => {
  return (
    <div className={classNames(['swiper-switch-container', className])} style={style || {}}>
      <button
        aria-hidden='true'
        aria-label='prevSlide'
        className={classNames(['swiper-switch-icon', prevElClassName])}
      >
        <SvgIcon key='prev' size={size} icon={iconPrev} />
      </button>
      <button
        aria-hidden='true'
        aria-label='nextSlide'
        className={classNames(['swiper-switch-icon', nextElClassName])}
      >
        <SvgIcon key='next' size={size} icon={iconNext} />
      </button>
    </div>
  )
}

export default SwiperSwitch
