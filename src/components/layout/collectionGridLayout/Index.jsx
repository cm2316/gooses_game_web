/**
 * List all topics for browse by collection
 */

import React from 'react'
import CollectionItem from '@/components/common/Collection/Item'
import bgColorList from '@/components/common/Collection/bgColor'
import KeyBoardCollectionGridLayout from '@/components/layout/gridLayout/KeyboardGridLayout'
const CollectionList = ({ ...gridLayoutProps }) => {
  return (
    <KeyBoardCollectionGridLayout {...gridLayoutProps} keyId='topic_name' scrollLoad={false}>
      {({ tabIndex, tabId, gridItem, index }) => {
        return (
          <CollectionItem
            style={bgColorList[index % bgColorList.length]}
            id={tabId}
            tabIndex={tabIndex}
            topic={gridItem}
          />
        )
      }}
    </KeyBoardCollectionGridLayout>
  )
}

export default CollectionList
