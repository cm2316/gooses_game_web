/**
 * Game carousel module
 */

import React, { useCallback, useId, useMemo } from 'react'
import CommonCarouselSection from './CommonCarouselSection'
import GameListItem from '@/components/common/GameListItem/GameListItem'
import './index.scss'
import { loop } from '@/tool'
import './gameCarouselSection.scss'
const GameCarouselSection = ({
  title,
  titleId,
  className,
  linkTo,
  pagination = true,
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
  // GameListItem组件props
  showCloudBtn,
  showPlayBtn,
  showDeleteBtn,
  onItemClick = loop,
  showInstalledState,
  showLikeIncon,
  imgPlaceholderClass,
  imageUrlGet,
  bootGameOnClick,
  inViewOptions,
  // Image组件props
  lazyRootMargin = '0px',
  onImageLoad,
  onImageError,
  imageLayoutRender,

  groupNumber = 0,
  renderItem = null,
  isGroup = true,
  columnsNumber,
  gap,
}) => {
  const _carouselKeyId = useId()
  const fId = carouselKeyId || _carouselKeyId.replace(/:/g, '_')
  const itemProps = useMemo(() => {
    return {
      bootGameOnClick,
      imgPlaceholderClass,
      showInstalledState,
      onImageError,
      onImageLoad,
      lazyRootMargin,
      showLikeIncon,
      showCloudBtn,
      showPlayBtn,
      showDeleteBtn,
      onItemClick,
      imageUrlGet,
      imageLayoutRender,
      inViewOptions,
    }
  }, [
    bootGameOnClick,
    imgPlaceholderClass,
    showInstalledState,
    onImageError,
    onImageLoad,
    lazyRootMargin,
    showLikeIncon,
    showCloudBtn,
    showPlayBtn,
    showDeleteBtn,
    onItemClick,
    imageUrlGet,
    imageLayoutRender,
    inViewOptions,
  ])

  const renderChildJsx = useCallback(
    (slide, { index, swiperRef, focusIndex }) => {
      const _itemProps = {
        root: swiperRef,
        ...itemProps,
      }
      if (renderItem) {
        return renderItem({
          slide,
          itemProps: _itemProps,
          index,
          groupNumber,
          focusIndex,
          fId,
        })
      }
      const renderSlides = isGroup ? slide : [slide]
      return renderSlides.map((item, i) => {
        const [s, t] = focusIndex
        const tabIndex = s === index && t === i ? 0 : -1
        return (
          <GameListItem
            key={item.package_name}
            {..._itemProps}
            onClick={itemProps.onItemClick}
            game={item}
            tabIndex={tabIndex}
            tabId={`${fId}-${index}-${i}`}
            itemIndex={index}
          />
        )
      })
    },
    [renderItem, itemProps, isGroup, groupNumber, fId]
  )
  if (list.length === 0) {
    return null
  }
  return (
    <CommonCarouselSection
      carouselKeyId={fId}
      list={list}
      className={['game-carousel-section', className]}
      slideConfig={{ virtual: true, ...slideConfig }}
      slidesPerView={slidesPerView}
      slidesPerGroup={slidesPerGroup}
      linkTo={linkTo}
      title={title}
      titleId={titleId}
      pagination={pagination}
      onRefresh={onRefresh}
      linkToText={linkToText}
      groupNumber={groupNumber}
      columnsNumber={columnsNumber}
      isGroup={isGroup}
      gap={gap}
      titleClass={titleClass}
      renderHeader={renderHeader}
    >
      {renderChildJsx}
    </CommonCarouselSection>
  )
}

export default GameCarouselSection
