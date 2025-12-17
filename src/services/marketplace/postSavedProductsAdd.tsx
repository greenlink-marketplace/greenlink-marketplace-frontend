import apiMarketplace from "./apiMarketplace"

interface response {
    id: number;
    product_id: number;
    saved_at: string;
}

export default async function postSavedProductAdd(product_id: number): Promise<response> {
    var requestData = { product_id }
    const response = await apiMarketplace.post('saved-products/add/', requestData)
    return response.data
}