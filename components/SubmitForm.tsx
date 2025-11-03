'use client' 

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient' 
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic' // <-- Import dynamic


// Dynamically import the MapPicker, disable Server-Side Rendering (ssr)
const MapPicker = dynamic(() => import('@/components/MapPicker'),  {
  ssr: false,
  loading: () => <p>Loading map...</p> // Show a loading message
})

export default function SubmitForm() {
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  
  // Remove old latitude/longitude state
  // const [latitude, setLatitude] = useState('')
  // const [longitude, setLongitude] = useState('')

  // Add new state for the map's position
  const [position, setPosition] = useState<[number, number] | null>(null)
  
  const [neighborhood, setNeighborhood] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  // This handler will be passed to the MapPicker component
  const handlePositionChange = (pos: [number, number]) => {
    setPosition(pos)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Update validation to check for 'position'
    if (!category || !description || !file || !position || !neighborhood) {
      setError('Please fill out all fields, upload a photo, and select a location on the map.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 1. Upload the image to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${fileName}` 

      const { error: uploadError } = await supabase.storage
        .from('complaint_images') 
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // 2. Get the public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from('complaint_images')
        .getPublicUrl(filePath)

      const imageUrl = urlData.publicUrl

      // 3. Send all data to our API route
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          description,
          imageUrl,
          latitude: position[0], // <-- Get from 'position' state
          longitude: position[1], // <-- Get from 'position' state
          neighborhood,
        }),
      })

      if (!response.ok) {
        const resJson = await response.json()
        throw new Error(resJson.error || 'Failed to submit complaint')
      }
      
      setIsLoading(false)
      alert('Complaint submitted successfully!')
      router.push('/') 
      router.refresh() // Refresh the page to clear the form

    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold mb-6">Report a New Issue</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category and Description fields (no change) */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select a category</option>
            <option value="Pothole">Pothole</option>
            <option value="Trash Buildup">Trash Buildup</option>
            <option value="Broken Streetlight">Broken Streetlight</option>
            <option value="Water Leak">Water Leak</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us what you see..."
          />
        </div>

        {/* File Upload (no change) */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* === NEW MAP SECTION === */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-800 mb-2">Location</h3>
          <p className="text-sm text-gray-600 mb-4">
            Click on the map to set the issue's location.
          </p>
          
          {/* This is the new map component */}
          <MapPicker onPositionChange={handlePositionChange} />
          
          {/* We still need the neighborhood field */}
          <div className="mt-4">
            <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
              Neighborhood / Area Name
            </label>
            <input 
              type="text" 
              id="neighborhood" 
              value={neighborhood} 
              onChange={(e) => setNeighborhood(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="e.g., Main Street Area" 
              required
            />
          </div>
        </div>
        {/* === END NEW MAP SECTION === */}

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  )
}