'use client';
import AppService from '@/services/apps/service';
import { AppItem } from '@/services/apps/types/AppItem';
import { AppListRequest } from '@/services/apps/types/ListRequest';
import { AppListResponse } from '@/services/apps/types/ListResponse';
import { FlexLayout } from '@/types/UI/ResponseLayout';
import { useRequest } from 'ahooks';
import { Button, ButtonProps } from 'antd';
import { ReactNode, useState } from 'react';
import AspectGrid from './AspectGrid';
type AspectGridHasMoreProps = ButtonProps & {
  showMoreInit?: boolean;
  query?: AppListRequest;
  games?: AppItem[];
  showMoreText?: ReactNode;
  flexLayout?: FlexLayout;
};
export default function AspectGridHasMore({
  showMoreInit = true,
  query = {},
  games = [],
  flexLayout = {},
  showMoreText = 'Show More',
  ...buttonProps
}: AspectGridHasMoreProps) {
  const [current, setCurrent] = useState<number>(query.current || 1);
  const [apps, setApps] = useState<AppItem[]>(games);
  const [showMore, setShowMore] = useState<boolean>(showMoreInit);
  const { loading, run } = useRequest((current) => AppService.list({ ...query, current }), {
    manual: true,
    onSuccess({ data }: AppListResponse) {
      const newApps = [...apps, ...(data.data || [])];
      setShowMore(newApps.length < data.total);
      setApps(newApps);
    },
  });
  function onClickMore() {
    const newCurrent = current + 1;
    setCurrent(newCurrent);
    run(newCurrent);
  }
  return (
    <>
      <AspectGrid {...flexLayout} apps={apps} />
      {showMore ? (
        <div className="my-4 text-center">
          <Button
            size="large"
            ghost
            type="primary"
            loading={loading}
            onClick={onClickMore}
            {...buttonProps}
          >
            {showMoreText}
          </Button>
        </div>
      ) : null}
    </>
  );
}
