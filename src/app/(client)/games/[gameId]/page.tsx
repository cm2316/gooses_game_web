import AppService from '@/services/apps/service';
import { Button, Divider, Space } from 'antd';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GameGridListPromise from '../../(home)/components/GameGridListPromise';
interface Props {
  params: {
    gameId: string;
  };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: appItem } = await AppService.getByIdMemo(params.gameId);
  return {
    title: appItem.title,
    description: appItem.description,
    openGraph: {
      images: appItem.asset,
    },
    twitter: {
      images: appItem.asset,
    },
  };
}
export default async function Index({ params }: Props) {
  const { data: appItem } = await AppService.getByIdMemo(params.gameId);

  const categoryGamesPromises = appItem.category.map((category) => {
    return {
      promise: AppService.listMemo({
        pageSize: 12,
        category: category,
      }),
      category,
    };
  });
  const hotGamesPromise = AppService.listMemo({ pageSize: 24, collection: 'Hot' });
  return (
    <div>
      <div
        className="relative flex justify-end flex-col"
        style={{
          backgroundImage: `url(${appItem.tile || appItem.thumb})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          height: '74vh',
          maxHeight: '468px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.4) 55%, rgba(0, 0, 0, 0.8) 100%)',
          }}
        ></div>
        <div className="relative mb-12 px-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <div className="flex flex-col gap-8 sm:flex-row">
              <div className="flex items-end">
                <Image src={appItem.icon} width={150} height={150} alt="" className="rounded" />
              </div>
              <div className="flex flex-col gap-2 justify-end items-start">
                <h1 className="text-2xl font-medium text-slate-300">{appItem.title}</h1>
                <Space size={0} split={<Divider type="vertical" className="bg-white/70" />}>
                  {appItem.category.map((category, index) => {
                    return (
                      <Link
                        key={`${category}-${index}`}
                        className="text-lg text-white/80 hover:underline hover:text-white underline"
                        href={`/games/categorys/${category}`}
                      >
                        {category}
                      </Link>
                    );
                  })}
                </Space>
                <div className="flex gap-2 flex-wrap items-center">
                  <Link href={`/player/${appItem.id}`}>
                    <Button type="primary" size="large">
                      Play in browser
                    </Button>
                  </Link>
                  <span className="text-slate-400">OR</span>
                  <Link href={`/`}>
                    <Button type="default" size="large">
                      Explore more games
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-col gap-3 flex-1 text-slate-300 hidden sm:flex group">
              <h2 className="text-base font-medium">{appItem.title} Online in Browser</h2>
              <p className="text-slate-300 line-clamp-2 group-hover:line-clamp-none">
                {appItem.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {categoryGamesPromises.map(({ promise, category }) => {
          return (
            <GameGridListPromise
              key={category}
              skeletonCount={12}
              title={`More ${category} Games`}
              promise={promise}
              aspect="aspect-square"
            />
          );
        })}
        <GameGridListPromise
          skeletonCount={12}
          title="Hot Games"
          promise={hotGamesPromise}
          aspect="aspect-[4/3]"
          span={{ xs: 12, sm: 12, md: 8, lg: 6 }}
        />
      </div>
    </div>
  );
}
