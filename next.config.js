const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }); // 针对 SVG 的处理规则

    return config;
  },
  poweredByHeader: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `https://www.game520.online/api/:path*`,
  //     },
  //   ];
  // },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn.game520.online',
    //     pathname: '**',
    //   },
    // ],
    domains: ['cdn.game520.online', 'img.gamedistribution.com', 'img.gamemonetize.com'],
  },
  output: 'standalone',
};

module.exports = nextConfig;
