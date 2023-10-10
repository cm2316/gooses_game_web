import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './item.module.scss'
const CollectionItem = ({ topic, ...props }) => {
  const navigate = useNavigate()

  const onItemClick = (topic) => {
    navigate({
      pathname: '/byTopicApps',
      search: `topicId=${topic.id}`,
    })
  }
  return (
    <button className={style.container} onClick={() => onItemClick(topic)} {...props}>
      {topic.topic_name}
    </button>
  )
}

export default CollectionItem
