import apiMaster from '../apiMaster'

const MARKETPLACE_ROUTE = 'marketplace/'

// Função genérica para requests dentro de /accounts/
const apiMarketplace = {
  post: (endpoint: string, data: any, config?: any) => apiMaster.post(`${MARKETPLACE_ROUTE}${endpoint}`, data, config),
  get: (endpoint: string, config?: any) => apiMaster.get(`${MARKETPLACE_ROUTE}${endpoint}`, config),
  put: (endpoint: string, data: any, config?: any) => apiMaster.put(`${MARKETPLACE_ROUTE}${endpoint}`, data, config),
  delete: (endpoint: string, config?: any) => apiMaster.delete(`${MARKETPLACE_ROUTE}${endpoint}`, config),
}

export default apiMarketplace
