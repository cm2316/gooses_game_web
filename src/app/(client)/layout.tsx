import BaseFooter from '@/components/layout/base/footer';
import BaseHeader from '@/components/layout/base/header';
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
