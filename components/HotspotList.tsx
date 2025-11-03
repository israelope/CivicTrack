import { Complaint } from '@/lib/types'

// Helper function to process the data
function processData(complaints: Complaint[]) {
  const neighborhoodCounts: { [key: string]: number } = {}

  // Count occurrences of each neighborhood
  complaints.forEach((complaint) => {
    const neighborhood = complaint.neighborhood || 'Unknown'
    neighborhoodCounts[neighborhood] = (neighborhoodCounts[neighborhood] || 0) + 1
  })

  // Convert to a sorted array
  return Object.entries(neighborhoodCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count) // Sort descending
}

export default function HotspotList({ complaints }: { complaints: Complaint[] }) {
  const data = processData(complaints)

  return (
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200">
        {data.map((area) => (
          <li key={area.name} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-gray-900 truncate">
                  {area.name}
                </p>
              </div>
              <div className="inline-flex items-center text-xl font-semibold text-gray-900">
                {area.count}
                <span className="text-sm font-normal text-gray-500 ml-2">reports</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}