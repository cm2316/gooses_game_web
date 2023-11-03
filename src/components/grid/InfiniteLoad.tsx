'use client';
import Placeholder from '@/components/base/Placeholder';
import GridList from '@/components/grid/AspectGrid';
import AppService from '@/services/apps/service';
import type { AppItem } from '@/services/apps/types/AppItem';
import { AppListRequest } from '@/services/apps/types/ListRequest';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { LoadingOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Card, Col, Divider, Image, Row, Spin } from 'antd';
import Link from 'next/link';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import InfiniteScroll, { Props as InfiniteScrollProps } from 'react-infinite-scroll-component';
import BaseSection from '../section/base/Index';
import AppGridSkeleton from './skeleton';
export interface AppGridProps
  extends Partial<Omit<InfiniteScrollProps, 'dataLength' | 'next' | 'hasMore' | 'loader'>> {
  immediately?: boolean;
}
export default React.forwardRef(function AppGrid(
  { immediately = true, ...props }: AppGridProps,
  ref,
) {
  const [total, setTotal] = useState(0);
  const [apps, setApps] = useState<AppItem[]>([]);
  const queryRef = useRef<Partial<AppListRequest>>({ current: 1, pageSize: 20 });
  const [hasFetch, setHasFetch] = useState(false);

  const { data: popularData } = useRequest(() =>
    AppService.list({
      pageSize: 12,
      collection: 'Most Popular',
    }),
  );

  const { loading, run, runAsync } = useRequest(() => AppService.list(queryRef.current), {
    manual: true,
    onSuccess(res: AppListResponse) {
      setHasFetch(true);
      setTotal(res.data.total);
      if (queryRef.current.current === 1) {
        setApps(res.data.data || []);
      } else {
        setApps([...apps, ...(res.data.data || [])]);
      }
    },
  });

  useEffect(() => {
    if (immediately) {
      run();
    }
  }, [immediately]);

  useImperativeHandle(ref, () => {
    return {
      async query(data: AppListRequest) {
        queryRef.current = {
          ...queryRef.current,
          ...data,
          current: 1,
        };
        const result = await runAsync();
        return { total: result.data.total };
      },
      reset() {
        setHasFetch(false);
      },
    };
  });

  const loadMoreData = async () => {
    queryRef.current.current!++;
    run();
  };
  if (loading && queryRef.current.current === 1) {
    return <AppGridSkeleton count={10} />;
  }
  if (!hasFetch) {
    if (popularData?.data.total) {
      return (
        <BaseSection title="Most Popular">
          <GridList aspect="aspect-[4/3]" apps={popularData?.data.data || []} />
        </BaseSection>
      );
    } else {
      return null;
    }
  }
  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={apps.length}
      next={loadMoreData}
      hasMore={apps.length < total}
      loader={
        <div className="flex justify-center mt-3">
          <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      }
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      {...props}
    >
      <Row gutter={[12, 12]}>
        {apps.map((app) => {
          return (
            <Col xs={12} sm={8} md={6} lg={4} key={app.id}>
              <Link href={`/player/${app.id}`}>
                <Card
                  hoverable
                  cover={
                    <div className="w-full aspect-square">
                      <Image
                        placeholder={<Placeholder />}
                        className="h-full w-full"
                        src={app.icon}
                        alt=""
                        width={'100%'}
                        height={'100%'}
                        loading="lazy"
                        preview={false}
                      />
                    </div>
                  }
                >
                  <Card.Meta title={app.title} description={app.category[0]} />
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </InfiniteScroll>
  );
});
