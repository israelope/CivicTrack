'use client' // This must be a client component

import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

// This component is the "brains" of the map
function LocationMarker({ onPositionChange }: { onPositionChange: (pos: [number, number]) => void }) {
  // Start with a state for the position
  const [position, setPosition] = useState<[number, number] | null>(null)

  // Get the map instance and add a click event listener
  const map = useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng]
      setPosition(newPos)
      onPositionChange(newPos) // Pass the new position back to the parent form
      map.flyTo(e.latlng, map.getZoom()) // Center the map on the new marker
    },
  })

  // Render the marker at the clicked position
  return position === null ? null : (
    <Marker position={position}></Marker>
  )
}

// This is the main component you'll import into your page
export default function MapPicker({ onPositionChange }: { onPositionChange: (pos: [number, number]) => void }) {
  return (
    <MapContainer
      center={[9.0820, 8.6753]} // Default center (approx. center of Nigeria)
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onPositionChange={onPositionChange} />
    </MapContainer>
  )
}