/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: '.next',
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
  experimental: {
    legacyBrowsers: false,
  }
}

module.exports = nextConfig
