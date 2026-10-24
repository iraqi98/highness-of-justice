import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { withBase } from '@/config/base-path';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name.ar,
    short_name: site.shortName.ar,
    start_url: withBase('/ar/'),
    display: 'standalone',
    background_color: '#141641',
    theme_color: '#141641',
    icons: [
      { src: withBase('/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: withBase('/icon-512.png'), sizes: '512x512', type: 'image/png' },
    ],
  };
}
