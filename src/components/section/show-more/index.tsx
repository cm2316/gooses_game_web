'use client';
import GridList from '@/components/grid/index';
import AppService from '@/services/apps/service';
import { AppItem } from '@/services/apps/types/AppItem';
import { AppListRequest } from '@/services/apps/types/ListRequest';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { useRequest } from 'ahooks';
import { Button, ButtonProps } from 'antd';
import { useState } from 'react';

export interface ShowMoreButtonProps extends ButtonProps {
  total?: number;
  current?: number;
  query?: AppListRequest;
  num?: number;
}

export default function ShowMoreButton({
  total = 0,
  current = 1,
  query = {},
  num = 0,
  ...props
}: ShowMoreButtonProps) {
  const [innerCurrent, setCurrent] = useState(current || 1);
  const [showNum, setShowNum] = useState(num);
  const [apps, setApps] = useState<AppItem[]>([]);
  const { loading, run } = useRequest((current) => AppService.list({ ...query, current }), {
    manual: true,
    onSuccess({ data }: AppListResponse) {
      const newApps = [...apps, ...(data.data || [])];
      setShowNum(newApps.length + num);
      setApps(newApps);
    },
  });
  function onClickMore() {
    const newCurrent = innerCurrent + 1;
    setCurrent(newCurrent);
    run(newCurrent);
  }
  const showMoreButton = showNum < total;
  return (
    <>
      {apps.length > 0 ? (
        <section className="container mx-auto">
          <GridList linkTarget="_blank" apps={apps} />
        </section>
      ) : null}
      {showMoreButton ? (
        <section className="container mx-auto text-center my-4">
          <Button
            size="large"
            ghost
            type="primary"
            loading={loading}
            onClick={onClickMore}
            {...props}
          />
        </section>
      ) : null}
    </>
  );
}
