import GridBannerList from '@/components/grid/banner';
import GridList from '@/components/grid/index';
import BaseSection from '@/components/section/base';
import AppService from '@/services/apps/service';
import HomeGameBanner from './components/game-banner';

export const revalidate = 600;
export default async function Home() {
  const { data: topGames } = await AppService.listMemo({ pageSize: 6 });
  const { data: topGamesRest } = await AppService.listMemo({ pageSize: 12, current: 2 });
  const { data: hotGames } = await AppService.listMemo({ pageSize: 12, current: 3 });
  const { data: popularGames } = await AppService.listMemo({ pageSize: 48, current: 3 });
  return (
    <div className="p-4">
      <HomeGameBanner apps={topGames.data} />
      <div className="container mx-auto">
        <BaseSection title="Top Games">
          <GridList linkTarget="_blank" apps={topGamesRest.data} />
        </BaseSection>
        <BaseSection title="Hot Games">
          <GridBannerList linkTarget="_blank" apps={hotGames.data} />
        </BaseSection>
        <BaseSection title="Popular Games">
          <GridList linkTarget="_blank" apps={popularGames.data} />
        </BaseSection>
      </div>
    </div>
  );
}
