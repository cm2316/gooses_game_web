import React from 'react'
import { useIntl } from 'react-intl'
import ResultItem from '../result/ResultItem'
import SvgIcon from '@/components/common/svg-icon/Index'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
import style from './index.module.scss'
const PopularAppsList = ({ list }) => {
  const intl = useIntl()
  const { focusIndex, fId, onKeyDown } = useKeyboardFocus({
    count: list.length,
    direction: 'vertical',
  })
  return list.length > 0 ? (
    <div className={style.popularGameContainer} data-focus-block>
      <div className={style.header}>
        <div className={style.headerLeft}>
          <SvgIcon className={style.icon} size={1} icon='hot-stroke' />
          <span className={style.text}>{intl.formatMessage({ id: 'mostPopularGames' })}</span>
        </div>
      </div>
      <ul className={style.content} onKeyDown={onKeyDown}>
        {list.slice(0, 7).map((app, index) => {
          return (
            <ResultItem
              as='li'
              key={app.package_name}
              app={app}
              tabIndex={focusIndex === index ? 0 : -1}
              id={`${fId}-${index}`}
            />
          )
        })}
      </ul>
    </div>
  ) : null
}

export default PopularAppsList
