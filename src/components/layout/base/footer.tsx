import { Layout, LayoutProps } from 'antd';
import Link from 'next/link';
import { JSX, RefAttributes } from 'react';
export default function BaseFooter(
  props: JSX.IntrinsicAttributes & LayoutProps & RefAttributes<HTMLElement>,
) {
  return (
    <Layout.Footer className="flex justify-center items-center" {...props}>
      <Link href="/">
        <span style={{ color: '#999' }}>www.game520.online</span>
      </Link>
    </Layout.Footer>
  );
}
