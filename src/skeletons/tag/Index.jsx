import React from 'react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Wrap from '../Wrap'

import './index.scss'
import { useMemo } from 'react'
const widthArr = [17, 24, 29, 16, 20, 29, 30, 17, 22, 26]
const CloudGameCategory = ({ className, count = 2, enable = false }) => {
  const widths = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      return {
        id: index,
        w: widthArr[index % count], //Math.ceil(Math.random() * 15) + 15
      }
    })
  }, [count])
  return (
    <Wrap disabled={enable}>
      <div className={classNames(['skeleton_cloudGameCategory', className])}>
        {widths.map((width) => {
          return (
            <div
              className='skeleton_cloudGameCategory-item'
              key={width.id}
              style={{ width: `${width.w}%` }}
            >
              <Skeleton height='100%' />
            </div>
          )
        })}
      </div>
    </Wrap>
  )
}

export default CloudGameCategory
