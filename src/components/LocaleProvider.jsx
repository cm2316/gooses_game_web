import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { setLanguage, DefaultLangValue } from '@/reducers/system/actions'
import messages_en from '../json/i18n/en-US.json'
import { off, on } from '@/tool/EE'

// Load font
const loadFont = async (name, path, options = {}, applyFont = true) => {
  const fontList = [...document.fonts]
  const loadPath = `${process.env.PUBLIC_URL || '/'}fonts/${path}`
  try {
    const isExist = fontList.find((font) => font.family === name)
    if (!isExist) {
      const font = new FontFace(name, `url(${loadPath})`, {
        style: 'normal',
        display: 'swap',
        ...options,
      })
      await font.load()
      document.fonts.add(font)
      console.log(process.env.PUBLIC_URL, 'process.env.PUBLIC_URL', `url(${loadPath})`)
    }
    if (applyFont) {
      document.body.style.fontFamily = name
    }
  } catch (error) {
    console.error(error, loadPath)
  }
}

// Load messages by language
async function loadI18N(languages) {
  let messages = {}
  let isOk = false
  let language = languages.shift()
  while (language && !isOk) {
    try {
      messages = require(`../json/i18n/${language}.json`)
      isOk = true
    } catch (error) {
      const nextLanguage = languages.shift()
      console.log(`${language}:Failed to load language pack,switch to language ${nextLanguage}`)
      language = nextLanguage
    }
  }
  return { language, messages }
}

const Hook = ({ children }) => {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.system.language)
  const [messages, setMessages] = useState(messages_en)
  // On switch language listener
  const onUpdateLanguage = async ({ language, defaultLanguage }) => {
    try {
      const loadLanguage = await loadI18N(
        [language, defaultLanguage, DefaultLangValue].filter(Boolean)
      )
      dispatch(setLanguage(loadLanguage.language))
      setMessages(loadLanguage.messages)
    } catch (error) {
      /* empty */
    }
    document.documentElement.setAttribute('lang', language)
  }

  const loadInitConfig = () => {
    onUpdateLanguage({ defaultLanguage: DefaultLangValue, language: language })
    loadFont('rubik', 'rubik-regular.woff2')
    loadFont('rubik', 'rubik-medium.woff2', { weight: 500 })
  }
  // Register language change
  useEffect(() => {
    loadInitConfig()
    on('onLanguageChange', onUpdateLanguage)
    return () => {
      off('onLanguageChange', onUpdateLanguage)
    }
  }, [])
  return (
    <IntlProvider locale={language} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default Hook
