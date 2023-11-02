import ShareButtons from '@/components/base/ShareButtons';
import AntdRegistry from '@/lib/AntdRegistry';
import theme from '@/theme/themeConfig';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.game520.online'),
  description: 'Gooes Fun is a wonderful game play platform!',
  keywords: ['HTML5', 'Game', 'Gooes', 'Fun', 'Player', 'HTML5 Game'],
  authors: [{ name: 'game520.online' }],
  generator: 'Gooes Fun',
  applicationName: 'Gooes Fun',
  title: {
    default: 'Gooes Fun',
    template: '%s | Gooes Fun',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1703856267668034"
        />
      </head>
      <body>
        <ConfigProvider theme={theme}>
          <AntdRegistry>{children}</AntdRegistry>

          <ShareButtons />
        </ConfigProvider>
      </body>
    </html>
  );
}
