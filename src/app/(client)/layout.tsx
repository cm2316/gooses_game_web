'use client';
import Logo from '@/assets/logo-full.png';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import Link from 'next/link';
const { Header, Content, Footer } = Layout;
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="min-h-full absolute w-full h-full">
      <Header className="flex justify-between items-center sticky top-0 z-50">
        <div className="h-full flex items-center">
          <img src={Logo.src} alt="" className="h-10" />
        </div>
        <div className="h-full">
          <Button shape="circle" type="primary" icon={<SearchOutlined />} size="large"></Button>
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer className="flex justify-center items-center">
        <Link href="/">
          <span style={{ color: '#999' }}>www.game520.online</span>
        </Link>
      </Footer>
    </Layout>
  );
}
