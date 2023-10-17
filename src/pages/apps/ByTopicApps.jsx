/**
 * Fetch game list by topicId(will cached by topicId in redux)
 */
import React, { useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@/components/common/button/Index'
import GamePageHeader from '@/components/common/heading/category-bar/Index'
import GameVirsualLayout from '@/components/layout/virsual-app-grid-layout/Index'
import FormattedText from '@/components/common/formatted-text/Index'
import { setTopicApps } from '@/reducers/app/actions'
import { getTopicInfo } from '@/apis/apps'
import SkeletonAppList from '@/skeletons/AppList'
import { useGridBaseCount } from '@/hook/useViewport'
import BaseTagList from '@/components/common/tag/base-tag/List'
import BaseTag from '@/components/common/tag/base-tag/Index'
import SvgIcon from '@/components/common/svg-icon/Index'
import { useClose as useTriggerTagClose } from '@/components/common/tag/base-tag/useTrigger'
import './index.scss'
const topicTypeIntlString = (count, type = 'game') => {
  if (type === 'game') {
    return count === 1 ? 'subHeadingGameCountForSingle' : 'subHeadingGameCount'
  }
  return count === 1 ? 'subHeadingAppCountForSingle' : 'subHeadingAppCount'
}
const ByTopicApps = () => {
  const baseTagListRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const topicId = searchParams.get('topicId')
  const topics = useSelector((state) => state.app.topics)
  const narratorMode = useSelector((state) => state.system.narratorMode)
  // Get topic games from redux
  const topicInfo = useSelector((state) => state.app.topicAppsMap[topicId])
  const apps = topicInfo?.apps || []

  const currentTopic = topicInfo?.info || { topic_name: '', apps_count: 0, id: topicId }

  const gridCount = useGridBaseCount()
  // Fetch game list
  const { refetch, isFetching, isFetched } = useQuery(
    ['getTopicInfo', topicId],
    () => getTopicInfo({ topic_id: topicId }),
    {
      enabled: !!topicId && apps.length === 0,
      onSuccess: (data) => {
        dispatch(setTopicApps({ data: data.result || {}, topicId }))
      },
    }
  )

  // Clicked on tag event
  const onClickTag = (item) => {
    if (item.id !== topicId) {
      baseTagListRef.current?.close()
      navigate(
        {
          search: `?topicId=${item.id}`,
        },
        {
          replace: true,
        }
      )
    }
  }

  const appCount = apps.length

  const titleJSX = (
    <GamePageHeader
      onBack={() => {
        navigate(-1)
      }}
      className={['breakScreen', { 'margin-bottom-35': true }]}
      headerRightRender={
        <>
          {currentTopic.topic_name ? (
            <FormattedText
              className='gameTitle'
              id='topTopic'
              values={{ topic: currentTopic.topic_name }}
            />
          ) : (
            <FormattedText
              className='gameTitle'
              id='subHeadingCategory'
              values={{ category: currentTopic.topic_name }}
            />
          )}
          <FormattedText
            className='gameCount'
            id={topicTypeIntlString(appCount)}
            values={{ count: appCount }}
          />
        </>
      }
      contentSlotRender={
        <BaseTagList list={topics} ref={baseTagListRef} narratorMode={narratorMode}>
          {({ item, ...props }) => {
            return (
              <BaseTag
                key={item.topic_name}
                className={item.id === topicId ? 'active' : ''}
                onClick={() => onClickTag(item)}
                {...props}
              >
                {item.topic_name}
              </BaseTag>
            )
          }}
        </BaseTagList>
      }
    />
  )
  useTriggerTagClose('.virsualLayout-content')
  return (
    <GameVirsualLayout
      overscrollBehavior='none'
      gameItemProps={{
        imgPlaceholderClass: 'ratio-1-1',
        showPlayBtn: true,
        showCloudBtn: true,
        showInstalledState: true,
        imageLayoutRender: ({ app }) => {
          return (
            <div className='gameStar-container'>
              <span>{app.level / 2}</span>
              <SvgIcon size={1} icon='star' />
            </div>
          )
        },
      }}
      list={apps}
      contentInnerClass={['breakScreen', 'margin-bottom-30']}
      columns={gridCount}
      headerRender={titleJSX}
      className='byTopicApps-container'
      prefix={(list) => {
        if (list.length === 0) {
          if (isFetched) {
            return (
              <Button type='primary' onClick={refetch} className='refreshButton'>
                <FormattedMessage id='refresh' />
              </Button>
            )
          }
          if (isFetching) {
            return (
              <SkeletonAppList
                className={['breakScreen', 'margin-bottom-30']}
                imgPlaceholderClass='ratio-1-1'
                headerRender={() => null}
                column={gridCount}
                row={2}
                enable={true}
              />
            )
          }
        }
      }}
    />
  )
}

export default ByTopicApps
