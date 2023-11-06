import { AppItem } from '@/services/apps/types/AppItem';
import { FlexLayout, flexLayoutValue } from '@/types/UI/ResponseLayout';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { UrlObject } from 'url';
interface AspectGridProps extends FlexLayout {
  apps: AppItem[];
  extraRender?: (app: AppItem, index: number) => ReactNode;
  action?: (app: AppItem) => string | UrlObject;
}
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
              <div className="border p-1 border-transparent rounded-md hover:border-purple-500 hover:shadow-xl shadow-purple-500/50 transition-shadow relative">
                <div className={`w-full relative rounded overflow-hidden ${aspect}`}>
                  <Image
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsrm+1AAAE1QHBsN4A3AAAAABJRU5ErkJggg=="
                    src={app.thumb}
                    alt=""
                    sizes="100%"
                    loading="lazy"
                    fill
                  />
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
