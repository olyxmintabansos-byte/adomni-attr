import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/adomni-attr',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
