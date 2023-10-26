import BaseHeader from '@/components/layout/base/header';
import BaseFooter from '@/components/layout/player/footer';
import { Layout } from 'antd';
export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="h-full flex flex-col absolute w-full">
      <BaseHeader />
      <div id="PlayerContainer" className="flex-1">
        {children}
      </div>
      <BaseFooter />
    </Layout>
  );
}
