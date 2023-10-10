import React from 'react'
import HelpTip from './HelpTip'
// import errorImg from '../../../images/noResults.svg'

const CommonHelpTip = ({ textValue, className, textTitle, extra, values, imgSrc, localSvg }) => {
  return (
    <HelpTip
      textTitle={textTitle}
      textValue={textValue}
      src={imgSrc}
      className={className}
      extra={extra}
      values={values}
      localSvg={localSvg}
    />
  )
}

export default CommonHelpTip
