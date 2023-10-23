'use client';
import { Card, Col, Row, Skeleton } from 'antd';
import Placeholder from '../base/placeholder';
export interface AppGridSkeletonProps {
  count: number;
}
export default function AppGridSkeleton(props: AppGridSkeletonProps) {
  return (
    <Row gutter={[12, 12]}>
      {Array.from({ length: props.count }).map((app, index) => {
        return (
          <Col xs={12} sm={8} md={6} lg={4} xl={4} xxl={3} key={index}>
            <Card
              hoverable
              cover={
                <div className="w-full aspect-square">
                  <Placeholder />
                </div>
              }
            >
              <Card.Meta
                title={<Skeleton.Input active size="small" />}
                description={<Skeleton.Input active size="small" />}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
