import React from 'react'
import { useSelector } from 'react-redux'
import HomeBanner from './components/banner/Index'
import { useGridBaseCount } from '@/hook/useViewport'
// import Categorys from './components/categorys/Index'
import GameSwiper from './components/swiper/Index'
import SectionCarousel from '@/components/AdvertisementSection/SectionCarousel'

import './index.scss'
// 记录页面的状态
const Home = () => {
  // 云游戏
  const gridCount = useGridBaseCount()
  const apps = useSelector((state) => state.app.html5) || []
  return (
    <div className='home-container'>
      {/* <GameSwiper /> */}
      <SectionCarousel list={apps} className='margin-bottom-30' />
      <HomeBanner gridCount={gridCount} className=' margin-bottom-50' />
      {/* category */}
      {/* <Categorys /> */}
      {/* <div className='margin-bottom-30'></div> */}
    </div>
  )
}

export default Home
