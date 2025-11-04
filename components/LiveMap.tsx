'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Complaint } from '@/lib/types'
import Image from 'next/image'

// --- ADD THIS JS IMPORT ---
import 'leaflet-defaulticon-compatibility'
// ---------------------------

// This component receives the list of complaints as a 'prop'
export default function LiveMap({ complaints }: { complaints: Complaint[] }) {

  // -----------------------------------------------------------------
  // -- 📍 CUSTOMIZE MAP LOCATION --
  //
  // Set your community's default location and zoom level here.
  // Example for Bengaluru, India:
  // -----------------------------------------------------------------
  const defaultCenter: [number, number] = [12.97, 77.59]; // Bengaluru
  const defaultZoom = 11; // Zoom level for a city
  
  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {complaints.map((complaint) => (
        <Marker
          key={complaint.id}
          position={[complaint.latitude, complaint.longitude]}
        >
          <Popup>
            <div className="w-60">
              <h3 className="font-bold text-lg mb-1">{complaint.category}</h3>
              <p className="text-sm text-gray-600 mb-2">{complaint.neighborhood}</p>
              
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