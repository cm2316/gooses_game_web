import React from 'react'
import { Link } from 'react-router-dom'

const RouteLink = (props) => {
  return (
    <Link
      {...props}
      onDragStart={(e) => {
        e.preventDefault()
      }}
    />
  )
}
export default RouteLink
