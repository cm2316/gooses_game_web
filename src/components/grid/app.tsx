'use client';
import Placeholder from '@/components/base/placeholder';
import AppService from '@/services/apps/service';
import type { AppItem } from '@/services/apps/types/AppItem';
import { AppListRequest } from '@/services/apps/types/ListRequest';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { LoadingOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Image, Row, Spin } from 'antd';
import Link from 'next/link';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIsMutating, useMutation } from 'react-query';
import AppGridSkeleton from './skeleton';
export interface AppGridProps {
  onClick?: (app: AppItem) => void;
  linkTarget?: string;
  query?: Omit<AppListRequest, 'current'>;
  immediately?: boolean;
  mutateKey?: string;
}
export default React.forwardRef(function AppGrid(
  { onClick, linkTarget = '_self', immediately = true, mutateKey = 'common' }: AppGridProps,
  ref,
) {
  const fetchingKey = ['getAppList', mutateKey];
  const [total, setTotal] = useState(0);
  const [apps, setApps] = useState<AppItem[]>([]);
  const currentRef = useRef(1);
  const isFetching = useIsMutating(fetchingKey);

  const getAppListMutation = useMutation(
    fetchingKey,
    (params: AppListRequest) => {
      return AppService.list({ current: currentRef.current, pageSize: 20, ...params });
    },
    {
      onSuccess(res: AppListResponse) {
        setTotal(res.data.total);
        if (currentRef.current === 1) {
          setApps(res.data.data || []);
        } else {
          setApps([...apps, ...(res.data.data || [])]);
        }
      },
    },
  );

  useEffect(() => {
    if (immediately) {
      getAppListMutation.mutate({});
    }
  }, [immediately]);

  useImperativeHandle(ref, () => {
    return {
      async query(data: AppListRequest) {
        currentRef.current = 1;
        const result = await getAppListMutation.mutateAsync(data);
        return { total: result.data.total };
      },
    };
  });

  const loadMoreData = () => getAppListMutation.mutate({ current: currentRef.current++ });
  if (isFetching && currentRef.current === 1) {
    return <AppGridSkeleton count={10} />;
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
    >
      <Row gutter={[12, 12]}>
        {apps.map((app) => {
          return (
            <Col xs={12} sm={8} md={6} lg={4} xl={4} xxl={3} key={app.id}>
              <Link
                href={`/player/${app.id}`}
                target={linkTarget}
                onClick={() => onClick && onClick(app)}
              >
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
                  <Card.Meta title={app.appName} description={app.category} />
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </InfiniteScroll>
  );
});
