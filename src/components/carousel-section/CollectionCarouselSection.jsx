/**
 * Game center browse by collection module
 */

import React from 'react'
import CollectionItem from '@/components/common/Collection/Item'
import bgColorList from '@/components/common/Collection/bgColor'
import SkeletonCollection from '@/skeletons/Collection'
import CommonCarouselSection from './CommonCarouselSection'
import './collectionCarouselSection.scss'

const Collections = ({ className, titleId, columns = 7, list, isLoading }) => {
  return list.length ? (
    <CommonCarouselSection
      linkTo={{
        pathname: '/collections',
      }}
      carouselKeyId={titleId}
      list={list}
      className={['collectionCarouselSection', className]}
      titleId={titleId}
      slidesPerView={list.length < columns ? list.length : columns}
      pagination={true}
      keyId='topic_name'
      isGroup={false}
    >
      {(item, { index, focusIndex }) => {
        return (
          <CollectionItem
            id={`${titleId}-${index}-0`}
            topic={item}
            style={bgColorList[index % bgColorList.length]}
            tabIndex={focusIndex[0] === index ? 0 : -1}
          />
        )
      }}
    </CommonCarouselSection>
  ) : (
    <SkeletonCollection column={columns} titleId={titleId} enable={isLoading} />
  )
}

export default React.memo(Collections)
