import React, { createContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL_Login } from "../Config";


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
        Co_scholastic: null,
        subjects: null,
        token: null

    });

    const login = (userDetails, tokens, subject, ClassDetails, Co_scholastic, subjects, token) => {
        setAuthState({
            userDetails,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            otpToken: null,
            subject,
            ClassDetails,
            Co_scholastic,
            subjects,
            token

        });
        console.log("auth user", userDetails);
        console.log("auth access", tokens.accessToken);
        console.log("auth refre", tokens.refreshToken);
        console.log("auth adhaar", userDetails.aadhaarNumber);
        console.log("auth subject", subject);
        console.log("auth ClassDetails", ClassDetails);
        console.log("auth student side subjects", subjects);
        console.log("notification", token);

    };

    const logout = async () => {
        await removeToken();
        setAuthState({
            userDetails: null,
            accessToken: null,
            refreshToken: null,
            otpToken: null,
            token: null
        });

        console.log("logout complete")
    };

    const removeToken = async () => {
        console.log(authState.accessToken)
        try {
            const response = await axios.delete(
                `${BASE_URL_Login}/notification/removeToken`,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    },
                    data: {
                        token: authState.token
                    }
                }
            );
            if (response.status === 200) {
                console.log('token removed', response.data);
            }
        } catch (error) {
            console.error("Error removing token:", error);
        }
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