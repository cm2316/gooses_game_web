import { Col, ColProps, Row } from 'antd';
import { Gutter } from 'antd/es/grid/row';
export interface AppGridSkeletonProps {
  count?: number;
  aspect?: string;
  gutter?: Gutter | [Gutter, Gutter];
  span?: ColProps;
}
const defProps: AppGridSkeletonProps = {
  count: 24,
  aspect: 'aspect-square',
  gutter: [12, 12],
  span: {
    xs: 12,
    sm: 8,
    md: 6,
    lg: 4,
  },
};
export default function AppGridSkeleton(props: AppGridSkeletonProps) {
  const _props = { ...defProps, ...props };
  return (
    <Row gutter={_props.gutter}>
      {Array.from({ length: _props.count! }).map((app, index) => {
        return (
          <Col {..._props.span} key={index}>
            <div className={_props.aspect}></div>
          </Col>
        );
      })}
    </Row>
  );
}
