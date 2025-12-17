import apiMaster from '../apiMaster'

const RECYCLING_ROUTE = 'recycling/'

const apiRecycling = {
  post: (endpoint: string, data: any, config?: any) => apiMaster.post(`${RECYCLING_ROUTE}${endpoint}`, data, config),
  get: (endpoint: string, config?: any) => apiMaster.get(`${RECYCLING_ROUTE}${endpoint}`, config),
  put: (endpoint: string, data: any, config?: any) => apiMaster.put(`${RECYCLING_ROUTE}${endpoint}`, data, config),
  delete: (endpoint: string, config?: any) => apiMaster.delete(`${RECYCLING_ROUTE}${endpoint}`, config),
}

export default apiRecycling