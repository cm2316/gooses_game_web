'use client';
import BaseHeader from '@/components/layout/base/header';
import BaseFooter from '@/components/layout/player/footer';
import { Layout } from 'antd';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="h-full flex flex-col absolute w-full">
      <BaseHeader />
      <Layout.Content id="PlayerContainer" className="flex-1">
        {children}
      </Layout.Content>
      <BaseFooter />
    </Layout>
  );
}
