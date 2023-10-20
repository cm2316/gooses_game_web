'use client';
import AppService from '@/services/apps/service';
import type { AppItem } from '@/services/apps/types/AppItem';
import type { AppListResponse } from '@/services/apps/types/ListResponse';
import { LoadingOutlined } from '@ant-design/icons';
import { Card, Divider, List, Spin } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'react-query';

export default function Home() {
  const [total, setTotal] = useState(0);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [current, setCurrent] = useState(1);
  const { isFetching } = useQuery(
    ['getAppList', current],
    () => AppService.list({ current, pageSize: 20 }),
    {
      onSuccess(res: AppListResponse) {
        setTotal(res.data.total);
        setApps([...apps, ...res.data.data]);
      },
    },
  );

  const loadMoreData = () => setCurrent((current) => current + 1);
  return (
    <div className="h-full p-4 overflow-auto" id="App_Container">
      <Spin spinning={isFetching && apps.length === 0}>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={apps.length}
          next={loadMoreData}
          hasMore={apps.length < total}
          loader={
            <div className="flex justify-center">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="App_Container"
        >
          <List
            grid={{
              gutter: 16,
              xs: 2,
              sm: 3,
              md: 4,
              lg: 5,
              xl: 6,
              xxl: 7,
            }}
            dataSource={apps}
            rowKey={(item) => item.id}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Link href={`/play/${item.id}`} target="_blank">
                    <Card
                      hoverable
                      cover={
                        <img
                          width={300}
                          height={300}
                          src={item.icon}
                          alt=""
                          loading="lazy"
                          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5/BCgAHPQI65o1ItQAAAABJRU5ErkJggg=="
                        />
                      }
                    >
                      <Card.Meta title={item.appName} description={item.category} />
                    </Card>
                  </Link>
                </List.Item>
              );
            }}
          />
        </InfiniteScroll>
      </Spin>
    </div>
  );
}
