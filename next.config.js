const path = require("path");

const wagmiConnectorsEsm = path.join(
  __dirname,
  "node_modules/@wagmi/connectors/dist/esm"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: false },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@checkers-wagmi/baseAccount": path.join(wagmiConnectorsEsm, "baseAccount.js"),
      "@checkers-wagmi/walletConnect": path.join(wagmiConnectorsEsm, "walletConnect.js"),
    };
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false, encoding: false };
      config.externals = config.externals || [];
      config.externals.push("pino-pretty", "lokijs");
    }
    return config;
  },
};

module.exports = nextConfig;
