import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Persist login state across page refreshes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const adminToken = localStorage.getItem("adminToken");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    if (adminToken) {
      setIsAdmin(true);
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("cart");
  };

  const adminLogin = (token) => {
    setIsAdmin(true);
    localStorage.setItem("adminToken", token);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isAdmin, login, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);