'use client';
import { RedditOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function User() {
  const { data: session } = useSession();
  if (session) {
    return <RedditOutlined onClick={() => signOut()} />;
  } else {
    return (
      <Space size={'middle'}>
        <UserOutlined />
        <Button shape="circle" type="primary" onClick={() => signIn()}>
          Login
        </Button>
      </Space>
    );
  }
}
