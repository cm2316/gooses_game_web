import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
const SplitLine = ({ className, text, position = 'center' }) => {
  return (
    <div
      className={classNames([styles.container, styles[position], className])}
      aria-hidden='false'
    >
      <span>{text}</span>
    </div>
  )
}

export default SplitLine
