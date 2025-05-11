/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vercel.com', 'aurasec-folio.vercel.app'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    serverActions: {
      allowedOrigins: ['localhost:9002', 'aurasec-folio.vercel.app'],
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable Vercel Analytics
  analyticsId: process.env.VERCEL_ANALYTICS_ID,
  // Enable Vercel Speed Insights
  speedInsights: true,
  // Optimize bundle size
  webpack: (config, { dev, isServer }) => {
    // Optimize only in production
    if (!dev && !isServer) {
      // Replace React with Preact in production
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }
    return config
  },
}

module.exports = nextConfig
