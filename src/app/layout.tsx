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
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1703856267668034"
        /> */}
        <meta name="impact-site-verification" value="84072984-8428-4cb4-a1a8-e88a91349cae"></meta>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-6SWQF5EJGC"
        />
        <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6SWQF5EJGC');`,
          }}
        />
      </head>
      <body>
        <ConfigProvider theme={theme}>
          <AntdRegistry>{children}</AntdRegistry>

          <ShareButtons />
        </ConfigProvider>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WTKX3VJD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
      </body>
    </html>
  );
}
