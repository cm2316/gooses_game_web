import BaseHeader from '@/components/layout/base/BaseHeader';
import { Layout } from 'antd';
export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="absolute inset-0">
      <BaseHeader />
      {children}
    </Layout>
  );
}
