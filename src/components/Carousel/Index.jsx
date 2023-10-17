import React, { useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Virtual } from 'swiper'
import classNames from 'classnames'
import { useDebounceFn } from 'ahooks'
import BaseHeader from '@/components/common/heading/BaseHeader'
import FormattedText from '@/components/common/formatted-text/Index'
import SwiperSwitch from '@/components/adapter/swiperSwitch/Index'
import { usePxToPx } from '@/hook/useViewport'
import './index.scss'

SwiperCore.use([Navigation, Virtual])

const CarouselLayout = ({
  className,
  titleId,
  title,
  list,
  carouselKeyId = 'carousel',
  slideConfig,
  slidesPerView = 4,
  slidesPerGroup = slidesPerView,
  children,
  renderHeader,
  keyId,
  gap = 24,
  // 初始化聚焦项目（二维）
  initFocusIndex = [0, 0],
  columnsNumber = 0,
}) => {
  const nextElClassName = `swiper-button-next_${carouselKeyId}`
  const prevElClassName = `swiper-button-prev_${carouselKeyId}`

  const [focusIndex, setFocusIndex] = useState(initFocusIndex)

  const gridGap = usePxToPx(gap)

  const swiperRef = useRef(null)
  const swiperInstanceRef = useRef(null)

  const isFocusAction = useRef(false)

  // list行列个数
  const colSize = Array.isArray(list[0]) ? list[0].length : 1
  const rowSize = list.length || 0
  // swiper配置参数
  const settings = useMemo(() => {
    return {
      simulateTouch: false,
      spaceBetween: gridGap,
      navigation: {
        nextEl: `.${nextElClassName}`,
        prevEl: `.${prevElClassName}`,
        disabledClass: 'disabled',
      },
      virtual: false,
      slidesPerView,
      slidesPerGroup,
      a11y: false,
      onInit(swiper) {
        swiperInstanceRef.current = swiper
      },
      ...(slideConfig || {}),
      onSnapIndexChange(swiper) {
        if (isFocusAction.current) {
          return
        }
        setFocusIndex(() => {
          return [swiper.snapIndex * (parseInt(swiper.params.slidesPerView) || 1) || 0, 0]
        })
      },
    }
  }, [slidesPerView, prevElClassName, nextElClassName, slidesPerGroup, slideConfig, gridGap])

  const transtionFocus = (index, focusDom, id) => {
    isFocusAction.current = true
    swiperInstanceRef.current.slideTo(index)
    swiperInstanceRef.current.once('transitionEnd', () => {
      document.getElementById(id)?.focus()
      // console.log(focusDom === document.getElementById(id))
      isFocusAction.current = false
    })
  }

  const onKeyDown = useDebounceFn(
    (evt) => {
      let shouldStop = isFocusAction.current
      if (!isFocusAction.current) {
        if (evt.keyCode === 39) {
          const [row, col] = focusIndex
          const newRow = row + 1
          const newCol = col + 1
          if (newCol >= colSize) {
            if (row + 1 < rowSize) {
              const focusDom = document.getElementById(`${carouselKeyId}-${newRow}-${0}`)
              if (focusDom) {
                setFocusIndex([newRow, 0])
                if (
                  newRow <
                  swiperInstanceRef.current.params.slidesPerView +
                    swiperInstanceRef.current.activeIndex
                ) {
                  focusDom.focus()
                } else {
                  transtionFocus(newRow, focusDom, `${carouselKeyId}-${newRow}-${0}`)
                }
                shouldStop = true
              }
            }
          } else {
            const focusDom = document.getElementById(`${carouselKeyId}-${row}-${newCol}`)
            if (focusDom) {
              setFocusIndex([row, newCol])
              focusDom.focus()
              shouldStop = true
            }
          }
        } else if (evt.keyCode === 37) {
          const [row, col] = focusIndex
          const newRow = row - 1
          const newCol = col - 1
          if (newCol < 0) {
            if (newRow >= 0) {
              const focusDom = document.getElementById(`${carouselKeyId}-${newRow}-${colSize - 1}`)
              if (focusDom) {
                setFocusIndex([newRow, colSize - 1])
                if (newRow >= swiperInstanceRef.current.activeIndex) {
                  focusDom.focus()
                } else {
                  transtionFocus(newRow, focusDom, `${carouselKeyId}-${newRow}-${colSize - 1}`)
                }
                shouldStop = true
              }
            }
          } else {
            const focusDom = document.getElementById(`${carouselKeyId}-${row}-${newCol}`)
            if (focusDom) {
              setFocusIndex([row, newCol])
              focusDom.focus()
              shouldStop = true
            }
          }
        } else if (columnsNumber > 0 && evt.keyCode === 40) {
          const [row, col] = focusIndex
          const newCol = col + columnsNumber
          if (newCol < colSize) {
            const focusDom = document.getElementById(`${carouselKeyId}-${row}-${newCol}`)
            if (focusDom) {
              setFocusIndex([row, newCol])
              focusDom.focus()
              shouldStop = true
            }
          }
        } else if (columnsNumber > 0 && evt.keyCode === 38) {
          const [row, col] = focusIndex
          const newCol = col - columnsNumber
          if (newCol >= -1) {
            const focusDom = document.getElementById(`${carouselKeyId}-${row}-${newCol}`)
            if (focusDom) {
              setFocusIndex([row, newCol])
              focusDom.focus()
              shouldStop = true
            }
          }
        }
      }
      evt.stopPropagation()
      if (!shouldStop) {
        document.dispatchEvent(new KeyboardEvent('keydown', evt))
      }
    },
    { wait: 60, leading: true }
  )

  if (!Array.isArray(list) || list.length === 0) {
    return null
  }
  return (
    <section className={classNames(['carousel-layout', className])} aria-labelledby={carouselKeyId}>
      {(renderHeader &&
        (typeof renderHeader === 'function'
          ? renderHeader({
              nextElClassName,
              prevElClassName,
              swiperSwitch: (
                <SwiperSwitch prevElClassName={prevElClassName} nextElClassName={nextElClassName} />
              ),
            })
          : renderHeader)) || (
        <BaseHeader id={carouselKeyId}>
          <FormattedText title={title} id={titleId} />
        </BaseHeader>
      )}
      <div onKeyDown={onKeyDown.run} className='carousel-layout--content' data-focus-block>
        <Swiper {...settings} ref={swiperRef}>
          {list.map((banner, index) => {
            return (
              <SwiperSlide key={banner[keyId] || index} virtualIndex={index}>
                {(slideOptions) => children(banner, { index, slideOptions, swiperRef, focusIndex })}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}

export default CarouselLayout
