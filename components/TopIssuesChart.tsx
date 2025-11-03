'use client'

import { Complaint } from '@/lib/types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Helper function to process the data
function processData(complaints: Complaint[]) {
  const categoryCounts: { [key: string]: number } = {}

  // Count occurrences of each category
  complaints.forEach((complaint) => {
    categoryCounts[complaint.category] = (categoryCounts[complaint.category] || 0) + 1
  })

  // Convert to array format that recharts understands
  return Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }))
}

export default function TopIssuesChart({ complaints }: { complaints: Complaint[] }) {
  const data = processData(complaints)

  return (
    // ResponsiveContainer makes the chart fit its parent div
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}