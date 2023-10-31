import BaseHeader from '@/components/layout/base/BaseHeader';
import { Layout } from 'antd';
export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="h-full flex flex-col absolute w-full">
      <BaseHeader />
      <div className="flex-1">{children}</div>
    </Layout>
  );
}
