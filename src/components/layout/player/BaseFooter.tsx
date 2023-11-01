'use client';
import { AppItem } from '@/services/apps/types/AppItem';
import { ExpandOutlined, HomeFilled } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Button, Tooltip } from 'antd';
import Link from 'next/link';
export interface PLayerProps {
  app: AppItem;
}
export default function BaseFooter({ app }: PLayerProps) {
  const [fullscreen, { enterFullscreen }] = useFullscreen(() =>
    document.getElementById('PlayerContainer'),
  );
  return (
    <div className="flex justify-between items-center px-3 py-2 h-16 bg-white/90">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <Button shape="round" type="primary" ghost icon={<HomeFilled />}>
            Home
          </Button>
        </Link>
        <span className="text-base text-slate-600 font-medium">{app.title}</span>
      </div>
      <Tooltip title="Fullscreen">
        <Button
          type="text"
          shape="circle"
          icon={<ExpandOutlined />}
          onClick={enterFullscreen}
        ></Button>
      </Tooltip>
    </div>
  );
}
