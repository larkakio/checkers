/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: false },
  webpack: (config, { isServer }) => {
    if (isServer) return config
    config.resolve.fallback = { fs: false, path: false, encoding: false }
    return config
  },
}

module.exports = nextConfig
