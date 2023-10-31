import AppService from '@/services/apps/service';
import { Metadata } from 'next';
interface Props {
  params: { gameId: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: appItem } = await AppService.getByIdMemo(params.gameId);
  return {
    title: appItem.title,
    description: appItem.description,
    openGraph: {
      images: [appItem.icon, appItem.thumb],
    },
    twitter: {
      images: [appItem.icon, appItem.thumb],
    },
  };
}

export default async function Player({ params }: Props) {
  const { gameId } = params;
  const { data: appItem } = await AppService.getByIdMemo(gameId);
  return (
    <div
      className="h-full flex justify-center bg-slate-950 opacity-90"
      style={{
        backgroundImage: `url(${appItem.thumb})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div style={{ aspectRatio: `${appItem.width / appItem.height}` }} className="h-full">
        <iframe
          allow="clipboard-write"
          src={appItem.url}
          allowFullScreen={true}
          height={'100%'}
          width={'100%'}
        ></iframe>
      </div>
    </div>
  );
}
