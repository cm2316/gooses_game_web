import AppService from '@/services/apps/service';
import HomeGameBanner from '../components/GameBannerSwiperPromise';
import GameCategorysPromise from '../components/GameCategorysPromise';
import GameCollectionsPromise from '../components/GameCollectionsPromise';
import GameGridListPromise from '../components/GameGridListPromise';

export const revalidate = 3600;
export default async function Home() {
  const hotGamesPromise = AppService.listMemo({ pageSize: 6, collection: 'Hot' });
  const halloweenGamesPromise = AppService.listMemo({
    pageSize: 12,
    collection: 'Halloween',
  });
  const newestGamesPromise = AppService.listMemo({ pageSize: 12, collection: 'Newest' });
  const bestGamesPromise = AppService.listMemo({
    pageSize: 48,
    collection: 'Best',
  });

  return (
    <div className="p-4">
      <HomeGameBanner promise={hotGamesPromise} />
      <div className="container">
        <GameCollectionsPromise title="The Collections of the Game" />
        <GameGridListPromise
          skeletonCount={12}
          title="Halloween Games"
          promise={halloweenGamesPromise}
          aspect="aspect-[4/3]"
        />
        <GameCategorysPromise title="The Categorys of the Game" />
        <GameGridListPromise
          skeletonCount={12}
          title="Newest Games"
          promise={newestGamesPromise}
          aspect="aspect-[4/3]"
        />
        <GameGridListPromise
          skeletonCount={24}
          title="Best Games"
          promise={bestGamesPromise}
          aspect="aspect-[4/3]"
        />
      </div>
    </div>
  );
}
