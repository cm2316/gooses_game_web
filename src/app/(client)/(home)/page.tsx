import GridBannerList from '@/components/grid/banner';
import GridList from '@/components/grid/index';
import BaseSection from '@/components/section/base';
import AppService from '@/services/apps/service';
import Link from 'next/link';
import HomeGameBanner from './components/game-banner';

export const revalidate = 3600;
export default async function Home() {
  const { data: hotGames } = await AppService.listMemo({ pageSize: 6, collection: 'Hot' });
  const { data: halloweenGamesRest } = await AppService.listMemo({
    pageSize: 12,
    collection: 'Halloween',
  });
  const { data: newestGames } = await AppService.listMemo({ pageSize: 12, collection: 'Newest' });
  const { data: bestGames } = await AppService.listMemo({
    pageSize: 48,
    collection: 'Best Games',
  });

  const { data: collections } = await AppService.getCollections();
  return (
    <div className="p-4">
      <HomeGameBanner apps={hotGames.data || []} />
      <div className="container mx-auto">
        <BaseSection title="The Collection of the Game">
          <div className="flex justify-center gap-2 flex-wrap">
            {collections.map((collection) => {
              return (
                <Link href={`/games/collection/${collection}`} className="self-center mb-2">
                  <span className="border rounded py-2 px-5 flex text-base text-slate-800 bg-purple-200 border-purple-500 hover:border-purple-700 hover:bg-purple-500 hover:text-white">
                    {collection}
                  </span>
                </Link>
              );
            })}
          </div>
        </BaseSection>
        <BaseSection title="Halloween Games">
          <GridList linkTarget="_blank" apps={halloweenGamesRest.data || []} />
        </BaseSection>
        <BaseSection title="Newest Games">
          <GridBannerList linkTarget="_blank" apps={newestGames.data || []} />
        </BaseSection>
        <BaseSection title="Best Games">
          <GridList linkTarget="_blank" apps={bestGames.data || []} />
        </BaseSection>
      </div>
    </div>
  );
}
