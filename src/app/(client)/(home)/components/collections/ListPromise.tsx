import { BaseResponse } from '@/types/BaseResponse';
import GameCollectionsList from './List';
export interface GameCollectionsPromiseProps {
  promise: Promise<BaseResponse<string[]>>;
}
export default async function GameCollectionsPromise({ promise }: GameCollectionsPromiseProps) {
  const { data: collections } = await promise;
  return <GameCollectionsList collections={collections} />;
}
