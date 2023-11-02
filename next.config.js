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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }); // 针对 SVG 的处理规则

    return config;
  },
  poweredByHeader: false,
  images: {
    domains: [
      'cdn.game520.online',
      'img.gamedistribution.com',
      'img.gamemonetize.com',
      'games.assets.gamepix.com',
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
