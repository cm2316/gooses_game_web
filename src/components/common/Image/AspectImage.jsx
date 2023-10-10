import React from 'react'
import Image from '@/components/common/Image/Image'
import AspectContainer from '@/components/common/AspectContainer/Index'

const AspectImage = ({ aspectClass, className, children, ...props }) => {
  return (
    <AspectContainer className={className} aspectClass={aspectClass}>
      <Image {...props} />
      {children}
    </AspectContainer>
  )
}

export default AspectImage
