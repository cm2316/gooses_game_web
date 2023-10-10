/**
 * Game center browse by collection module
 */

import React from 'react'
import { useSelector } from 'react-redux'
import BaseTagList from '@/components/common/Tag/baseTag/List'
import BaseTag from '@/components/common/Tag/baseTag/Index'
import AspectImage from '@/components/common/Image/AspectImage'
import classNames from 'classnames'
import iconMap from './iconMap'
import './index.scss'

const Categorys = ({ list, className, onClickTag, narratorMode }) => {
  const oem = useSelector((state) => state.system.oem)
  if (list.length === 0) {
    return null
  }
  return (
    <div className={classNames(['category-container', className])} data-focus-block>
      <BaseTagList list={list} className='category-tag-list' narratorMode={narratorMode}>
        {({ item, ...props }) => {
          const icon = iconMap[item.id]
          return (
            <BaseTag
              key={item.topic_name}
              onClick={() => onClickTag(item)}
              className='category-tag-item'
              {...props}
            >
              {item.topic_name}
            </BaseTag>
          )
        }}
      </BaseTagList>
    </div>
  )
}

export default Categorys
