export const getPublicAssetsRoot = () => {
  return `${process.env.PUBLIC_URL || '/'}assets/}`
}

export const getPublicAssetPath = (path) => {
  return `${getPublicAssetsRoot()}/${path}`
}

export const getSrcAssetRealPath = (path, errorPath = 'common/logo.svg') => {
  try {
    return require(`../assets/${path}`)
  } catch {
    return require(`../assets/${errorPath}`)
  }
}
