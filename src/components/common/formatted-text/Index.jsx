import React from 'react'
import { FormattedMessage } from 'react-intl'

const FormattedText = ({ className, onClick, title, ...formatOptions }) => {
  return (
    <span className={className} onClick={onClick}>
      {title || (formatOptions.id && <FormattedMessage {...formatOptions} />)}
    </span>
  )
}

export default FormattedText
