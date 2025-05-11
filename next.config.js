/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', 'aurasec-folio.vercel.app'],
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Remove webpack configuration that was causing issues
}

module.exports = nextConfig
