'use client';
import Placeholder from '@/components/base/Placeholder';
import AppService from '@/services/apps/service';
import type { AppItem } from '@/services/apps/types/AppItem';
import { AppListRequest } from '@/services/apps/types/ListRequest';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { LoadingOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Card, Col, Divider, Image, Row, Spin } from 'antd';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import InfiniteScroll, { Props as InfiniteScrollProps } from 'react-infinite-scroll-component';
import { useImmer } from 'use-immer';
import AppGridSkeleton from './skeleton';
export interface AppGridProps
  extends Partial<Omit<InfiniteScrollProps, 'dataLength' | 'next' | 'hasMore' | 'loader'>> {
  onClick?: (evt: any, app: AppItem) => void;
  immediately?: boolean;
}
export default React.forwardRef(function AppGrid(
  { onClick, immediately = true, ...props }: AppGridProps,
  ref,
) {
  const [total, setTotal] = useState(0);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [queryParams, updateQueryParams] = useImmer<Partial<AppListRequest>>({
    pageSize: 20,
    current: 1,
  });

  const { loading, run, runAsync } = useRequest(() => AppService.list(queryParams), {
    manual: true,
    onSuccess(res: AppListResponse) {
      setTotal(res.data.total);
      if (queryParams.current === 1) {
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
        updateQueryParams((draft) => {
          return {
            ...draft,
            current: 1,
            ...data,
          };
        });
        await new Promise((r) =>
          setTimeout(() => {
            r(0);
          }, 50),
        );
        const result = await runAsync();
        return { total: result.data.total };
      },
    };
  });

  const loadMoreData = async () => {
    updateQueryParams((draft) => {
      draft.current = draft.current! + 1;
    });
    await new Promise((r) =>
      setTimeout(() => {
        r(0);
      }, 50),
    );
    run();
  };
  if (loading && queryParams.current === 1) {
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
      {...props}
    >
      <Row gutter={[12, 12]}>
        {apps.map((app) => {
          return (
            <Col xs={12} sm={8} md={6} lg={4} key={app.id}>
              <Card
                onClick={(evt) => onClick && onClick(evt, app)}
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
            </Col>
          );
        })}
      </Row>
    </InfiniteScroll>
  );
});
