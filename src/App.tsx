import AppRoutes from "@routes/index";
import { AuthProvider } from "@contexts/AuthContext";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";
import RSS from "react-secure-storage"

function AutoAuthenticated() {
  const { isVisitor, login, cleanCredentials } = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function tryLogin() {
    if (!isVisitor)
      return

    setIsLoading(true)

    const email = RSS.getItem("email")?.toString()
    const pass = RSS.getItem("pass")?.toString()

    if (email != null && pass != null) {
      const success = await login(email, pass, true)

      if (!success)
        cleanCredentials()
    }

    setIsLoading(false)
  }

  useEffect(() => {
    tryLogin()
  }, [])

  if (isLoading)
    return null

  return <AppRoutes />
}

function App() {
  return (
    <AuthProvider>
      <AutoAuthenticated />
    </AuthProvider>
  )
}

export default App
