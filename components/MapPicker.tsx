'use client' 

import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet-defaulticon-compatibility'

// Define the new props for the component
interface MapPickerProps {
  onPositionChange: (pos: [number, number]) => void;
  onNeighborhoodChange: (name: string) => void; // <-- New prop
}

function LocationMarker({ onPositionChange, onNeighborhoodChange }: MapPickerProps) {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const map = useMapEvents({
    async click(e) {
      setIsLoading(true) // Start loading
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng]
      
      // 1. Update position state and fly map
      setPosition(newPos)
      onPositionChange(newPos)
      map.flyTo(e.latlng, map.getZoom())

      // 2. Start reverse geocoding fetch
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPos[0]}&lon=${newPos[1]}`
        )
        const data = await response.json()
        
        // 3. Build a simple, clean name from the address details
        const address = data.address || {}
        const neighborhood = address.neighbourhood || address.suburb || address.road || 'Unknown Area'
        
        // 4. Send the name back to the form
        onNeighborhoodChange(neighborhood)
        
      } catch (error) {
        console.error("Error reverse geocoding:", error)
        onNeighborhoodChange("Error finding name")
      } finally {
        setIsLoading(false) // Stop loading
      }
    },
  })

  return (
    <>
      {isLoading && (
        <div className="leaflet-top leaflet-center">
          <div className="leaflet-control leaflet-bar p-2 bg-white shadow">
            Loading area...
          </div>
        </div>
      )}
      {position !== null && <Marker position={position}></Marker>}
    </>
  )
}

export default function MapPicker({ onPositionChange, onNeighborhoodChange }: MapPickerProps) {
  
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
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker 
        onPositionChange={onPositionChange} 
        onNeighborhoodChange={onNeighborhoodChange} 
      />
    </MapContainer>
  )
}