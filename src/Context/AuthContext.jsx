import React, { createContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        userDetails: null,
        accessToken: null,
        refreshToken: null,
        email: null,
        otpToken: null,
        subject: null,
        ClassDetails: null,
        Co_scholastic:null

    });

    const login = (userDetails, tokens,subject, ClassDetails,Co_scholastic) => {
        setAuthState({
            userDetails,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            otpToken: null,
            subject,
            ClassDetails,
            Co_scholastic

        });
        console.log("auth user", userDetails);
        console.log("auth access", tokens.accessToken);
        console.log("auth refre", tokens.refreshToken);
        console.log("auth adhaar", userDetails.aadhaarNumber);
        console.log("auth subject", subject);
        console.log("auth ClassDetails", ClassDetails);

    };

    const logout = () => {
        setAuthState({
            userDetails: null,
            accessToken: null,
            refreshToken: null,
            otpToken: null,

        });
        console.log("logout complete")
    };

    const reset = (email, otpToken) => {
        setAuthState({

            email,
            otpToken // Update otpToken in the auth state
        });
        console.log("auth ema", email);
        console.log("auth tok", otpToken);

    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, reset }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;