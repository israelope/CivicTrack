'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Complaint } from '@/lib/types' // Import the type we just made
import Image from 'next/image'

// This component receives the list of complaints as a 'prop'
export default function LiveMap({ complaints }: { complaints: Complaint[] }) {
  return (
    <MapContainer
      center={[9.0820, 8.6753]} // Default center (approx. center of Nigeria)
      zoom={6}
      scrollWheelZoom={true} // Allow zooming
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Loop over every complaint and create a Marker for it */}
      {complaints.map((complaint) => (
        <Marker
          key={complaint.id}
          position={[complaint.latitude, complaint.longitude]}
        >
          {/* This is the popup that appears when you click a marker */}
          <Popup>
            <div className="w-60">
              <h3 className="font-bold text-lg mb-1">{complaint.category}</h3>
              <p className="text-sm text-gray-600 mb-2">{complaint.neighborhood}</p>
              
              {/* Show the image */}
              <div className="relative w-full h-40 rounded-md overflow-hidden mb-2">
                <Image
                  src={complaint.image_url}
                  alt={complaint.description}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-sm">{complaint.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                Reported: {new Date(complaint.created_at).toLocaleDateString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}