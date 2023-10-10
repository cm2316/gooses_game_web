import React, { useImperativeHandle, useCallback, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import { getHistorys, addHistory, removeHistory, clearHistory } from './history'
import PopularAppsList from '../popularAppsList/Index'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
import style from './historyPanel.module.scss'
import headerStyle from '../popularAppsList/index.module.scss'
import { useEffect } from 'react'
const HistoryPanel = ({ onClick, disabled = false, onChange }, ref) => {
  const intl = useIntl()
  const containerRef = useRef(null)
  const popularApps = useSelector((state) => state.app.suggestedApps)
  const [historys, setHistorys] = useState([])
  const { focusIndex, fId, onKeyDown } = useKeyboardFocus({
    count: historys.length,
    direction: 'horizontal',
  })
  // Listen historys change
  useEffect(() => {
    onChange && onChange(historys)
  }, [historys, onChange])

  // Remove search history item
  const onDeleteHistory = useCallback(
    async (e, word) => {
      e.stopPropagation()
      const { list = [] } = await removeHistory(word)
      setHistorys(list)
    },
    [setHistorys]
  )

  // Clear search history
  const onClearHistory = useCallback(async () => {
    await clearHistory()
    setHistorys([])
  }, [setHistorys])

  // Get history list
  const onGetHistorys = useCallback(async () => {
    const { list = [] } = await getHistorys()
    setHistorys(list)
  }, [])

  // Add history item
  const onAddHistory = useCallback(async (word) => {
    const { list = [] } = await addHistory(word)
    setHistorys(list)
  }, [])

  // On click item
  const onClickItem = useCallback(
    (word) => {
      // onAddHistory(word)
      onClick(word)
    },
    [onClick]
  )

  useImperativeHandle(ref, () => {
    return {
      getHistorys: onGetHistorys,
      addHistory: onAddHistory,
      clearHistory: onClearHistory,
      getClientHeight: () => containerRef.current?.clientHeight || 0,
    }
  })
  if (disabled || (historys.length === 0 && popularApps.length === 0)) {
    return null
  }
  const onItemKeyDown = (evt, word) => {
    if (evt.target.nodeName === 'LI') {
      if (evt.keyCode === 13 || evt.keyCode === 32) {
        onClickItem(word)
      }
    }
  }
  return (
    <div className={style.container} ref={containerRef}>
      {historys.length > 0 ? (
        <div className={style.historyContaner}>
          <div className={headerStyle.header} data-focus-block>
            <div className={headerStyle.headerLeft}>
              <SvgIcon className={headerStyle.icon} size={1} icon='clock' />
              <span className={headerStyle.text}>
                {intl.formatMessage({ id: 'searchHistory' })}
              </span>
            </div>
            <button className={headerStyle.headerRight} onClick={onClearHistory}>
              {intl.formatMessage({ id: 'clearHistory' })}
            </button>
          </div>
          <ul className={style.content} role='list' onKeyDown={onKeyDown} data-focus-block>
            {historys.map((word, index) => {
              return (
                <li
                  className={style.contentItem}
                  key={word}
                  onClick={() => onClickItem(word)}
                  role='listitem'
                  tabIndex={focusIndex === index ? 0 : -1}
                  aria-label={word}
                  onKeyDown={(evt) => onItemKeyDown(evt, word)}
                  id={`${fId}-${index}`}
                >
                  <span className={style.historyText}>{word}</span>
                  <button
                    aria-label={intl.formatMessage({ id: 'delete' }) + ' ' + word}
                    className={style.deleteIcon}
                    onClick={(e) => onDeleteHistory(e, word)}
                  >
                    <SvgIcon size={0.5} icon='close' />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
      <PopularAppsList list={popularApps} />
    </div>
  )
}

export default React.forwardRef(HistoryPanel)
