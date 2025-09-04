/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Set the correct workspace root to silence the lockfile warning
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
