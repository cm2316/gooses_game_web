import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import googlePlayIcon from '../assets/google.svg'
import style from './index.module.scss'

const GooglePlayButtonLight = ({ className, children, ...props }) => {
  return (
    <button className={classNames([style.container, className])} {...props}>
      {children ? (
        children
      ) : (
        <div className={style.inner}>
          <img src={googlePlayIcon} alt='Search in google play' />
          <span>
            <FormattedMessage id='openGooglePlayApp' />
          </span>
        </div>
      )}
    </button>
  )
}

export default GooglePlayButtonLight
