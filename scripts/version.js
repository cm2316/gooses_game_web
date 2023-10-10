const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, '../.env')
const str = fs.readFileSync(filePath, { encoding: 'utf-8' })
const strArray = str.split('\n')
const writeArray = strArray.filter((str) => {
  return !!str && !str.includes('REACT_APP_VERSION')
})

// console.log(process.argv[2])
const env = process.argv[2]
const v = `bsxweb-v0.14.1.1001`
const versionString = `REACT_APP_VERSION=${v}`
writeArray.push(versionString)

const timestampArray = writeArray.filter((str) => {
  return !!str && !str.includes('REACT_APP_STAMP')
})
const stampString = `REACT_APP_STAMP=${new Date().toGMTString()}_${env}`
timestampArray.push(stampString)
fs.writeFileSync(filePath, timestampArray.join('\n'))
