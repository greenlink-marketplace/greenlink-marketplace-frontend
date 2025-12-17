import apiAccounts from "./apiAccounts"

interface tokenObtainPairProps {
  login: string,
  password: string
}

interface response {
  tokens: {
    refresh: string;
    access: string
  },
  user: {
    id: number;
    role: "consumer"
  }
}

export default async function postTokenObtainPair(
  { login, password }: tokenObtainPairProps
): Promise<response> {
  const response = await apiAccounts.post('token/', { login, password })
  return response.data
}
