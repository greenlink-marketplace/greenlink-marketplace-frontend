import apiMarketplace from "./apiMarketplace"

interface response extends PaginationStructure {
  results: ProductPagination[]
}

export default async function getProductSearch(search_term: string): Promise<response> {
  const response = await apiMarketplace.get(
    `products/search/?search=${search_term}`
  )
  return response.data
}