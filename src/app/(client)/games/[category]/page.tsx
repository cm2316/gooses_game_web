import GridList from '@/components/grid/index';
import ShowMoreButton from '@/components/section/show-more';
import AppService from '@/services/apps/service';
import classNames from 'classnames';
import styles from './index.module.scss';
export default async function CategoryGames({ params }: { params: { category: string } }) {
  const query = {
    pageSize: 18,
    current: 1,
    category: params.category,
  };
  const { data: categoryGames } = await AppService.listMemo(query);
  return (
    <>
      <section className="container text-center my-32 mx-auto">
        <h1 className={classNames([styles.title, 'pb-4', 'mb-4', 'font-medium', 'text-slate-700'])}>
          Play {params.category} Games online
        </h1>
        <p className="text-lg text-slate-500">
          Play {params.category} Games online instantly without downloading. Enjoy a lag-free and
          high-quality gaming experience while playing games online with game520.online
        </p>
      </section>

      <section className="container mx-auto mb-8">
        <GridList linkTarget="_blank" apps={categoryGames.data} />
      </section>
      <section className="container mx-auto text-center">
        <ShowMoreButton
          ghost={false}
          total={categoryGames.total}
          query={query}
          num={categoryGames.data.length}
        >
          Show {params.category} More Games
        </ShowMoreButton>
      </section>
    </>
  );
}
