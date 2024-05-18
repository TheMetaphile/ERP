import React, { createContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        userDetails: null,
        accessToken: null,
        refreshToken: null,
    });

    const login = (userDetails, tokens) => {
        setAuthState({
            userDetails,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    };

    const logout = () => {
        setAuthState({
            userDetails: null,
            accessToken: null,
            refreshToken: null,
        });
        console.log("logout complete")
    };

    

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;