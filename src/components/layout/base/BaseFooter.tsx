import AppService from '@/services/apps/service';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import Link from 'next/link';

export default async function BaseFooter() {
  const { data: categorys } = await AppService.getCategorysMemo();
  return (
    <footer className="container text-center py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <span className="text-slate-700 text-left font-bold text-base">GAMES</span>
          <ul className="flex gap-2 flex-wrap">
            {categorys.map((category, index) => {
              return (
                <li className="mb-2" key={category}>
                  <Link href={`/games/categorys/${category}`} prefetch={index === 0}>
                    <span className="border rounded px-2 py-1 text-slate-500 hover:text-purple-500">
                      {category}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Divider />
      <ul className="flex gap-2 mb-2 justify-center items-center">
        <li key="emial">
          <a href="mailto:gooses_wechat_mini@163.com">
            <CustomerServiceOutlined /> Contact Us
          </a>
        </li>
      </ul>
      <p className="text-slate-700">
        © {new Date().getFullYear()} game520.online. All rights reserved.
      </p>
    </footer>
  );
}
