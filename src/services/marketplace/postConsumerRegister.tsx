import apiMarketplace from "./apiMarketplace"

interface Props {
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  cpf: string,
  phone: string,
  address: string,
  password: string
}

export default async function postConsumerRegister({
  first_name,
  last_name,
  username,
  email,
  cpf,
  phone,
  address,
  password
}: Props) {
  var requestData = {
    first_name,
    last_name,
    username,
    email,
    cpf,
    phone,
    address,
    password
  }
  const response = await apiMarketplace.post('register/consumer/', requestData)
  return response.data
}