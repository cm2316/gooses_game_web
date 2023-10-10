/**
 * 轮播组件使用Home使用
 */

import React, { useCallback, useMemo, useRef } from 'react'
import classNames from 'classnames'
import Carousel from '@/components/Carousel/Index'
import { getButtonText } from '@/tool/buttonText'
import GameListItem from '../common/GameListItem/GameListItem'
import SwiperSwitch from '@/components/adapter/swiperSwitch/Banner'
import { onGameClickAction } from '@/actions/commonActions'
import './gameCarouselSectionForHomeBanner.scss'
const GameCarouselSection = ({
  className,
  list,
  // slider组件props
  slideConfig,
  carouselKeyId,
  slidesPerView,
  slidesPerGroup,
  // GameListItem组件props
  showSubTitle = false,
  showCloudBtn,
  showPlayBtn,
  showDeleteBtn,
  showDetailIcon,
  onRootClick,
  showInstalledState,
  showLikeIncon,
  showCsIcon = true,
  imgPlaceholderClass,
  imageUrlGet,
  bootGameOnClick,
  hasHoverAction = true,
  onHoverEnter,
  inViewOptions,
  // Image组件props
  lazyRootMargin = '0px',
  onImageLoad,
  onImageError,
  imageDisplayStrategy,

  renderItem = null,
  activeIndex = 0,
  gap,
}) => {
  const initFocusIndex = useRef([activeIndex, 0])
  const itemProps = useMemo(() => {
    return {
      showSubTitle,
      showCsIcon,
      bootGameOnClick,
      imgPlaceholderClass,
      showInstalledState,
      onImageError,
      onImageLoad,
      imageDisplayStrategy,
      lazyRootMargin,
      showLikeIncon,
      showCloudBtn,
      showPlayBtn,
      showDeleteBtn,
      showDetailIcon,
      imageUrlGet,
      onHoverEnter,
      hasHoverAction,
      onRootClick,
      inViewOptions,
    }
  }, [
    showSubTitle,
    showCsIcon,
    bootGameOnClick,
    imgPlaceholderClass,
    showInstalledState,
    onImageError,
    onImageLoad,
    imageDisplayStrategy,
    lazyRootMargin,
    showLikeIncon,
    showCloudBtn,
    showPlayBtn,
    showDeleteBtn,
    showDetailIcon,
    imageUrlGet,
    onHoverEnter,
    hasHoverAction,
    onRootClick,
    inViewOptions,
  ])

  const onItemClick = (app, { isInstalled, isJapan, evt }) => {
    const { redirectCode, gameType, actionCode } = getButtonText(null, {
      isInstalled,
      app,
      isGotoAppDetailPage: !isJapan,
    })
    onGameClickAction({
      app,
      isInstalled,
      evt,
      gameType,
      actionCode,
      redirectCode,
    })
  }

  const renderChildJsx = (slide, { index, focusIndex }) => {
    if (renderItem) {
      return renderItem({ slide, itemProps, index })
    }
    const _onHoverEnter = itemProps.onHoverEnter
      ? (app) => {
          itemProps.onHoverEnter(app, index)
        }
      : null

    const _onFocusWithin = (app) => {
      itemProps.onHoverEnter(app, index)
    }
    const [s, t] = focusIndex
    const tabIndex = s === index && t === 0 ? 0 : -1
    const _onItemClick = (app, opt) => {
      if (index === activeIndex) {
        onItemClick(app, { ...opt, index })
      } else {
        itemProps.onHoverEnter(app, index)
      }
    }
    return (
      <GameListItem
        key={slide.package_name}
        onFocusWithin={_onFocusWithin}
        {...itemProps}
        onHoverEnter={_onHoverEnter}
        onRootClick={_onItemClick}
        nameClass={'gameNameShadow'}
        itemIndex={index}
        game={slide}
        className={classNames([
          'game-carousel-section-carouselItem',
          { 'game-carousel-section-activeItem': activeIndex === index },
        ])}
        tabIndex={tabIndex}
        tabId={`${carouselKeyId}-${index}-${0}`}
      />
    )
  }
  const renderSwitchJSX = ({ nextElClassName, prevElClassName }) => {
    return (
      <SwiperSwitch
        nextElClassName={nextElClassName}
        prevElClassName={prevElClassName}
        className='game-carousel-section-homeBannerSwitch'
      />
    )
  }
  if (list.length === 0) {
    return null
  }
  return (
    <Carousel
      carouselKeyId={carouselKeyId}
      list={list}
      className={['game-carousel-section-homeBanner', className]}
      slideConfig={slideConfig}
      slidesPerView={slidesPerView}
      slidesPerGroup={slidesPerGroup}
      renderHeader={renderSwitchJSX}
      initFocusIndex={initFocusIndex.current}
      gap={gap}
    >
      {renderChildJsx}
    </Carousel>
  )
}

export default GameCarouselSection
