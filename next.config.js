/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev }) => {
    // Avoid intermittent Windows filesystem cache issues like missing *.pack.gz
    // by using in-memory caching during development.
    if (dev) {
      config.cache = { type: 'memory' }
    }
    return config
  },
}

module.exports = nextConfig
