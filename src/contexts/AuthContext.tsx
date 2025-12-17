import { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import postTokenObtainPair from "@services/accounts/postTokenObtainPair";
import setHeaderAuthorization from "@services/headerAuthorization";
import getConsumerRetreve from "@services/marketplace/getConsumerRetreve";
import RSS from "react-secure-storage"

export interface AuthCredentials {
  tokenAcess: string;
  tokenRefresh: string;
  userId: number;
  userRole: string;
  userData?: Record<string, any>;
}

interface AuthContextType {
  isVisitor: boolean;
  tokenAcess: string | null;
  tokenRefresh: string | null;
  userId: number | null;
  userRole: string | null;
  userData: any;

  handleCredentials: (creds: AuthCredentials) => void;
  updateUserData: (data: any) => void;
  cleanCredentials: () => void;

  login: (email: string, password: string, keepConnected: boolean) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [isVisitor, setIsVisitor] = useState(true);
  const [tokenAcess, setTokenAcess] = useState<string | null>(null);
  const [tokenRefresh, setTokenRefresh] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleCredentials = ({
    tokenAcess,
    tokenRefresh,
    userId,
    userRole,
    userData = {},
  }: AuthCredentials) => {
    setIsVisitor(false);
    setTokenAcess(tokenAcess);
    setTokenRefresh(tokenRefresh);
    setUserId(userId);
    setUserRole(userRole);
    setUserData(userData);
  };

  const updateUserData = (data: any) => setUserData(data);

  const cleanCredentials = () => {
    setHeaderAuthorization(false)

    RSS.removeItem("email")
    RSS.removeItem("pass")

    setIsVisitor(true);
    setTokenAcess(null);
    setTokenRefresh(null);
    setUserId(null);
    setUserRole(null);
    setUserData(null);
  };

  async function login(email: string, password: string, keepConnected: boolean): Promise<boolean> {
    console.log(email, password, keepConnected)
    
    try {
      const dataResquest = await postTokenObtainPair({ login: email, password })

      setHeaderAuthorization(dataResquest.tokens.access)

      const consumeRetrieve = await getConsumerRetreve()

      handleCredentials({
        tokenAcess: dataResquest.tokens.access,
        tokenRefresh: dataResquest.tokens.refresh,
        userId: dataResquest.user.id,
        userRole: dataResquest.user.role,
        userData: consumeRetrieve
      });

      if (keepConnected) {
        RSS.setItem("email", email)
        RSS.setItem("pass", password)
      }

      return true
    } catch (e) {
      console.error("Erro ao fazer login:", e);
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isVisitor,
        tokenAcess,
        tokenRefresh,
        userId,
        userRole,
        userData,

        handleCredentials,
        updateUserData,
        cleanCredentials,

        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
