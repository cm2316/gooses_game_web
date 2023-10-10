import React, { useContext, useState, useEffect } from 'react'

const ViewportContext = React.createContext({})

const getGridCount = (width = window.innerWidth) => {
  return Math.max(Math.ceil(width / 250), 1)
}

export const getPxByBasePx = (len) => {
  return window?.usePxToPx(len) || len
}

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const onWindowResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', onWindowResize, false)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  return <ViewportContext.Provider value={{ width, height }}>{children}</ViewportContext.Provider>
}
export const usePxToPx = (len) => {
  const { width } = useContext(ViewportContext)
  const [length, setLength] = useState(len)
  useEffect(() => {
    setLength(getPxByBasePx(len))
  }, [width, len])
  return length
}

export const useGridBaseCount = () => {
  const [baseCount, setBaseCount] = useState(getGridCount())
  const { width } = useContext(ViewportContext)
  useEffect(() => {
    const count = getGridCount(width)
    setBaseCount(count)
  }, [width])
  return baseCount
}
const Hook = () => {
  const { width, height } = useContext(ViewportContext)
  return { width, height }
}
export default Hook
