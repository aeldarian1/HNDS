/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/o-nama', permanent: true },
      { source: '/events', destination: '/aktivnosti', permanent: true },
      { source: '/gallery', destination: '/galerija', permanent: true },
      { source: '/kronike', destination: '/vijesti', permanent: true },
      { source: '/contact', destination: '/kontakt', permanent: true },
    ]
  },
}

module.exports = nextConfig
