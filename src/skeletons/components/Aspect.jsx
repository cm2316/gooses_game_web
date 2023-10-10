import classNames from 'classnames'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './aspect.scss'
const Aspect = ({ className, aspectClass = 'ratio-1-1' }) => {
  return (
    <div
      className={classNames(['responsive-container', 'skeleton_aspect', aspectClass, className])}
    >
      <div className={classNames(['skeleton_aspectInner', 'defaultImge'])}>
        <Skeleton height='100%' baseColor='transparent' />
      </div>
    </div>
  )
}

export default Aspect
