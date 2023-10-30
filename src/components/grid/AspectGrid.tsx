import { AppItem } from '@/services/apps/types/AppItem';
import { FlexLayout, flexLayoutValue } from '@/types/UI/ResponseLayout';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
interface AspectGridProps extends FlexLayout {
  apps: AppItem[];
}
export default function AspectGrid({ apps, ...props }: AspectGridProps) {
  const { gutter, span, aspect } = { ...flexLayoutValue, ...props };
  return (
    <Row gutter={gutter}>
      {apps.map((app) => {
        return (
          <Col {...span} key={app.id}>
            <Link href={`/player/${app.id}`}>
              <div className="border p-1 border-transparent rounded-md hover:border-purple-500 hover:shadow-xl shadow-purple-500/50 transition-shadow">
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
                  <span className="text-sm">{app.category}</span>
                </div>
              </div>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}
