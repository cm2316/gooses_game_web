import GridList from '@/components/grid/AspectGrid';
import BaseSection from '@/components/section/base/Index';
import AppService from '@/services/apps/service';
import GameCategorys from './components/categorys/List';
import GameCollections from './components/collections/List';
import GameSwiperList from './components/swiper/List';

export default async function Home() {
  const hotGamesPromise = AppService.listMemo({ pageSize: 12, from: 3 });
  const mobileGamesPromise = AppService.listMemo({
    pageSize: 12,
    collection: 'Hot',
    mobile: 1,
  });
  const halloweenGamesPromise = AppService.listMemo({
    pageSize: 12,
    collection: 'Halloween',
  });
  const newestGamesPromise = AppService.listMemo({ pageSize: 12, collection: 'Newest' });
  const bestGamesPromise = AppService.listMemo({
    pageSize: 48,
    collection: 'Best',
  });

  const collectionsPromise = AppService.getCollectionsMemo();
  const categorysPromise = AppService.getCategorysMemo();

  const [
    { data: hotGames },
    { data: mobileGames },
    { data: halloweenGames },
    { data: newestGames },
    { data: bestGames },
    { data: collections },
    { data: categorys },
  ] = await Promise.all([
    hotGamesPromise,
    mobileGamesPromise,
    halloweenGamesPromise,
    newestGamesPromise,
    bestGamesPromise,
    collectionsPromise,
    categorysPromise,
  ]);
  return (
    <div className="p-4">
      <GameSwiperList apps={hotGames.data || []} />
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
        <BaseSection title="Newest Games">
          <GridList aspect="aspect-[4/3]" apps={newestGames.data || []} />
        </BaseSection>
        <BaseSection title="Best Games">
          <GridList aspect="aspect-[4/3]" apps={bestGames.data || []} />
        </BaseSection>
      </div>
    </div>
  );
}
