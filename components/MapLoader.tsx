'use client' // This is the key: this is a Client Component

import dynamic from 'next/dynamic'
import { Complaint } from '@/lib/types'

// Now, we do the dynamic import *inside* this client component
const LiveMap = dynamic(() => import('@/components/LiveMap'), {
  ssr: false,
  loading: () => <p className="h-full w-full flex items-center justify-center">Loading map...</p>
})

// This component just receives the complaints and passes them to the map
export default function MapLoader({ complaints }: { complaints: Complaint[] }) {
  return <LiveMap complaints={complaints} />
}