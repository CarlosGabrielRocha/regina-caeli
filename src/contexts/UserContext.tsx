"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

import { getUserData } from "../actions/user/getUser/types";

import { toast } from "sonner";

import loginGoogleUserAction from "../actions/auth/google-login";

interface UserContextType {
  user: getUserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  getUser: (options?: { load?: boolean }) => Promise<void>;
  setUser: (user: getUserData | null) => void;
  googleLogin: (credential: string) => Promise<void>;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<getUserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(
    async ({ load = true }: { load?: boolean } = {}) => {
      if (load) setLoading(true);
      try {
        const response = await fetch(`/api/user/get-user`);
        const res = await response.json();
        setIsAuthenticated(res.authenticated);
        if (res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        if (load) setLoading(false);
      }
    },
    [],
  );

  const googleLogin = useCallback(
    async (credential: string) => {
      setLoading(true);
      try {
        const res = await loginGoogleUserAction({
          credential,
        });

        if (res.status === "invalid") {
          toast.error(res.message ?? "Erro ao fazer login", { duration: 5000 });
          setLoading(false);
        } else if (res.status === "ok") {
          await getUser();
        }
      } catch (error) {
        setLoading(false);
        toast.error("Falha na comunicação com o servidor", { duration: 5000 });
      }
    },
    [getUser],
  );

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        getUser,
        setUser,
        googleLogin,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
