import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context object
const AuthContext = createContext();

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
    // Central state for login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to simulate logging in after sign-up/login
    const login = () => {
        setIsLoggedIn(true);
    };

    // Function to simulate logging out (for future use)
    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom hook to easily use the context
export const useAuth = () => {
    return useContext(AuthContext);
};