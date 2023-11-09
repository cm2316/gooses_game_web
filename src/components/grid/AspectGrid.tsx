import { AppItem } from '@/services/apps/types/AppItem';
import { GameSource } from '@/types/BaseEnum';
import { FlexLayout, flexLayoutValue } from '@/types/UI/ResponseLayout';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { UrlObject } from 'url';
import { Logo_Base64 } from '../constant';
interface AspectGridProps extends FlexLayout {
  apps: AppItem[];
  extraRender?: (app: AppItem, index: number) => ReactNode;
  action?: (app: AppItem) => string | UrlObject;
}
const FromTypeName = {
  [GameSource.Pix]: 'P',
  [GameSource.Distribution]: 'D',
  [GameSource.Monetise]: 'M',
};
export default function AspectGrid({ apps, extraRender, ...props }: AspectGridProps) {
  const {
    gutter,
    span,
    aspect,
    action = (app: AppItem) => `/games/${app.id}`,
  } = { ...flexLayoutValue, ...props };
  return (
    <Row gutter={gutter}>
      {apps.map((app, index) => {
        return (
          <Col {...span} key={app.id}>
            <Link href={action(app)}>
              <div className="ring-1 ring-transparent p-1 rounded-md shadow-purple-500/50 transition-shadow relative hover:ring-purple-500 hover:shadow-xl">
                <div className={`w-full relative rounded overflow-hidden ${aspect}`}>
                  <Image
                    placeholder="blur"
                    blurDataURL={Logo_Base64}
                    src={app.thumb}
                    alt=""
                    sizes="100%"
                    loading="lazy"
                    fill
                  />
                  <span className="flex invisible items-center justify-center right-0 absolute rounded-bl-2xl w-8 h-8 bg-purple-500 text-slate-100 shadow-sm shadow-slate-500">
                    {FromTypeName[app.from]}
                  </span>
                </div>
                <div className="text-slate-700 py-2">
                  <h3 className="truncate text-base w-full font-medium">{app.title}</h3>
                </div>
                {extraRender && extraRender(app, index)}
              </div>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}
