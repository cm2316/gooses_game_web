import AspectGrid from '@/components/grid/AspectGrid';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { FlexLayout } from '@/types/UI/ResponseLayout';
export interface GameGridListPromiseProps extends FlexLayout {
  promise: Promise<AppListResponse>;
}
export default async function GameGridListPromise({
  promise,
  ...flexLayoutValue
}: GameGridListPromiseProps) {
  const { data: gameList } = await promise;
  return <AspectGrid apps={gameList.data || []} {...flexLayoutValue} />;
}
