import apiMarketplace from "./apiMarketplace"

export default async function postCouponGenerate(
    product_id: number,
    green_credit_amount: number
) {
    var requestData = {
        product_id,
        green_credit_amount
    }
    console.log(requestData)
    const response = await apiMarketplace.post('coupon/generate/', requestData)
    return response.data
}
