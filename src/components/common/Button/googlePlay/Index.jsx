import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Button from '../Button'
import googlePlayIcon from '../assets/google.svg'
import style from './index.module.scss'

const GooglePlayButton = ({ className, children, ...props }) => {
  return (
    <Button className={classNames([style.container, className])} type='primary' {...props}>
      {children ? (
        children
      ) : (
        <div className={style.inner}>
          <img src={googlePlayIcon} alt='Search in google play' />
          <FormattedMessage id='searchInGooglePlay' />
        </div>
      )}
    </Button>
  )
}

export default GooglePlayButton
