import React from 'react'
import classNames from 'classnames'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import Item from './Item'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
import style from './index.module.scss'
const RecentSearch = ({ className, gridCount }) => {
  const intl = useIntl()
  const apps = useSelector((state) => state.app.suggestedApps)
  const { focusIndex, fId, onKeyDown } = useKeyboardFocus({
    count: apps.length,
    direction: 'horizontal',
  })
  return (
    <div className={classNames([style.container, className])} data-focus-block>
      <div className={style.header}>{intl.formatMessage({ id: 'recentSearch' })}</div>
      <div className={style.content}>
        <div className={style.contentWrap} onKeyDown={onKeyDown}>
          {apps.slice(0, gridCount - 1).map((app, index) => {
            return (
              <Item
                app={app}
                key={app.package_name}
                tabIndex={focusIndex === index ? 0 : -1}
                id={`${fId}-${index}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RecentSearch
