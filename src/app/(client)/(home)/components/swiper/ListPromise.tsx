import { AppListResponse } from '@/services/apps/types/ListResponse';
import GameSwiperList from './List';
export interface GameSwiperListPromiseProps {
  promise: Promise<AppListResponse>;
}

export default async function GameSwiperListPromise({ promise }: GameSwiperListPromiseProps) {
  const { data: apps } = await promise;
  return <GameSwiperList apps={apps.data} />;
}
