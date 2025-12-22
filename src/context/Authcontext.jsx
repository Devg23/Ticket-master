import { createContext, useEffect, useMemo, useState } from "react";
import api, { setAuthHeader } from "../services/api";

// Create context with sensible defaults
export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: async () => {},
  setUser: () => {},
  setToken: () => {},
});

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getStoredUser);
  const [token, setTokenState] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    } else {
      setAuthHeader(null);
    }
  }, [token]);

  const syncUser = nextUser => {
    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(nextUser ?? null);
    window.dispatchEvent(new Event("authchange"));
  };

  // Login helper (can be used after API success)
  const login = (userData, accessToken = null) => {
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      setTokenState(accessToken);
    }
    syncUser(userData ?? null);
  };

  // Logout helper
  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      setTokenState(null);
      syncUser(null);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      setUser: syncUser,
      setToken: setTokenState,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
