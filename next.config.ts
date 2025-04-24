import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.amazonaws.com'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.glitch.global',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*.amazonaws.com'],
    },
  }
  // async headers() {
  //   return [
  //     {
  //       // Apply CORS headers to all routes
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET, POST, PUT, DELETE, OPTIONS',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: 'X-Requested-With, Content-Type, Authorization',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Credentials',
  //           value: 'true',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
