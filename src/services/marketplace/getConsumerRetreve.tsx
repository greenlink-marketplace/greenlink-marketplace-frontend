import apiMarketplace from "./apiMarketplace"

interface response {
    user: number;
    cpf: string;
    phone: string;
    address: string;
    green_credit_balance: number
}

export default async function getConsumerRetreve(): Promise<response> {
    const response = await apiMarketplace.get(`consumer/me/`)
    return response.data
}