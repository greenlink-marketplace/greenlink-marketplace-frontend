import apiMarketplace from "./apiMarketplace"

interface response {
  id: number;
  product: ProductPagination;
  saved_at: string
}

export default async function getSavedProductsList(): Promise<response[]> {
  const response = await apiMarketplace.get('saved-products/list/')
  return response.data
}