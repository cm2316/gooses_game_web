import GameCollectionsPromise from '@/app/(client)/(home)/components/GameCollectionsPromise';
import GameGridListPromise from '@/app/(client)/(home)/components/GameGridListPromise';
import GridListHasMore from '@/components/grid/AspectGridHasMore';
import AppService from '@/services/apps/service';
import classNames from 'classnames';
import styles from './index.module.scss';

export async function generateStaticParams() {
  const collections = await AppService.getCollectionsMemo();
  return collections.data.slice(0, 5).map((collection) => {
    return {
      collection,
    };
  });
}

export default async function CollectionGames({ params }: { params: { collection: string } }) {
  const decodeCollection = decodeURI(params.collection);
  const query = {
    pageSize: 24,
    current: 1,
    collection: decodeCollection,
  };
  const exclesiveGamesPromise = AppService.listMemo({
    pageSize: 6,
    collection: 'Exclusive',
  });
  const { data: collectionGames } = await AppService.listMemo(query);
  const games = collectionGames.data || [];
  const total = collectionGames.total || 0;
  return (
    <>
      <section className="container text-center my-32">
        <h1 className={classNames([styles.title, 'pb-4', 'mb-4', 'font-medium', 'text-slate-700'])}>
          Play {decodeCollection} Games online
        </h1>
        <p className="text-lg text-slate-500">
          Enjoy a lag-free and high-quality gaming experience while playing games online
        </p>
      </section>

      <section className="container mb-8">
        <GridListHasMore
          games={games}
          showMoreInit={games.length < total}
          query={query}
          showMoreText={`Show More ${decodeCollection} Games`}
        />
      </section>
      <GameCollectionsPromise title="Explore More Collections" className="container mb-8" />
      {decodeCollection === 'Exclusive' ? null : (
        <GameGridListPromise
          className="container mb-8"
          skeletonCount={6}
          title="Exclesive Games"
          promise={exclesiveGamesPromise}
          aspect="aspect-[4/3]"
        />
      )}
    </>
  );
}
