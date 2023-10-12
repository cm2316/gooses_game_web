import React from 'react'
import languages from './languages'
import { emit } from '@/tool/EE'
import './index.scss'
import classNames from 'classnames'
const LanguageSwitch = ({ className, language, onChange }) => {
  const _onChange = (evt) => {
    emit('onLanguageChange', { defaultLanguage: language, language: evt.target.value })
    onChange && onChange(evt)
  }
  return (
    <select
      className={classNames(['language-switch', className])}
      defaultValue={language}
      onChange={_onChange}
    >
      {languages.map((lang) => {
        return (
          <option value={lang.value} key={lang.value}>
            {lang.label}
          </option>
        )
      })}
    </select>
  )
}

export default LanguageSwitch
