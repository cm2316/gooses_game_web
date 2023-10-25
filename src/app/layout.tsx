// 'use client';
import AntdRegistry from '@/lib/AntdRegistry';
import theme from '@/theme/themeConfig';
import { ConfigProvider } from 'antd';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       refetchOnWindowFocus: false,
  //       refetchOnReconnect: false,
  //       retry: 0,
  //       staleTime: 0,
  //       cacheTime: 0,
  //     },
  //   },
  // });
  return (
    <html lang="en">
      <body>
        <ConfigProvider theme={theme}>
          {/* <QueryClientProvider client={queryClient}> */}
          <AntdRegistry>{children}</AntdRegistry>
          {/* </QueryClientProvider> */}
        </ConfigProvider>
      </body>
    </html>
  );
}
