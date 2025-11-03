import type { NextConfig } from 'next'

const config: NextConfig = {
  // --- ADD THIS LINE ---
  reactStrictMode: false,
  // ---------------------

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fokulqjoozrbfhjbmdzh.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/complaint_images/**',
      },
    ],
  },
}

export default config