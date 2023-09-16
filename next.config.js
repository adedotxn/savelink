/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/board",
        permanent: true,
      },
    ];
  },

  experimental: {
    serverActions: true,
  },
});

const configWithBundleAnalyzer = withBundleAnalyzer(nextConfig);

module.exports = configWithBundleAnalyzer;
