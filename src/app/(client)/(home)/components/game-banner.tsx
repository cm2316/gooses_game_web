'use client';
import { AppItem } from '@/services/apps/types/AppItem';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
export interface HomeGameBannerProps {
  apps: AppItem[];
}

function AppSlider({ app }: { app: AppItem }) {
  const router = useRouter();
  function goPlay() {
    router.push(`/player/${app.id}`);
  }
  return (
    <div
      className="h-96 rounded-lg bg-no-repeat bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${app.banner})` }}
    >
      <div className="h-full flex items-end p-9 bg-gradient-to-t from-black/90 from-0% via-black/20 via-40% to-black/0 to-50% bg-center">
        <div className="flex gap-8 text-slate-100">
          <Image src={app.icon} width={150} height={150} alt="" className="rounded" />
          <div className="flex flex-col gap-2 justify-end">
            <h1 className="text-2xl font-medium">{app.appName}</h1>
            <Link
              className="text-lg text-white/80 hover:underline hover:text-white/80"
              href={`/games/${app.category}`}
            >
              {app.category}
            </Link>
            <Button type="primary" size="large" onClick={goPlay}>
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function HomeGameBanner(props: HomeGameBannerProps) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <Swiper
        autoplay={{ delay: 5000 }}
        initialSlide={2}
        breakpoints={{
          640: {
            slidesPerView: 1.4,
            spaceBetween: 20,
          },
        }}
        loop
        pagination={{ enabled: true }}
        navigation={{ nextEl: '.game-banner--next', prevEl: '.game-banner--prev' }}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides
        modules={[Autoplay, Navigation]}
      >
        {props.apps.map((app) => {
          return (
            <SwiperSlide key={app.id}>
              <AppSlider app={app} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute top-1/2 -translate-y-1/2 w-full hidden sm:flex justify-between items-center z-10 px-8">
        <span className="game-banner--prev text-purple-400 hover:text-white cursor-pointer flex justify-center items-center w-12 h-12 rounded-full border border-purple-400 bg-purple-200 hover:bg-purple-500 hover:border-purple-800">
          <LeftOutlined />
        </span>
        <span className="game-banner--next text-purple-400 hover:text-white cursor-pointer flex justify-center items-center w-12 h-12 rounded-full border border-purple-400 bg-purple-200 hover:bg-purple-500 hover:border-purple-800">
          <RightOutlined />
        </span>
      </div>
    </div>
  );
}
