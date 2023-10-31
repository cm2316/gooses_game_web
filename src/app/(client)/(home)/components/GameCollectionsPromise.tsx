import BaseSection from '@/components/section/base/Index';
import AppService from '@/services/apps/service';
import classNames from 'classnames';
import { Suspense } from 'react';
import GameCollections from './collections/ListPromise';
import CollectionSkeleton from './collections/Skeleton';
interface GameCollectionsPromiseProps {
  className?: classNames.Argument;
  title: string;
}
export default function GameCollectionsPromise({ className, title }: GameCollectionsPromiseProps) {
  const promise = AppService.getCollectionsMemo();
  return (
    <BaseSection title={title} className={className}>
      <Suspense fallback={<CollectionSkeleton count={12} />}>
        <GameCollections promise={promise} />
      </Suspense>
    </BaseSection>
  );
}
