/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')
const { withSentryConfig } = require("@sentry/nextjs");

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

     // Optional build-time configuration options
  sentry: {
     tunnelRoute: "/monitoring-tunnel",
     hideSourceMaps: false
    // See the sections below for information on the following options:
    //   'Configure Source Maps':
    //     - disableServerWebpackPlugin
    //     - disableClientWebpackPlugin
    //     - hideSourceMaps
    //     - widenClientFileUpload
    //   'Configure Legacy Browser Support':
    //     - transpileClientSDK
    //   'Configure Serverside Auto-instrumentation':
    //     - autoInstrumentServerFunctions
    //     - excludeServerRoutes
    //   'Configure Tunneling to avoid Ad-Blockers':
    //     - tunnelRoute
  },
});



const sentryWebpackPluginOptions = {
  org: "batcave-6m",
  project: "javascript-nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);



