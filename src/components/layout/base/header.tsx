import Logo from '@/assets/logo-full.png';
import AppGrid from '@/components/grid/app';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout, LayoutProps } from 'antd';
import Link from 'next/link';
import { JSX, RefAttributes, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
export default function BaseHeader(
  props: JSX.IntrinsicAttributes & LayoutProps & RefAttributes<HTMLElement>,
) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [loading, setLoading] = useImmer(false);
  const [total, setTotal] = useImmer(-1);
  const appGridRef = useRef<any>();
  function openSearchModal() {
    setSearchVisible(true);
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
  return (
    <Layout.Header className="flex justify-between items-center sticky top-0 z-50" {...props}>
      <Link className="h-full flex items-center" href="/">
        <img src={Logo.src} alt="" className="h-10" />
      </Link>
      <Button
        shape="circle"
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        onClick={openSearchModal}
      ></Button>

      <Drawer
        destroyOnClose
        height={'calc(100% - 64px)'}
        placement="bottom"
        closable={false}
        onClose={() => setSearchVisible(false)}
        maskClosable
        open={searchVisible}
      >
        <div className="h-full flex flex-col items-center">
          <Input
            placeholder="Input search string and enter to fetch"
            prefix={<SearchOutlined />}
            onKeyDown={onKeyDown}
            className="w-full max-w-xs mb-6"
            size="large"
          />
          <div className="flex-1 min-h-0 overflow-auto p-6">
            <AppGrid ref={appGridRef} immediately={false} mutateKey="search" />
          </div>
        </div>
      </Drawer>
    </Layout.Header>
  );
}
