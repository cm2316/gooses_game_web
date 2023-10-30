import { ReactNode } from 'react';
import { SkeletonTheme, SkeletonThemeProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
interface BaseSkeletonWrapProps extends SkeletonThemeProps {
  children: ReactNode;
}
export default function BaseSkeletonWrap({ children, ...skeletonOptions }: BaseSkeletonWrapProps) {
  return (
    <SkeletonTheme borderRadius={4} {...skeletonOptions}>
      {children}
    </SkeletonTheme>
  );
}
