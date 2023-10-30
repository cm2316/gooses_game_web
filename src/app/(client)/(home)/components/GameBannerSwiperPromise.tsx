'use client';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { Suspense } from 'react';
import GameBannerSwiper from './swiper/ListPromise';
import GameBannerSwiperSkeleton from './swiper/Skeleton';
export interface HomeGameBannerProps {
  promise: Promise<AppListResponse>;
}

export default function HomeGameBanner({ promise }: HomeGameBannerProps) {
  return (
    <Suspense fallback={<GameBannerSwiperSkeleton />}>
      <GameBannerSwiper promise={promise} />
    </Suspense>
  );
}
