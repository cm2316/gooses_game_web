import React from 'react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './base_desc.scss'

const BaseDesc = ({ className, actionCount = 2 }) => {
  return (
    <div className={classNames(['skeleton_baseDesc', className])}>
      <div className='skeleton_baseDescWrap'>
        <div className='skeleton_baseDescSubTitle'>
          <Skeleton height='100%' />
        </div>
        <div className='skeleton_baseDescTitle'>
          <Skeleton height='100%' />
        </div>
      </div>
      <div className='skeleton_baseDescActions'>
        {Array.from({ length: actionCount }).map((_, index) => (
          <Skeleton key={index} height='100%' />
        ))}
      </div>
    </div>
  )
}

export default BaseDesc
