import React from 'react'
import HomeBanner from './components/banner/Index'
import { useGridBaseCount } from '@/hook/useViewport'
// import Categorys from './components/categorys/Index'

import './index.scss'
// 记录页面的状态
const Home = () => {
  // 云游戏
  const gridCount = useGridBaseCount()

  return (
    <div className='home-container'>
      <HomeBanner gridCount={gridCount} className=' margin-bottom-50' />
      {/* category */}
      {/* <Categorys /> */}
      {/* <div className='margin-bottom-30'></div> */}
    </div>
  )
}

export default Home
