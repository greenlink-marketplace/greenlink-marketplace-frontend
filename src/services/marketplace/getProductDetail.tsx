import apiMarketplace from "./apiMarketplace"

interface response {
    id: number;
    name: string;
    description: string;
    price_cents: number;
    quantity: number;
    purchase_contact: string;
    category: string;
    company: string;
    is_sustainable: boolean;
    created_at: string;
    is_saved_by_consumer: boolean | null;
    image: string;
}

export default async function getProductDetail(product_id: number): Promise<response> {
    const response = await apiMarketplace.get(`products/detail/${product_id}/`)
    return response.data
}