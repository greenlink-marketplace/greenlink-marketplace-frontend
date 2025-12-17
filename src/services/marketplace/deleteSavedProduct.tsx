import apiMarketplace from "./apiMarketplace"

export default async function deleteSavedProduct(product_id: number): Promise<null> {
    const response = await apiMarketplace.delete(
        `saved-products/delete/${product_id}/`
    )
    return response.data
}