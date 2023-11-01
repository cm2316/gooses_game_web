import AppService from '@/services/apps/service';
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
            {categorys.map((category) => {
              return (
                <li className="mb-2">
                  <Link href={`/games/categorys/${category}`}>
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
      <p className="text-slate-700">
        © {new Date().getFullYear()} game520.online. All rights reserved.
      </p>
    </footer>
  );
}
