import React, { useEffect, useDeferredValue, useRef, useState, useImperativeHandle } from 'react'
import classNames from 'classnames'
import { useSize, useDebounce, useHover, useClickAway } from 'ahooks'
import { useFocusWithin } from 'react-aria'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import BaseTag from './Index'
import './list.scss'
import { off, on } from '@/tool/EE'
const BaseTagList = (
  {
    className,
    list,
    children,
    mode = 'float',
    autoClosed = true,
    autoClosedDelay = 3000,
    narratorMode = false,
  },
  ref
) => {
  const containerRef = useRef(null)
  const containerInnerRef = useRef(null)
  const autoClosedTimerRef = useRef(null)
  const showAllRef = useRef(null)
  const listLengthRef = useRef(list.length)
  const [showCount, setCount] = useState(list.length)
  const [showAllButton, setShowAllButton] = useState(true)
  const [isOpen, setIsopen] = useState(false)
  const [lineHeight, setLineHeight] = useState('auto')
  const { width } = useSize(containerRef)
  const debouncdWidth = useDebounce(width, { wait: 100 })
  const count = useDeferredValue(showCount)

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (flag) => setIsopen(flag),
    isDisabled: !narratorMode,
  })

  useEffect(() => {
    listLengthRef.current = list.length
  }, [list])

  const isHovering = useHover(containerRef)

  // 点击范围外区域收缩
  useClickAway(() => {
    setIsopen(false)
  }, containerRef)

  // 页面失焦收缩
  useEffect(() => {
    const onDocumentBlur = () => {
      setIsopen(false)
    }
    window.addEventListener('blur', onDocumentBlur, false)
    return () => window.removeEventListener('blur', onDocumentBlur)
  }, [])

  // 计时自动关闭
  useEffect(() => {
    if (!narratorMode) {
      clearTimeout(autoClosedTimerRef.current)
      if (!isHovering && autoClosed && isOpen) {
        autoClosedTimerRef.current = setTimeout(() => {
          setIsopen(false)
        }, autoClosedDelay)
      }
    }
  }, [isHovering, autoClosed, autoClosedDelay, isOpen])

  // 组件销毁清除计时器
  useEffect(() => {
    return () => clearTimeout(autoClosedTimerRef.current)
  }, [])

  useEffect(() => {
    const onClose = () => !narratorMode && setIsopen(false)
    on('base-tag-close', onClose)
    return () => {
      off('base-tag-close', onClose)
    }
  }, [])

  useEffect(() => {
    if (!debouncdWidth) {
      return
    }
    setCount(listLengthRef.current)
  }, [debouncdWidth])
  useEffect(() => {
    if (!debouncdWidth) {
      return
    }
    const containerWidth = containerRef.current.getBoundingClientRect().width
    const { width: containerInnerWidth, height: lineHeight } =
      containerInnerRef.current.getBoundingClientRect()
    const showAllWidth = showAllRef.current.getBoundingClientRect().width
    setLineHeight(`${lineHeight}px`)
    if (containerInnerWidth > containerWidth) {
      if (showCount === listLengthRef.current) {
        if (containerInnerWidth - showAllWidth <= containerWidth) {
          setShowAllButton(false)
        } else {
          setShowAllButton(true)
          setCount(showCount - 1)
        }
      } else {
        setShowAllButton(true)
        setCount(showCount - 1)
      }
    } else {
      if (showCount === listLengthRef.current) {
        setShowAllButton(false)
      } else {
        setShowAllButton(true)
      }
    }
  }, [showCount, debouncdWidth, list])

  const { focusIndex, fId, onKeyDown } = useKeyboardFocus({
    count: isOpen ? list.length : showCount,
    direction: 'horizontal',
  })

  const showAllJSX = (
    <BaseTag
      className={classNames(['fold-unfold', { isOpen }])}
      onClick={() => {
        setIsopen((flag) => !flag)
      }}
    >
      <SvgIcon size={1} icon={isOpen ? 'fold' : 'unfold'} />
    </BaseTag>
  )

  const firstLineJSX = list.slice(0, count).map((item, index) => {
    const tabIndex = index
    return children({
      item,
      index,
      tabIndex: focusIndex === tabIndex ? 0 : -1,
      id: `${fId}-${tabIndex}`,
    })
  })

  const restLineJSX = list.slice(count, list.length).map((item, index) => {
    const tabIndex = index + count
    return children({
      item,
      index,
      tabIndex: focusIndex === tabIndex ? 0 : -1,
      id: `${fId}-${tabIndex}`,
    })
  })

  useImperativeHandle(ref, () => {
    return {
      close: () => setIsopen(false),
    }
  })
  return (
    <div
      className={classNames([
        'baseTagList-container',
        { 'is-open': isOpen },
        `mode-${mode}`,
        className,
      ])}
      ref={containerRef}
      {...focusWithinProps}
    >
      {mode === 'float' ? (
        <div
          className='baseTagList-empty'
          style={{
            height: lineHeight,
          }}
        ></div>
      ) : null}
      <div className='baseTagList-wrap'>
        <div className='baseTagList-inner baseTagList-placeholder' ref={containerInnerRef}>
          {list.slice(0, showCount).map((item, index) => {
            return children({ item, index })
          })}
          {
            <BaseTag ref={showAllRef} className='fold-unfold'>
              <SvgIcon size={1} icon={isOpen ? 'fold' : 'unfold'} />
            </BaseTag>
          }
        </div>
        <div className='baseTagList-inner' onKeyDown={onKeyDown}>
          {firstLineJSX}
          {showAllButton && showAllJSX}
          {(isOpen || narratorMode) && restLineJSX}
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(BaseTagList)
