import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
const Wrap = ({ children, enable = true, skeletonOptions = {} }) => {
  if (!enable) {
    return null
  }
  return (
    <SkeletonTheme
      borderRadius={8}
      baseColor='#00000080'
      highlightColor='#04040480'
      {...skeletonOptions}
    >
      {children}
    </SkeletonTheme>
  )
}

export default Wrap
