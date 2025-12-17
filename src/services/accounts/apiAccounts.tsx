import apiMaster from '../apiMaster'

const ACCOUNTS_ROUTE = 'accounts/'

// Função genérica para requests dentro de /accounts/
const apiAccounts = {
  post: (endpoint: string, data?: any, config?: any) => apiMaster.post(`${ACCOUNTS_ROUTE}${endpoint}`, data, config),
  get: (endpoint: string, config?: any) => apiMaster.get(`${ACCOUNTS_ROUTE}${endpoint}`, config),
  put: (endpoint: string, data?: any, config?: any) => apiMaster.put(`${ACCOUNTS_ROUTE}${endpoint}`, data, config),
  delete: (endpoint: string, config?: any) => apiMaster.delete(`${ACCOUNTS_ROUTE}${endpoint}`, config),
}

export default apiAccounts
