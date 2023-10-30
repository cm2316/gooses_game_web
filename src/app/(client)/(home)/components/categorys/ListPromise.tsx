import { BaseResponse } from '@/types/BaseResponse';
import GameCategorysList from './List';
export interface GameCategorysPromiseProps {
  promise: Promise<BaseResponse<string[]>>;
}
export default async function GameCategorysPromise({ promise }: GameCategorysPromiseProps) {
  const { data: categorys } = await promise;
  return <GameCategorysList categorys={categorys} />;
}
