import BaseHeader from '@/components/layout/base/BaseHeader';
import BaseFooter from '@/components/layout/player/BaseFooter';
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
