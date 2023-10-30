import BaseSkeletonWrap from '@/components/base/BaseSkeletonWrap';
import { FlexLayout, flexLayoutValue } from '@/types/UI/ResponseLayout';
import { Col, Row } from 'antd';
import Skeleton from 'react-loading-skeleton';
export interface GridSkeletonProps extends FlexLayout {
  count?: number;
}

export default function GridSkeleton({ count = 24, ...props }: GridSkeletonProps) {
  const { gutter, span, aspect } = { ...flexLayoutValue, ...props };
  return (
    <BaseSkeletonWrap>
      <Row gutter={gutter}>
        {Array.from({ length: count! }).map((_, index) => {
          return (
            <Col {...span} key={index}>
              <Skeleton className={aspect} />
            </Col>
          );
        })}
      </Row>
    </BaseSkeletonWrap>
  );
}
