import apiRecycling from "./apiRecycling"

interface response {
  id: number;
  name: string;
  description: string;
  quantity_gram: number;
  is_available: boolean;
  created_at: string;
  category: number;
  consumer: number;
  recycler: any | null;
  recycling_location: number;
}

export default async function getMaterialsMy(): Promise<response[]> {
  const response = await apiRecycling.get('materials/my/')
  return response.data
}