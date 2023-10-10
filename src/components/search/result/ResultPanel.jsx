import React, { useImperativeHandle, useState, useRef, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import ResultItem from './ResultItem'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import Loading from '@/images/search/loading.svg'
import style from './resultPanel.module.scss'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
const ResultPanel = ({ disabled = false, query, onChange, onJudgeToSearchPage }, ref) => {
  const intl = useIntl()
  const containerRef = useRef(null)
  const [list, setList] = useState([])

  const { focusIndex, fId, onKeyDown } = useKeyboardFocus({
    count: list.length,
    direction: 'vertical',
  })

  // Fetch search result
  const postQueryResult = useMutation((query) => Promise.resolve([]))
  // console.log(postQueryResult.isIdle)
  // Listen list change
  useEffect(() => {
    onChange && onChange()
  }, [postQueryResult.isLoading, onChange, list.length])

  // Trigger to fetch search result
  const onStartQuery = async (word) => {
    const result = await postQueryResult.mutateAsync(word)
    setList(result)
  }

  // Clicked on view all games button
  const onViewAllGamesClick = (evt) => {
    evt.stopPropagation()
    onJudgeToSearchPage(query)
  }

  useImperativeHandle(ref, () => {
    return {
      startQuery: onStartQuery,
      getClientHeight: () => containerRef.current?.clientHeight || 0,
    }
  })

  if (disabled) {
    return null
  }
  return (
    <div className={style.container} ref={containerRef}>
      {postQueryResult.isLoading ? (
        <>
          <div className={style.loadingContainer}>
            {/* <SvgIcon size={1} icon="loading" /> */}
            <img className={style.loadingIcon} src={Loading} alt='Search loading' />
            <span>{intl.formatMessage({ id: 'searching' })}</span>
          </div>
        </>
      ) : (
        <>
          {list.length === 0 && (
            <div className={style.emptyContainer}>
              <SvgIcon className={style.emptyContainerIcon} size={1} icon='search-no-results' />
              <span className={style.emptyContainerText}>
                {intl.formatMessage({ id: 'noResultsFound' })}
              </span>
            </div>
          )}
          <ul className={style.content} role='list' onKeyDown={onKeyDown} data-focus-block>
            {list.map((app, index) => {
              return (
                <ResultItem
                  as='li'
                  key={app.package_name}
                  app={app}
                  keyword={query}
                  tabIndex={focusIndex === index ? 0 : -1}
                  id={`${fId}-${index}`}
                />
              )
            })}
          </ul>
          {list.length > 0 ? (
            <div className={style.footer} data-focus-block>
              <button className={style.footerAlert} onClick={onViewAllGamesClick} tabIndex={0}>
                <span>{intl.formatMessage({ id: 'viewAllGamesWithQuery' }, { query })}</span>
                <SvgIcon className={style.footerIcon} size={1} icon='arrow-line-right' />
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default React.forwardRef(ResultPanel)
