import { AppItem } from '@/services/apps/types/AppItem';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function Index({ apps, linkTarget }: { apps: AppItem[]; linkTarget: string }) {
  return (
    <Row gutter={[12, 18]}>
      {apps.map((app) => {
        return (
          <Col xs={12} sm={8} md={6} lg={4} key={app.id}>
            <Link href={`/player/${app.id}`} target={linkTarget}>
              <div className="border p-1 border-transparent rounded-md hover:border-purple-500 hover:shadow-xl shadow-purple-500/50 transition-shadow">
                <div className="w-full aspect-square relative rounded overflow-hidden">
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
