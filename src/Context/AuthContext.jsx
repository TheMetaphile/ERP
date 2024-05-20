import React, { createContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        userDetails: null,
        accessToken: null,
        refreshToken: null,
        email:null,
        otpToken:null,
    });

    const login = (userDetails, tokens) => {
        setAuthState({
            userDetails,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        otpToken:null,
            
        });
        console.log("auth user",userDetails);
        console.log("auth access",tokens.accessToken);
        console.log("auth refre",tokens.refreshToken);
        console.log("auth adhaar",userDetails.aadhaarNumber);

    };

    const logout = () => {
        setAuthState({
            userDetails: null,
            accessToken: null,
            refreshToken: null,
        otpToken:null,

        });
        console.log("logout complete")
    };

    const reset = (email,otpToken) => {
        setAuthState( {
           
            email,
            otpToken // Update otpToken in the auth state
        });
        console.log("auth ema",email);
        console.log("auth tok",otpToken);

    };

    return (
        <AuthContext.Provider value={{ authState, login, logout ,reset}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;