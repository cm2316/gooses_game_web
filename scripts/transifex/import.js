const fs = require('fs')
const Buffer = require('safe-buffer').Buffer
const sdk = require('api')('@transifex/v1.0#knz5r5ldipm7gt')

// maps the locale on transifex to what we have in our strings file
const localesMap = {
  ar: 'ar-EG',
  zh_TW: 'zh-TW',
  // 'zh-Hant': 'zh-CN',
  // nl: 'nl-NL',
  en_US: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  id: 'id-ID',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  // ms: 'ms-MY',
  pl: 'pl-PL',
  pt: 'pt-BR',
  ru: 'ru-RU',
  es: 'es-ES',
  th: 'th-TH',
  tr: 'tr-TR',
  vi: 'vi-VN',
}
function getPostData(locale) {
  return {
    data: {
      attributes: {
        callback_url: null,
        content_encoding: 'text',
        file_type: 'default',
        mode: 'default',
        pseudo: false,
      },
      relationships: {
        language: {
          data: {
            type: 'languages',
            id: 'l:' + locale,
          },
        },
        resource: {
          data: {
            type: 'resources',
            id: 'o:bluestacks-1:p:bluestacks-launcher:r:bstx-web',
          },
        },
      },
      type: 'resource_translations_async_downloads',
    },
  }
}

sdk.auth('1/7fa323ba0d9c5352b56aef1c6769229232ab8a78')

async function getLocaleString(locale) {
  let count = 1
  try {
    console.log('开始发送资源请求-------', locale)
    const { data } = await sdk.postResource_translations_async_downloads(getPostData(locale))
    let response = { status: 'pending' }
    while (response.status !== 200) {
      console.log('开始等待资源....', locale, '---->', count++)
      response =
        await sdk.getResource_translations_async_downloadsResource_translations_async_download_id({
          resource_translations_async_download_id: data.data.id,
          accept: 'application/vnd.api+json',
        })
    }
    const stringsDir = './src/json/i18n/' + localesMap[locale] + '.json'
    console.log('\n📝 资源已准备好，Writing to ' + stringsDir)

    const result = response.data
    return new Promise((resolve, reject) => {
      fs.open(stringsDir, 'w', (err, fd) => {
        if (err) throw err
        let buffer = new Buffer(JSON.stringify(result, null, 2))
        fs.write(fd, buffer, 0, buffer.length, null, (err) => {
          if (err) throw err
          console.log(locale, ':', '👍 Done!')
          resolve()
        })
      })
    })
  } catch (error) {
    console.error(locale, '加载错误！！！', error)
  }
}

async function fetchStrings() {
  const allLocales = Object.keys(localesMap)
  const allPromise = []
  for (let locale of allLocales) {
    allPromise.push(getLocaleString(locale))
  }
  await Promise.all(allPromise)

  console.log('😘🎉🎉🎉 All Done!')
}

fetchStrings()
