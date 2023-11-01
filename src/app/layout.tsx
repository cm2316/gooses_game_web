import ShareButtons from '@/components/base/ShareButtons';
import AntdRegistry from '@/lib/AntdRegistry';
import theme from '@/theme/themeConfig';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.game520.online'),
  title: 'Gooes Fun',
  openGraph: {
    title: 'Gooes Fun',
    description: 'Gooes Fun is a wonderful game play platform!',
  },
  twitter: {
    title: 'Gooes Fun',
    description: 'Gooes Fun is a wonderful game play platform!',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1703856267668034"
          crossOrigin="anonymous"
        />
      </head> */}
      <body>
        <ConfigProvider theme={theme}>
          <AntdRegistry>{children}</AntdRegistry>

          <ShareButtons />
        </ConfigProvider>
      </body>
    </html>
  );
}
