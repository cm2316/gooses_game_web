import React, { useEffect, useState, useTransition } from 'react'
import { useRef } from 'react'

const DelayLoad = ({ children }) => {
  const [childrens, setChildrens] = useState([])
  const [isPending, startTransition] = useTransition()
  const childrenRef = useRef([])
  const countRef = useRef(0)
  useEffect(() => {
    childrenRef.current = React.Children.toArray(children)
  }, [children])
  useEffect(() => {
    const childrensValue = childrenRef.current
    if (!isPending && countRef.current < childrensValue.length) {
      startTransition(() => {
        setChildrens(childrensValue.slice(0, countRef.current))
        countRef.current++
      })
    }
  }, [isPending])
  return childrens
}

export default DelayLoad
