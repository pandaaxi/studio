import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Example for allowing favicons from any domain if you were to implement favicon fetching:
      // {
      //   protocol: 'https',
      //   hostname: '**', 
      //   pathname: '/favicon.ico',
      // },
    ],
  },
};

export default nextConfig;
