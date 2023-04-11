/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.net = 'empty';
      config.resolve.fallback.fs = 'empty';
      config.resolve.fallback.tls = 'empty';
      config.resolve.fallback.dns = 'empty';
    }

    return config;
  },
};

module.exports = nextConfig;