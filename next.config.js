/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: [],
    loader: 'default',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/about', destination: '/o-nama', permanent: true },
      { source: '/events', destination: '/aktivnosti', permanent: true },
      { source: '/gallery', destination: '/galerija', permanent: true },
      { source: '/kronike', destination: '/vijesti', permanent: true },
      { source: '/contact', destination: '/kontakt', permanent: true },
    ];
  },
};

module.exports = nextConfig;
