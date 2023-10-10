import React from 'react'
import AspectImage from '../Image/AspectImage'

const Core = ({
  src,
  app,
  imageLayoutRender,
  imgPlaceholderClass,
  // Image
  lazy,
  lazyRoot,
  lazyRootMargin,
  onImageLoad,
  onImageError,

  // dom props
  ...props
}) => {
  return (
    <div className='game-item--body' {...props}>
      {imageLayoutRender && imageLayoutRender({ app })}
      {/* 图片自适应布局 */}
      <AspectImage
        aspectClass={
          typeof imgPlaceholderClass === 'function' ? imgPlaceholderClass(app) : imgPlaceholderClass
        }
        src={src}
        lazy={lazy}
        root={lazyRoot}
        rootMargin={lazyRootMargin}
        onLoad={onImageLoad}
        onError={onImageError}
      />
    </div>
  )
}

export default Core
