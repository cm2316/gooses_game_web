import NotFoundPage from '@/assets/404.svg';
import { HomeFilled } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center absolute w-full h-full">
      <NotFoundPage />
      <div className="absolute bottom-0 mb-14">
        <Link href="/">
          <Button type="primary" ghost size="large" icon={<HomeFilled />}>
            Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
