import BaseSection from '@/components/section/base/Index';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { FlexLayout } from '@/types/UI/ResponseLayout';
import { Suspense } from 'react';
import GameGridList from './grid/ListPromise';
import GridSkeleton from './grid/Skeleton';
interface GameGridPromiseProps extends FlexLayout {
  promise: Promise<AppListResponse>;
  title: string;
  skeletonCount?: number;
}
export default function GameGridPromise({
  promise,
  title,
  skeletonCount,
  ...flexLayoutValue
}: GameGridPromiseProps) {
  return (
    <BaseSection title={title}>
      <Suspense fallback={<GridSkeleton count={skeletonCount} />}>
        <GameGridList promise={promise} {...flexLayoutValue} />
      </Suspense>
    </BaseSection>
  );
}
