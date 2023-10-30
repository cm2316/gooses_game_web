import BaseFooter from '@/components/layout/base/BaseFooter';
import BaseHeader from '@/components/layout/base/BaseHeader';
import { Layout } from 'antd';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <BaseHeader />
      <main>{children}</main>
      <BaseFooter />
    </Layout>
  );
}
