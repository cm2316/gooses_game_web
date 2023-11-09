'use client';
import AppGrid from '@/components/grid/InfiniteLoad';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Input } from 'antd';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function BaseSearchDrawer() {
  const [loading, setLoading] = useState(false);
  const appGridRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  function onToggleSearchModal(visible: boolean) {
    setVisible(visible);
  }
  async function onKeyDown(evt: any) {
    if (evt.keyCode === 13 && !loading) {
      const value = evt.target.value;
      if (value) {
        setLoading(true);
        await appGridRef.current?.query({ name: evt.target.value });
        setLoading(false);
      } else {
        appGridRef.current?.reset();
      }
    }
  }
  useEffect(() => {
    onToggleSearchModal(false);
  }, [pathname]);
  return (
    <>
      <Button
        shape="circle"
        type="primary"
        icon={<SearchOutlined />}
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
              scrollableTarget="DrawerSearchContainer"
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
