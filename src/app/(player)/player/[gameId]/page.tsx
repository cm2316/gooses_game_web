import AppService from '@/services/apps/service';
export default async function Player({ params }: { params: { gameId: string } }) {
  const { gameId } = params;
  const { data: appItem } = await AppService.getByIdMemo(gameId);
  return (
    <div
      id="GameContainer"
      className="h-full flex justify-center bg-slate-950 opacity-90"
      style={{
        backgroundImage: `url(${appItem.tile})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <iframe
        sandbox="allow-scripts allow-popups allow-same-origin allow-pointer-lock"
        allow="clipboard-write"
        src={appItem.playUrl}
        allowFullScreen={true}
        width={'100%'}
        height={'100%'}
        className="max-w-5xl"
      ></iframe>
    </div>
  );
}
