import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import useLatest from '@/hook/base/useLatest'
import './index.scss'
const Image = ({
  className,
  src,
  onLoad,
  onError,
  // 图片是否lazy-load-
  lazy = true,
  // -----lazy为true有效---------------------------
  // 单距离多少进行加载，类似margin语法
  rootMargin = '500px',
  // offset相对容器（最好设置成图片所在滚动容器）
  root = null,
  // ----------------------------------------------
  position = 'center',
  showMask = true,
  ...props
}) => {
  const domRef = useRef(null)
  const containerRef = useRef(null)
  const [isError, setIsError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [containerClass, setContainerClass] = useState([])

  const _observeInfoRef = useLatest({ root, rootMargin })

  // 加载失败回调
  const _onLoadError = (e) => {
    setIsLoaded(false)
    setIsError(true)
    if (onError) onError(e)
  }

  // 加载成功回调
  const _onLoadSuccess = (e) => {
    const container = containerRef.current
    const { naturalHeight, naturalWidth } = e.target
    let containerWidth = 0
    let containerHeight = 0
    if (container) {
      containerWidth = container.clientWidth
      containerHeight = container.clientHeight
    }
    let containerClassTemp = []
    showMask && containerClassTemp.push('showMask')
    // 图片大小小于容器大小时
    if (naturalHeight < containerHeight && naturalWidth < containerWidth) {
      containerClassTemp.push('includeSize')
    }
    if (naturalWidth / naturalHeight !== containerWidth / containerHeight) {
      containerClassTemp.push('ratioDifferent')
    }
    // 图片
    if (naturalHeight > naturalWidth) {
      containerClassTemp.push('heightGtWidth')
    } else if (naturalWidth > naturalHeight) {
      containerClassTemp.push('widthGtHeight')
    } else {
      containerClassTemp.push('squareSize')
    }
    // 容器
    if (containerHeight > containerWidth) {
      containerClassTemp.push('containerHeightGtWidth')
    } else if (containerWidth > containerHeight) {
      containerClassTemp.push('containerWidthGtHeight')
    } else {
      containerClassTemp.push('containerSquareSize')
    }
    setContainerClass(containerClassTemp)
    setIsLoaded(true)
    setIsError(false)
    if (onLoad) {
      onLoad(e)
    }
  }
  // show placeholder?
  const showPlaceholder = !src || !isLoaded || isError
  // Observer image dom
  useEffect(() => {
    let observer
    if (domRef.current && src && lazy) {
      const { root, rootMargin } = _observeInfoRef.current
      const callback = (entries) => {
        for (let entry of entries) {
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            entry.target.src = src
            observer.unobserve(entry.target)
          }
        }
      }
      observer = new IntersectionObserver(callback, {
        root: typeof root === 'function' ? root() : root?.current ? root.current : root,
        rootMargin: typeof rootMargin === 'function' ? rootMargin() : rootMargin,
      })
      observer.observe(domRef.current)
    }
    return () => {
      observer && observer.disconnect()
    }
  }, [lazy, src])
  return (
    <div
      ref={containerRef}
      className={classnames([
        'imageContainer',
        position,
        { defaultImge: showPlaceholder, isLoaded },
        containerClass,
        className,
      ])}
    >
      <img
        ref={domRef}
        className='imageContainerChild'
        onError={(e) => _onLoadError(e)}
        onLoad={(e) => _onLoadSuccess(e)}
        aria-hidden='true'
        src={lazy ? '' : src}
        {...props}
      />
    </div>
  )
}

export default Image
