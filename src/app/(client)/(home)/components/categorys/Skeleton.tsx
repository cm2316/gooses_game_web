import BaseSkeletonWrap from '@/components/base/BaseSkeletonWrap';
import Skeleton from 'react-loading-skeleton';
interface CategorysSkeletonProps {
  count: number;
  width?: number | number[];
  height?: number;
}
export default function CategorysSkeleton({
  count,
  width = [120, 160, 150, 100],
  height = 42,
}: CategorysSkeletonProps) {
  const _widths = typeof width === 'number' ? [width] : width;
  return (
    <BaseSkeletonWrap>
      <div className="flex justify-center gap-2 flex-wrap">
        {Array.from({ length: count }).map((_, index) => {
          const _width = _widths[Math.floor(Math.random() * _widths.length)];
          return (
            <div className="mb-2 rounded-full" key={index}>
              <Skeleton key={index} width={_width} height={height} />
            </div>
          );
        })}
      </div>
    </BaseSkeletonWrap>
  );
}
