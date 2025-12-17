import apiRecycling from "./apiRecycling"

export default async function getLocations(
  latitude_max: number,
  latitude_min: number,
  longitude_max: number,
  longitude_min: number
) {
  const response = await apiRecycling.get(
    `locations/?latitude_max=${latitude_max}&latitude_min=${latitude_min}&longitude_max=${longitude_max}&longitude_min=${longitude_min}`
  )
  return response.data
}