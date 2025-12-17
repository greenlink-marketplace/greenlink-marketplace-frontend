import apiRecycling from "./apiRecycling"

export default async function getLocationDetails(locationId: number) {
  const response = await apiRecycling.get(
    `locations/${locationId}/`
  )
  return response.data
}