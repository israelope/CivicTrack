import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// This route will be at /api/complaints
export async function POST(request: Request) {
  const body = await request.json();

  // Get the data from the form
  const { category, description, imageUrl, latitude, longitude, neighborhood } = body;

  // We must use the service_role key to insert data from a server-side route
  // This uses the key you stored in .env.local
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Insert the data into the 'complaints' table
  const { data, error } = await supabaseAdmin
    .from('complaints')
    .insert({
      category,
      description,
      image_url: imageUrl,
      latitude,
      longitude,
      neighborhood,
    })
    .select();

  if (error) {
    console.error('Error inserting data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return the new complaint data
  return NextResponse.json({ complaint: data }, { status: 201 });
}