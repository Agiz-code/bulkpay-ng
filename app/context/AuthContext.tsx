import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

type AuthContextType = {
  isLoggedIn: boolean;
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    await AsyncStorage.setItem("authToken", res.data.token);
    api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
    setUser(res.data.user);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    delete api.defaults.headers.Authorization;
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
