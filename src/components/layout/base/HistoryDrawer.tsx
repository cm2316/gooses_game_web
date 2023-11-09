'use client';
import AspectGrid from '@/components/grid/AspectGrid';
import { AppItem } from '@/services/apps/types/AppItem';
import { DeleteOutlined, HistoryOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStore, removeStore } from './HistoryPlayerGames';
export default function HistoryDrawer() {
  const [visible, setVisible] = useState(false);
  const [apps, setApps] = useState<AppItem[]>([]);
  const pathname = usePathname();
  function onToggleSearchModal(visible: boolean) {
    setVisible(visible);
  }
  useEffect(() => {
    onToggleSearchModal(false);
  }, [pathname]);

  useEffect(() => {
    if (visible) {
      setApps(getStore());
    }
  }, [visible]);

  const extraRender = (app: AppItem, index: number) => {
    function onRemove(evt: any) {
      const _apps = [...apps];
      _apps.splice(index, 1);
      console.log(_apps);
      setApps(_apps);
      removeStore(index);
    }
    return (
      <div
        onClick={(evt) => evt.preventDefault()}
        className="absolute inset-0 flex-center hover:bg-black/20 rounded-md app-mask group"
      >
        <div className="invisible group-hover:visible">
          <Button
            danger
            size="large"
            onClick={(evt) => onRemove(evt)}
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
          />
          <Link href={`/player/${app.id}`} className="ml-2">
            <Button size="large" type="primary" shape="circle" icon={<PlayCircleOutlined />} />
          </Link>
        </div>
      </div>
    );
  };
  return (
    <>
      <Button
        shape="circle"
        icon={<HistoryOutlined />}
        size="large"
        onClick={() => onToggleSearchModal(true)}
      ></Button>
      <Drawer
        height={'calc(100% - 64px)'}
        placement="bottom"
        closable={false}
        onClose={() => setVisible(false)}
        maskClosable
        open={visible}
      >
        <div className="h-full overflow-auto p-6">
          <AspectGrid apps={apps} extraRender={extraRender} />
        </div>
      </Drawer>
    </>
  );
}
