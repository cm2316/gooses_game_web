/**
 * Game carousel module
 */

import React, { useCallback, useMemo } from 'react'
import Carousel from '@/components/Carousel/Index'
import BaseHeader from '@/components/common/Heading/BaseHeader'
import ViewAllButton from '@/components/adapter/viewAllButton/Index'
import Link from '@/components/common/router/Link'
import RefreshIcon from '@/components/Carousel/components/RefreshIcon'
import FormattedText from '@/components/common/FormattedText/Index'
import { createGroup } from '@/tool'
import './index.scss'
const GameCarouselSection = ({
  title,
  titleId,
  className,
  linkTo,
  pagination,
  onRefresh,
  list,
  linkToText = 'viewAll',
  titleClass,
  renderHeader,
  // slider组件props
  slideConfig,
  carouselKeyId,
  slidesPerView,
  slidesPerGroup,
  columnsNumber,

  children,
  groupNumber = 0,
  isGroup = true,
  gap,
}) => {
  const sliderList = useMemo(() => {
    if (isGroup) {
      return createGroup(groupNumber || 1, list)
    }
    return list
  }, [list, groupNumber, isGroup])

  // 数据是否大于一页
  const upOnePage = useMemo(() => {
    if (isGroup) {
      if (list.length > groupNumber) {
        return true
      }
      return false
    }
    const compareLength = slidesPerView === 'auto' ? 3 : slidesPerView
    return list.length > compareLength
  }, [list.length, groupNumber, isGroup, slidesPerView])

  const defaultHeader = useCallback(
    ({ swiperSwitch }) => {
      return (
        <BaseHeader className={titleClass} data-focus-block>
          <div className='common-carousel-section-headerLeft'>
            <h2 className='common-carousel-section-title' id={carouselKeyId}>
              <FormattedText title={title} id={titleId} />
            </h2>
            {onRefresh && upOnePage && <RefreshIcon onRefresh={onRefresh} />}
          </div>
          <div className='common-carousel-section-headerRight'>
            {pagination && (
              <div style={{ display: upOnePage ? 'unset' : 'none' }}>{swiperSwitch}</div>
            )}
            {linkTo && upOnePage ? (
              <Link
                key='link'
                to={linkTo}
                aria-labelledby={`${linkToText}_${carouselKeyId} ${carouselKeyId}`}
              >
                <ViewAllButton
                  size='small'
                  titleId={linkToText}
                  aria-hidden='true'
                  id={`${linkToText}_${carouselKeyId}`}
                  tabIndex={-1}
                />
              </Link>
            ) : null}
          </div>
        </BaseHeader>
      )
    },
    [
      linkTo,
      upOnePage,
      pagination,
      title,
      titleId,
      onRefresh,
      linkToText,
      titleClass,
      carouselKeyId,
    ]
  )
  if (sliderList.length === 0) {
    return null
  }
  return (
    <Carousel
      carouselKeyId={carouselKeyId}
      list={sliderList}
      className={['common-carousel-section', className]}
      slideConfig={slideConfig}
      slidesPerView={slidesPerView}
      slidesPerGroup={slidesPerGroup}
      renderHeader={renderHeader || defaultHeader}
      gap={gap}
      count={list.length}
      columnsNumber={columnsNumber}
    >
      {children}
    </Carousel>
  )
}

export default GameCarouselSection
