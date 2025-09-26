// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Production optimizations
//   compress: true,
//   poweredByHeader: false,
//   generateEtags: true,
  
//   // Image optimization
//   images: {
//     domains: [],
//     formats: ['image/webp', 'image/avif'],
//     minimumCacheTTL: 60,
//   },

//   // Security headers
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-Frame-Options',
//             value: 'DENY',
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'origin-when-cross-origin',
//           },
//           {
//             key: 'X-DNS-Prefetch-Control',
//             value: 'on',
//           },
//         ],
//       },
//       {
//         source: '/api/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'no-cache, no-store, must-revalidate',
//           },
//         ],
//       },
//       {
//         source: '/_next/static/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//     ];
//   },

//   // Redirects for SEO
//   async redirects() {
//     return [
//       // Add any redirects you need here
//     ];
//   },

//   // Environment variables validation
//   env: {
//     NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
//     NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
//     NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
//     NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
//   },

//   // Webpack configuration for production
//   webpack: (config, { dev, isServer }) => {
//     // Production optimizations
//     if (!dev && !isServer) {
//       config.optimization.splitChunks = {
//         chunks: 'all',
//         cacheGroups: {
//           default: {
//             minChunks: 2,
//             priority: -20,
//             reuseExistingChunk: true,
//           },
//           vendor: {
//             test: /[\\/]node_modules[\\/]/,
//             name: 'vendors',
//             priority: -10,
//             chunks: 'all',
//           },
//         },
//       };
//     }

//     return config;
//   },

//   // Experimental features
//   experimental: {
//     optimizeCss: true,
//     optimizePackageImports: ['react-icons'],
//   },

//   // Output configuration
//   output: 'standalone', // For Docker deployment
// };

// module.exports = nextConfig;




/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
