'use client';
import AppGrid from '@/components/grid/infinite';
import { AppItem } from '@/services/apps/types/AppItem';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function SearchDrawer() {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(-1);
  const appGridRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  function onToggleSearchModal() {
    setVisible((visible) => !visible);
  }
  async function onKeyDown(evt: any) {
    if (evt.keyCode === 13 && !loading) {
      const value = evt.target.value;
      if (value) {
        setLoading(true);
        const { total } = await appGridRef.current?.query({ name: evt.target.value });
        setLoading(false);
        setTotal(total);
      }
    }
  }
  function onLeaveCurrentApp(event: Event, app: AppItem) {
    if (!window.confirm('')) {
      event.preventDefault();
      return;
    }
    onToggleSearchModal();
    router.push(`/player/${app.id}`);
  }
  return (
    <>
      <Button
        shape="circle"
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        onClick={onToggleSearchModal}
      ></Button>
      <Drawer
        destroyOnClose
        height={'calc(100% - 64px)'}
        placement="bottom"
        closable={false}
        onClose={() => setVisible(false)}
        maskClosable
        open={visible}
      >
        <div className="h-full flex flex-col items-center">
          <Input
            placeholder="Input search string and enter to fetch"
            prefix={<SearchOutlined />}
            onKeyDown={onKeyDown}
            className="w-full max-w-xs mb-6"
            size="large"
          />
          <div className="flex-1 min-h-0 overflow-auto p-6" id="DrawerSearchContainer">
            <AppGrid
              ref={appGridRef}
              immediately={false}
              scrollableTarget={'DrawerSearchContainer'}
              onClick={onLeaveCurrentApp}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
