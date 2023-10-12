import classNames from 'classnames'
import React from 'react'
import useNarrorClick from '@/hook/useNarrorClick'
import './tag.scss'

const BaseTag = ({ className, children, ...props }, ref) => {
  const onNarrowEvent = useNarrorClick(props.onClick)
  return (
    <div
      className={classNames(['baseTag-container', className])}
      ref={ref}
      {...props}
      {...onNarrowEvent}
    >
      {children}
    </div>
  )
}

export default React.forwardRef(BaseTag)
