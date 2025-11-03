// This defines the structure of our complaint data
export type Complaint = {
  id: number;
  created_at: string;
  category: string;
  description: string;
  image_url: string;
  latitude: number;
  longitude: number;
  neighborhood: string;
};