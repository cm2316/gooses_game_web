import classNames from 'classnames'
import React from 'react'
import FormattedText from '../FormattedText/Index'
import style from './index.module.scss'
const HelpTip = ({
  textValue,
  src,
  alt = '',
  className,
  textTitle,
  extra,
  values,
  localSvg = false,
}) => {
  return (
    <div className={classNames([style.container, className])}>
      <div className={style.containerInner}>
        {src && (
          <div className={style.content}>
            {localSvg ? (
              <svg className={style.srcElement}>
                <use xlinkHref={`#bsx-${src}`}></use>
              </svg>
            ) : (
              <img src={src} alt={alt} className={style.srcElement} />
            )}
          </div>
        )}
        <FormattedText className={style.title} id={textTitle} values={values} />
        <FormattedText className={style.label} id={textValue} values={values} />
        {extra && extra()}
      </div>
    </div>
  )
}

export default HelpTip
