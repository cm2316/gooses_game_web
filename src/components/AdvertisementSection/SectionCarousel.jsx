import React, { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import classNames from 'classnames'
import Advertisement from './Advertisement'
import './sectionCarousel.scss'
const SectionCarousel = ({
  className,
  list,
  slideConfig = {},
  slidesPerView = 1,
  slidesPerGroup,
}) => {
  const settings = useMemo(() => {
    return {
      modules: [Navigation, Autoplay],
      centeredSlides: true,
      loop: true,
      onAfterInit: (swiper) => swiper.slideTo(1, 0),
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      spaceBetween: 20,
      loopedSlides: 5,
      navigation: true,
      slidesPerView: slidesPerView,
      breakpoints: {
        800: {
          slidesPerView: 1.5,
        },
      },
      ...slideConfig,
    }
  }, [slidesPerView, slidesPerGroup, slideConfig])

  if (list.length === 0) {
    return null
  }

  return (
    <section className={classNames(['section-carousel-container', className])}>
      <Swiper {...settings} className='section-carousel-body'>
        {list.map((banner, index) => {
          return (
            <SwiperSlide key={index}>
              <Advertisement app={banner} className='section-carousel-item' />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}

export default React.memo(SectionCarousel)
