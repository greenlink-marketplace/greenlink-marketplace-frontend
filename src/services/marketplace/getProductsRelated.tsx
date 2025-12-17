import apiMarketplace from "./apiMarketplace"

export default async function getProductsRelated(productId: number): Promise<Product[]> {
  const response = await apiMarketplace.get(`products/related/${productId}/`)
  return response.data
}