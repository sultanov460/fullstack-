'use client'
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "@/types/user";

interface RegisterContext {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function refreshUser() {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, { withCredentials: true });

      setUser(res.data.user)

    } catch (e) {
      console.log(e);
      setUser(null)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function logout() {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <authContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </authContext.Provider>
  );
};
