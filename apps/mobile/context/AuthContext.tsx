import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

type AuthContextType = {
  isLoggedIn: boolean;
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
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
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
        setIsLoggedIn(true);
        await AsyncStorage.multiSet([
          ["authToken", token],
          ["authUser", JSON.stringify(res.data)],
        ]);
      } catch (error) {
        await AsyncStorage.multiRemove(["authToken", "authUser"]);
        delete api.defaults.headers.Authorization;
        setUser(null);
        setIsLoggedIn(false);
      }
    }

    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    await AsyncStorage.setItem("authToken", res.data.token);
    await AsyncStorage.setItem("authUser", JSON.stringify(res.data.user));
    api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
    setUser(res.data.user);
    setIsLoggedIn(true);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/register", { name, email, password });
    await AsyncStorage.setItem("authToken", res.data.token);
    await AsyncStorage.setItem("authUser", JSON.stringify(res.data.user));
    api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
    setUser(res.data.user);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["authToken", "authUser"]);
    delete api.defaults.headers.Authorization;
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
