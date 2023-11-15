import GridList from '@/components/grid/AspectGrid';
import BaseSection from '@/components/section/base/Index';
import AppService from '@/services/apps/service';
import { GameSource } from '@/types/BaseEnum';
import GameCategorys from './components/categorys/List';
import GameCollections from './components/collections/List';
import GameSwiperList from './components/swiper/List';

export default async function Home() {
  const popularGamesPromise = AppService.listMemo({
    pageSize: 12,
    collection: 'Newest',
    from: GameSource.Distribution,
  });
  const mobileGamesPromise = AppService.listMemo({
    pageSize: 12,
    // collection: 'Hot',
    // mobile: 1,
    from: GameSource.Pix,
  });
  const halloweenGamesPromise = AppService.listMemo({
    pageSize: 12,
    collection: 'Halloween',
    from: GameSource.Distribution,
  });
  const exclusiveGamesPromise = AppService.listMemo({
    pageSize: 12,
    collection: 'Exclusive',
    from: GameSource.Distribution,
  });
  const topPicksGamesPromise = AppService.listMemo({
    pageSize: 48,
    collection: 'Top Picks',
    from: GameSource.Distribution,
  });

  const collectionsPromise = AppService.getCollectionsMemo();
  const categorysPromise = AppService.getCategorysMemo();

  const [
    { data: popularGames },
    { data: mobileGames },
    { data: halloweenGames },
    { data: exclusiveGames },
    { data: topPicksGames },
    { data: collections },
    { data: categorys },
  ] = await Promise.all([
    popularGamesPromise,
    mobileGamesPromise,
    halloweenGamesPromise,
    exclusiveGamesPromise,
    topPicksGamesPromise,
    collectionsPromise,
    categorysPromise,
  ]);
  return (
    <div className="p-4">
      <GameSwiperList apps={popularGames.data || []} />
      <div className="container">
        <BaseSection title="Mobile Games">
          <GridList aspect="aspect-square" apps={mobileGames.data || []} />
        </BaseSection>
        <BaseSection title="Explore by Collection">
          <GameCollections collections={collections} />
        </BaseSection>
        <BaseSection title="Halloween Games">
          <GridList aspect="aspect-[4/3]" apps={halloweenGames.data || []} />
        </BaseSection>
        <BaseSection title="Explore by Category">
          <GameCategorys categorys={categorys} />
        </BaseSection>
        <BaseSection title="Exclusive Games">
          <GridList aspect="aspect-[4/3]" apps={exclusiveGames.data || []} />
        </BaseSection>
        <BaseSection title="Top Picks Games">
          <GridList aspect="aspect-[4/3]" apps={topPicksGames.data || []} />
        </BaseSection>
      </div>
    </div>
  );
}
