'use client';

import { AppItem } from '@/services/apps/types/AppItem';
import { useSize } from 'ahooks';
import { useEffect, useRef, useState } from 'react';

export interface PLayerProps {
  app: AppItem;
}
export default function Player({ app }: PLayerProps) {
  const ref = useRef(null);
  const domSize = useSize(ref);
  const [containerStyle, setContainerStyle] = useState({});
  useEffect(() => {
    setContainerStyle({
      height: `${window.innerHeight - 128}px`,
    });
  }, [domSize]);
  return (
    <div
      ref={ref}
      style={{
        aspectRatio: `${app.width / app.height}`,
        ...containerStyle,
      }}
      className="h-full max-w-full mx-auto overflow-hidden"
    >
      <iframe
        id="PlayerContainer"
        allow="clipboard-write"
        src={app.url}
        allowFullScreen={true}
        height={'100%'}
        width={'100%'}
      ></iframe>
    </div>
  );
}
