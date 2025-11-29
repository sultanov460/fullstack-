import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterContext {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  logout: () => void;
}

interface RegisterProviderProps {
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

  const navigate = useNavigate();

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
    navigate("/signin");
  }

  return (
    <authContext.Provider value={{ token, setToken, logout }}>
      {children}
    </authContext.Provider>
  );
};
