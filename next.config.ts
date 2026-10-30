import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Static export: no optimizer; the loader asks Unsplash for the width each device needs
  images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts' },
};

export default withNextIntl(nextConfig);
