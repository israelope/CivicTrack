import { createClient } from '@supabase/supabase-js' // Make sure this import is correct
import { Complaint } from '@/lib/types'
// We no longer need dynamic import here
// import dynamic from 'next/dynamic' 
import { headers } from 'next/headers'

// Import your new wrapper component instead
import MapLoader from '@/components/MapLoader'

// This function fetches all complaints from Supabase (Stays the same)
async function getComplaints() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching complaints:', error)
    return []
  }

  return data as Complaint[]
}


// This is the main server page component
export default async function MapPage() {
  // 1. Fetch data on the server
  const complaints = await getComplaints()

  // 2. Render the page
  return (
    <div className="h-[calc(100vh-80px)] w-full">
      {/* Render the MapLoader component and pass the
        server-fetched complaints to it as a prop
      */}
      <MapLoader complaints={complaints} />
    </div>
  )
}