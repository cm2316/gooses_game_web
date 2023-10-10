import React from 'react'
import classNames from 'classnames'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
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
    <div className={classNames(['banner-swiper-switch-container', className])} style={style || {}}>
      <div className='switchLeft'>
        <SvgIcon
          key='prev'
          size={size}
          icon={iconPrev}
          className={['switchIcon', prevElClassName]}
        />
      </div>
      <div className='switchRight'>
        <SvgIcon
          key='next'
          size={size}
          icon={iconNext}
          className={['switchIcon', nextElClassName]}
        />
      </div>
    </div>
  )
}

export default SwiperSwitch
