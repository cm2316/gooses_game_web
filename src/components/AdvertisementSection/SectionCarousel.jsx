import React, { useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import classNames from 'classnames'
import FormattedText from '@/components/common/FormattedText/Index'
import SwiperSwitch from '@/components/adapter/swiperSwitch/Index'
import BaseHeader from '../common/Heading/BaseHeader'
import Advertisement from './Advertisement'
import './sectionCarousel.scss'
SwiperCore.use([Navigation])
const SectionCarousel = ({
  className,
  list,
  carouselKeyId = 'carousel',
  slideConfig = {},
  slidesPerView = 1,
  slidesPerGroup,
}) => {
  const nextElClassName = `swiper-button-next_section_${carouselKeyId}`
  const prevElClassName = `swiper-button-prev_section_${carouselKeyId}`
  const swiperInstanceRef = useRef(null)
  const settings = useMemo(() => {
    return {
      simulateTouch: false,
      spaceBetween: 20,
      navigation: {
        nextEl: `.${nextElClassName}`,
        prevEl: `.${prevElClassName}`,
        disabledClass: 'disabled',
      },
      slidesPerView: slidesPerView,
      slidesPerGroup: slidesPerGroup || slidesPerView,
      a11y: false,
      virtual: true,
      onAfterInit(swiper) {
        swiperInstanceRef.current = swiper
      },
      onSnapIndexChange(swiper) {
        setFocusIndex(() => {
          return swiper.snapIndex * swiper.params.slidesPerView
        })
      },
      ...slideConfig,
    }
  }, [slidesPerView, prevElClassName, nextElClassName, slidesPerGroup, slideConfig])

  const [focusIndex, setFocusIndex] = useState(0)
  const contentRef = useRef(null)

  const onKeyDown = (evt) => {
    const delay = 200
    let newFocusIndex = -1
    if (evt.keyCode === 39) {
      if (focusIndex < list.length - 1) {
        newFocusIndex = focusIndex + 1
      }
    } else if (evt.keyCode === 37) {
      if (focusIndex > 0) {
        newFocusIndex = focusIndex - 1
      }
    }

    if (newFocusIndex > -1) {
      setFocusIndex(newFocusIndex)
      swiperInstanceRef.current.slideTo(newFocusIndex)
      evt.stopPropagation()
      setTimeout(() => {
        document.getElementById(`${carouselKeyId}-${newFocusIndex}`).focus()
      }, delay)
    }
  }

  if (list.length === 0) {
    return null
  }

  return (
    <section
      className={classNames(['section-carousel-container', className])}
      aria-labelledby='featuredGame'
    >
      <BaseHeader className='section-carousel-header' data-focus-block>
        <span id='featuredGame'>
          <FormattedText className='section-carousel-headerTitle' id='featuredGame' />
        </span>
        {list.length > slidesPerView ? (
          <SwiperSwitch prevElClassName={prevElClassName} nextElClassName={nextElClassName} />
        ) : null}
      </BaseHeader>
      <main onKeyDown={onKeyDown} data-focus-block>
        <Swiper {...settings} className='section-carousel-body' ref={contentRef}>
          {list.map((banner, index) => {
            return (
              <SwiperSlide key={index}>
                <Advertisement
                  app={banner}
                  showInstalledState
                  className='section-carousel-item'
                  tabIndex={focusIndex === index ? 0 : -1}
                  tabId={`${carouselKeyId}-${index}`}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </main>
    </section>
  )
}

export default React.memo(SectionCarousel)
