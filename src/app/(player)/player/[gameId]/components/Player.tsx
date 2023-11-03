import { AppItem } from '@/services/apps/types/AppItem';
export interface PLayerProps {
  app: AppItem;
}
export default function Player({ app }: PLayerProps) {
  return (
    <div
      style={{
        aspectRatio: `${app.width / app.height}`,
        height: `calc(100% - 64px)`,
      }}
      className="h-full max-w-full mx-auto max-md:w-full max-md:aspect-auto"
    >
      <iframe
        id="PlayerContainer"
        allow="clipboard-write"
        src={app.url}
        allowFullScreen={true}
        height={'100%'}
        width={'100%'}
      />
    </div>
  );
}
