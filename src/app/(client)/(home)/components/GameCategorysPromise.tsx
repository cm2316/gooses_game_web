import BaseSection from '@/components/section/base/Index';
import AppService from '@/services/apps/service';
import classNames from 'classnames';
import { Suspense } from 'react';
import GameCategorys from './categorys/ListPromise';
import Categoryskeleton from './categorys/Skeleton';
interface GameCategorysPromiseProps {
  className?: classNames.ArgumentArray;
  title: string;
}
export default function GameCategoryssPromise({ className, title }: GameCategorysPromiseProps) {
  const promise = AppService.getCategorysMemo();
  return (
    <BaseSection title={title} className={className}>
      <Suspense fallback={<Categoryskeleton count={12} />}>
        <GameCategorys promise={promise} />
      </Suspense>
    </BaseSection>
  );
}
