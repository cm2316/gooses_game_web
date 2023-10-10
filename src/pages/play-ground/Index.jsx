import React from 'react'
import { useParams } from 'react-router'
import InitData from '@/components/setup/InitData'
import PlayGroundHeader from './header/Index'
import PlayGroundFooter from './footer/Index'

import './index.scss'
const PlayGround = () => {
  const params = useParams()

  return (
    <div className='playGround-container flex column'>
      <InitData />
      <PlayGroundHeader className='playGround--header' />
      <div className='playGround--body'>
        <iframe
          sandbox='allow-scripts allow-popups allow-same-origin allow-pointer-lock'
          allow='clipboard-write'
          src='https://playzool.com/games/bricksBreaker/?fromPartner=nowgg&amp;utm_source=nowgg&amp;utm_medium=iframe&amp;utm_campaign=nowgg'
          allowFullScreen={true}
        ></iframe>
      </div>
      <PlayGroundFooter className='playGround--footer' />
    </div>
  )
}

export default PlayGround
