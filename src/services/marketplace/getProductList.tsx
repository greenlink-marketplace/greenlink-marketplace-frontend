import apiMarketplace from "./apiMarketplace"

interface getProductListResponse extends PaginationStructure {
  results: ProductPagination[]
}

export default async function getProductList(): Promise<getProductListResponse> {
  const response = await apiMarketplace.get('products/list/')
  return response.data
}