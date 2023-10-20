'use client';
import AppService from '@/services/apps/service';
import type { AppItem } from '@/services/apps/types/AppItem';
import { useState } from 'react';
import { useQuery } from 'react-query';
export default function Player({ params }: { params: { appId: string } }) {
  const { appId } = params;
  const [app, setApp] = useState<AppItem>();
  const { isFetching } = useQuery(['getAppById', appId], () => AppService.getById(appId), {
    onSuccess(res) {
      setApp(res.data);
    },
  });
  return (
    <div
      className="h-full flex justify-center"
      style={{
        backgroundImage: `url(${app?.tile})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <iframe
        sandbox="allow-scripts allow-popups allow-same-origin allow-pointer-lock"
        allow="clipboard-write"
        src={app?.playUrl}
        allowFullScreen={true}
        width={'100%'}
        height={'100%'}
        className="max-w-5xl"
      ></iframe>
    </div>
  );
}
