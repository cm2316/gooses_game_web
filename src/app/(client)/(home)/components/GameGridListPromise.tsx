import BaseSection from '@/components/section/base/Index';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { FlexLayout } from '@/types/UI/ResponseLayout';
import classNames from 'classnames';
import { Suspense } from 'react';
import GameGridList from './grid/ListPromise';
import GridSkeleton from './grid/Skeleton';
interface GameGridPromiseProps extends FlexLayout {
  promise: Promise<AppListResponse>;
  title: string;
  skeletonCount?: number;
  className?: classNames.Argument;
}
export default function GameGridPromise({
  promise,
  title,
  skeletonCount,
  className,
  ...flexLayoutValue
}: GameGridPromiseProps) {
  return (
    <BaseSection title={title} className={className}>
      <Suspense fallback={<GridSkeleton count={skeletonCount} {...flexLayoutValue} />}>
        <GameGridList promise={promise} {...flexLayoutValue} />
      </Suspense>
    </BaseSection>
  );
}
