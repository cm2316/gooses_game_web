import GameCategorysPromise from '@/app/(client)/(home)/components/GameCategorysPromise';
import GameGridListPromise from '@/app/(client)/(home)/components/GameGridListPromise';
import GridListHasMore from '@/components/grid/AspectGridHasMore';
import AppService from '@/services/apps/service';
import classNames from 'classnames';
import styles from './index.module.scss';

export async function generateStaticParams() {
  const categorys = await AppService.getCategorysMemo();
  return categorys.data.map((category) => {
    return {
      category,
    };
  });
}

export default async function CategoryGames({ params }: { params: { category: string } }) {
  const decodeCategory = decodeURI(params.category);
  const query = {
    pageSize: 24,
    current: 1,
    category: decodeCategory,
  };
  const mostPopularGamesPromise = AppService.listMemo({
    pageSize: 6,
    collection: 'Most Popular',
  });
  const { data: categoryGames } = await AppService.listMemo(query);
  const games = categoryGames.data || [];
  const total = categoryGames.total || 0;
  return (
    <>
      <section className="container text-center my-32 mx-auto">
        <h1 className={classNames([styles.title, 'pb-4', 'mb-4', 'font-medium', 'text-slate-700'])}>
          Play {decodeCategory} Games online
        </h1>
        <p className="text-lg text-slate-500">
          Enjoy a lag-free and high-quality gaming experience while playing games online
        </p>
      </section>

      <section className="container mx-auto mb-8">
        <GridListHasMore
          games={games}
          showMoreInit={games.length < total}
          query={query}
          showMoreText={`Show More ${decodeCategory} Games`}
        />
      </section>
      <GameCategorysPromise title="Explore More Categories" className="container mx-auto mb-8" />
      <GameGridListPromise
        className="container mx-auto mb-8"
        skeletonCount={6}
        title="Most Popular Games"
        promise={mostPopularGamesPromise}
        aspect="aspect-[4/3]"
      />
    </>
  );
}
