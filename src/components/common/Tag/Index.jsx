import React, { useState } from 'react'
import classNames from 'classnames'
import AspectImage from '@/components/common/Image/AspectImage'
import './index.scss'
const Tag = ({ tag, ...props }) => {
  const [isLoad, setIsLoaded] = useState(false)
  return (
    <div className={classNames(['tag-container'])} {...props}>
      <div className='tag-inner'>
        <div className={classNames(['tag-logo', { ['tag-logo--loaded']: isLoad }])}>
          <AspectImage aspectClass='ratio-1-1' src={tag.icon} onLoad={() => setIsLoaded(true)} />
        </div>
        <span className='tag-title'>{tag.title}</span>
      </div>
    </div>
  )
}

export default Tag
