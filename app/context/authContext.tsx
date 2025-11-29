'use client'
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface RegisterContext {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const authContext = createContext({} as RegisterContext);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    const tokenFromStorage = localStorage.getItem("token");
    return tokenFromStorage ? tokenFromStorage : null;
  });

  const router = useRouter();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  }

  console.log("AuthContext token:", token);

  return (
    <authContext.Provider value={{ token, setToken, logout }}>
      {children}
    </authContext.Provider>
  );
};
