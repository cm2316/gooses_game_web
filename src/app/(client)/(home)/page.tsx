import GridBannerList from '@/components/grid/banner';
import GridList from '@/components/grid/index';
import BaseSection from '@/components/section/base';
import AppService from '@/services/apps/service';

export const revalidate = 600;
export default async function Home() {
  const { data: topGames } = await AppService.listMemo({ pageSize: 12 });
  const { data: hotGames } = await AppService.listMemo({ pageSize: 12, current: 2 });
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <BaseSection title="Top Games">
          <GridList linkTarget="_blank" apps={topGames.data} />
        </BaseSection>
        <BaseSection title="Hot Games">
          <GridBannerList linkTarget="_blank" apps={hotGames.data} />
        </BaseSection>
      </div>
    </div>
  );
}
