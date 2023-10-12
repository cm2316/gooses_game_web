import React, { useState, useEffect, useTransition } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import useKeyboardFocus from '@/hook/useKeyboardFocus'
import Tag from '@/components/common/tag/Index'
import styles from './index.module.scss'
import SkeletionsTag from '@/skeletons/tag/Index'
import useNarrorClick from '@/hook/useNarrorClick'
const Categorys = ({ className }) => {
  const intl = useIntl()
  const [style, setStyle] = useState({})
  const startTransition = useTransition()[1]
  const categorys = []
  const loadingStore = useSelector((state) => state.loading)
  const { focusIndex, fId, onKeyDown } = useKeyboardFocus({
    count: categorys.length,
    direction: 'horizontal',
  })
  const navigate = useNavigate()
  const onItemClick = (category) => {
    const title = intl.formatMessage({ id: 'subHeadingCategory' }, { category: category.title })
    navigate({
      pathname: '/category',
      search: `topicId=${category.title}&title=${title}`,
    })
  }
  useEffect(() => {
    requestIdleCallback(() => {
      startTransition(() => {
        setStyle({
          backgroundImage: `radial-gradient(24.52% 46.74% at 50.33% 47.92%, rgba(81, 165, 201, 0.2) 0%, rgba(79, 165, 201, 0) 100%),
        radial-gradient(21.19% 36.37% at 63.08% 56.52%, rgba(179, 214, 97, 0.2) 0%, rgba(179, 214, 97, 0) 100%),
        radial-gradient(22.34% 37.44% at 32.98% 55.76%, rgba(255, 66, 165, 0.2) 0%, rgba(255, 66, 165, 0) 100%)`,
        })
      })
    })
  }, [])
  return (
    <section className={classNames([styles.container, className])} style={style}>
      <header className={styles.header}>
        <FormattedMessage id='discoverYourFavoriteGamingGenre' />
      </header>
      <div className={styles.content} onKeyDown={onKeyDown} data-focus-block>
        {categorys.length > 0 ? (
          categorys.map((category, index) => {
            const tabIndex = focusIndex === index ? 0 : -1
            const tabId = `${fId}-${index}`
            const narrorProps = useNarrorClick(() => onItemClick(category))
            return (
              <Tag
                key={category.title}
                tag={category}
                tabIndex={tabIndex}
                id={tabId}
                {...narrorProps}
              />
            )
          })
        ) : (
          <SkeletionsTag count={10} enable={loadingStore.cloudGameLoading} />
        )}
      </div>
    </section>
  )
}

export default Categorys
