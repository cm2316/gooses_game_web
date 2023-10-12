import React, { useState, useMemo, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import { useSize } from 'ahooks'
import { useFocusWithin } from 'react-aria'
import SvgIcon from '@/components/common/svg-icon/Index'
import HistoryPanel from './history/HistoryPanel'
import ResultPanel from './result/ResultPanel'
import style from './index.module.scss'

const Search = ({ className }) => {
  const intl = useIntl()
  const inputRef = useRef(null)
  const historyPanelRef = useRef(null)
  const resultPanelRef = useRef(null)
  const containerRef = useRef(null)
  const inputContainerRef = useRef(null)
  const [value, setValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isInputEnd, setIsInputEnd] = useState(true)

  const { width } = useSize(containerRef)

  const { focusWithinProps } = useFocusWithin({
    onBlurWithin: () => setTimeout(() => setIsFocus(false), 300),
    onFocusWithin: () => setIsFocus(true),
  })

  //Whether is show history
  const showHistory = useMemo(() => {
    if (isFocus && value === '') {
      return true
    }
    return false
  }, [isFocus, value])

  //Whether is show result
  const showResult = useMemo(() => {
    if (isFocus && value) {
      return true
    }
    return false
  }, [isFocus, value])

  // Resize layout
  const doLayout = useCallback(() => {
    if (containerRef.current) {
      const dom = containerRef.current
      const inputHeight = inputContainerRef.current.clientHeight
      if (showHistory) {
        dom.style.height = `${historyPanelRef.current.getClientHeight() + inputHeight}px`
      } else if (showResult) {
        dom.style.height = `${resultPanelRef.current.getClientHeight() + inputHeight}px`
      } else {
        dom.style.height = `${inputHeight}px`
      }
    }
    // inputRef.current.focus()
  }, [showHistory, showResult])

  useLayoutEffect(() => {
    doLayout()
  }, [doLayout, width])

  // On start query
  const onStartQuery = useCallback((word) => {
    if (word && resultPanelRef.current) {
      resultPanelRef.current.startQuery(word)
    }
  }, [])

  // Watch value and trigger onStartQuery
  useEffect(() => {
    onStartQuery(value)
  }, [value, onStartQuery])

  // On input
  const onInputDebounce = useCallback((e) => {
    const word = e.target.value
    setValue(word)
  }, [])

  // On focus input
  const onFocus = useCallback(async () => {
    setTimeout(() => {
      inputRef.current.setSelectionRange(value.length, value.length)
    }, 0)
    await historyPanelRef.current.getHistorys()
    let _value = value
    onStartQuery(_value)
    setIsFocus(true)
  }, [value, onStartQuery])

  // Click history item
  const onItemClick = useCallback((word) => {
    setValue(word)
    inputRef.current.value = word
    inputRef.current.focus()
  }, [])
  // Judge to search result page
  const onJudgeToSearchPage = useCallback((query) => {
    historyPanelRef.current.addHistory(query)
  }, [])

  // On enter key press
  const onKeyDown = useCallback(
    (e) => {
      const value = e.target.value
      if (e.keyCode === 13) {
        if (value?.trim()) {
          // Enter search page
          onJudgeToSearchPage(value)
        }
      }
      if (e.keyCode === 37 || e.keyCode === 39) {
        e.stopPropagation()
      }
    },
    [onJudgeToSearchPage]
  )

  // On clear search value
  const onClearValue = useCallback(() => {
    inputRef.current.value = ''
    setTimeout(() => {
      setValue('')
    })
  }, [])
  return (
    <div
      className={classNames([style.container, className])}
      ref={containerRef}
      {...focusWithinProps}
    >
      <div className={style.inputContainer} ref={inputContainerRef}>
        <label htmlFor='searchInput' data-focus-block>
          <input
            id='searchInput'
            type='text'
            autoComplete='off'
            ref={inputRef}
            defaultValue={value}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            // Fixed Chinese input bug
            onCompositionStart={() => setIsInputEnd(false)}
            maxLength={50}
            onCompositionEnd={(evt) => {
              setIsInputEnd(true)
              onInputDebounce(evt)
            }}
            onInput={(evt) => {
              if (isInputEnd) onInputDebounce(evt)
            }}
            placeholder={intl.formatMessage({ id: 'searchPlaceholder' })}
            className={classNames([style.input, { [style.isFocus]: isFocus }])}
          />
          {value ? (
            <SvgIcon
              onClick={onClearValue}
              className={classNames([style.icon, style.clearIcon])}
              size={1}
              icon='close'
            />
          ) : (
            <SvgIcon className={classNames([style.icon, style.afterIcon])} size={1} icon='search' />
          )}
        </label>
      </div>

      {/* Search historys panel */}
      <HistoryPanel
        onChange={doLayout}
        disabled={!showHistory}
        ref={historyPanelRef}
        onClick={onItemClick}
      />

      {/* Search results panel */}
      <ResultPanel
        onJudgeToSearchPage={onJudgeToSearchPage}
        onChange={doLayout}
        query={value}
        disabled={!showResult}
        ref={resultPanelRef}
      />
    </div>
  )
}

export default Search
