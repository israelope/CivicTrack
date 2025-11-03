import { createClient } from '@supabase/supabase-js'
import { Complaint } from '@/lib/types'
import TopIssuesChart from '@/components/TopIssuesChart'
import HotspotList from '@/components/HotspotList'

export const dynamic = 'force-dynamic'

// This function fetches all complaints (same as the map page)
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
export default async function DashboardPage() {
  // 1. Fetch data on the server
  const complaints = await getComplaints()
  const totalReports = complaints.length

  return (
    <div className="max-w-4xl mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold mb-6">Community Dashboard</h1>

      {/* Simple Stat Card */}
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-8">
        <h2 className="text-xl font-medium">Total Reports Submitted</h2>
        <p className="text-5xl font-bold mt-2">{totalReports}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card for Top Issues */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Top Issues</h2>
          {/* We pass all data to the client chart component */}
          <TopIssuesChart complaints={complaints} />
        </div>

        {/* Card for Hotspot Areas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Hotspot Areas</h2>
          {/* We pass all data to the server list component */}
          <HotspotList complaints={complaints} />
        </div>
      </div>
    </div>
  )
}