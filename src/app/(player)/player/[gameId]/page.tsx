import BaseFooter from '@/components/layout/player/BaseFooter';
import AppService from '@/services/apps/service';
import { Metadata } from 'next';
import Player from './components/Player';
interface Props {
  params: { gameId: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: appItem } = await AppService.getByIdMemo(params.gameId);
  return {
    title: appItem.title,
    description: appItem.description,
    openGraph: {
      images: appItem.asset,
    },
    twitter: {
      images: appItem.asset,
    },
  };
}

export default async function PlayerWrap({ params }: Props) {
  const { gameId } = params;
  const { data: appItem } = await AppService.getByIdMemo(gameId);
  return (
    <div
      className="absolute top-16 w-full bottom-0"
      style={{
        backgroundImage: `url(${appItem.thumb})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <Player app={appItem} />
      <BaseFooter app={appItem} />
    </div>
  );
}
