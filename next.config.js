/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')

const withPWA =  require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
})


const nextConfig = withPWA({
    reactStrictMode: true,
    redirects: async () => {
      return [
        {
          source: '/',
          destination: '/board',
          permanent: true,
        },
      ];
    },
});

module.exports = nextConfig;