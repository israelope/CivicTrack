import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fokulqjoozrbfhjbmdzh.supabase.co', // <-- This was the missing property
        port: '',
        pathname: '/storage/v1/object/public/complaint_images/**', // Only allows images from this bucket
      },
    ],
  },
}

export default config