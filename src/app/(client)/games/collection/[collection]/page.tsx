import GridList from '@/components/grid/index';
import ShowMoreButton from '@/components/section/show-more';
import AppService from '@/services/apps/service';
import classNames from 'classnames';
import styles from './index.module.scss';

export async function generateStaticParams() {
  const collections = await AppService.getCollections();
  return collections.data.map((collection) => {
    return {
      collection,
    };
  });
}

export default async function CollectionGames({ params }: { params: { collection: string } }) {
  const query = {
    pageSize: 24,
    current: 1,
    collection: params.collection,
  };
  const { data: collectionGames } = await AppService.listMemo(query);
  return (
    <>
      <section className="container text-center my-32 mx-auto">
        <h1 className={classNames([styles.title, 'pb-4', 'mb-4', 'font-medium', 'text-slate-700'])}>
          Play {params.collection} Games online
        </h1>
        <p className="text-lg text-slate-500">
          Enjoy a lag-free and high-quality gaming experience while playing games online with
          game520.online
        </p>
      </section>

      <section className="container mx-auto mb-8">
        <GridList linkTarget="_blank" apps={collectionGames.data || []} />
      </section>
      <section className="container mx-auto text-center">
        <ShowMoreButton
          ghost={false}
          total={collectionGames.total}
          query={query}
          num={collectionGames.data?.length}
        >
          Show {params.collection} More Games
        </ShowMoreButton>
      </section>
    </>
  );
}
