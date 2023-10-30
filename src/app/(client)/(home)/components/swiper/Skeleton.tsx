import BaseSkeletonWrap from '@/components/base/BaseSkeletonWrap';
import Skeleton from 'react-loading-skeleton';
export default function SwiperSkeleton() {
  return (
    <BaseSkeletonWrap>
      <div className="h-96 rounded-lg bg-gradient-to-t from-black/90 from-0% via-black/20 via-40% to-black/0 to-50%">
        <Skeleton className="h-full w-full" />
      </div>
    </BaseSkeletonWrap>
  );
}
