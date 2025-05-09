import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['ec2-13-52-61-50.us-west-1.compute.amazonaws.com'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.glitch.global',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['ec2-13-52-61-50.us-west-1.compute.amazonaws.com'],
    },
  }
};

export default nextConfig;
