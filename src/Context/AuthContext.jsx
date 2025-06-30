import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from "../Config";
import CryptoJS from 'crypto-js';
import Loading from '../LoadingScreen/Loading';

const hashData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'secret-key').toString();
};

const unhashData = (hashedData) => {
    const bytes = CryptoJS.AES.decrypt(hashedData, 'secret-key');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [authState, setAuthState] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });


    const navigate = useCallback((path) => {
        //console.log("Here")
        if (window.location.pathname !== path) {
            //console.log("Here")
            window.location.href = path;
        }
    }, []);

    const checkAuthState = useCallback(async () => {
        if (authState) {
            setIsLoading(false);

            return
        };

        const storedAuthState = localStorage.getItem('authState');

        //console.log("stored", storedAuthState);

        if (storedAuthState) {
            try {
                const decryptedAuthState = unhashData(storedAuthState);
                //console.log(decryptedAuthState, 'decrypt')
                setAuthState(decryptedAuthState);
                const currentURL = window.location.href.split('/')[3];
                if (!currentURL || currentURL != decryptedAuthState.role) {
                    navigate("/" + decryptedAuthState.role);
                }
                setIsLoading(false);

                return decryptedAuthState;
            } catch (error) {
                //console.error('Error decrypting auth state:', error);
                navigate('/'); // Redirect to login if decryption fails
            }
        } else {
            // If no auth state, redirect to login
            navigate('/');
        }
        setIsLoading(false);
        return null;
    }, []);


    // Initial auth state check
    useEffect(() => {
        checkAuthState();
    }, []);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'darkMode') {
                const newMode = JSON.parse(event.newValue);
                setDarkMode(newMode);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const updateAccessToken = useCallback((accessToken, authState) => {
        const newAuthState = { ...authState, accessToken };
        const hashedAuthState = hashData(newAuthState);
        localStorage.setItem('authState', hashedAuthState);
        setAuthState(newAuthState);

    }, [navigate]);



    const login = useCallback((userDetails, tokens, subject, ClassDetails, Co_scholastic, subjects, token) => {
        console.log(userDetails, tokens, subject, ClassDetails, Co_scholastic, subjects, token)
        const newAuthState = {
            userDetails,
            role: userDetails.rolee,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            otpToken: null,
            subject,
            ClassDetails,
            Co_scholastic,
            subjects,
            token
        };

        console.log("auth user", userDetails);
        console.log("auth access", tokens.accessToken);
        console.log("auth refre", tokens.refreshToken);
        console.log("auth adhaar", userDetails.aadhaarNumber);
        console.log("auth subject", subject);
        console.log("auth ClassDetails", ClassDetails);
        console.log("auth student side subjects", subjects);
        console.log("auth techer coscholastic", Co_scholastic);
        console.log("notification", token);

        // Encrypt and store auth state in localStorage
        const hashedAuthState = hashData(newAuthState);
        localStorage.setItem('authState', hashedAuthState);

        // Update local state
        setAuthState(newAuthState);
        navigate(`/${userDetails.role}`);
        // Navigate to dashboard or home page
    }, []);


    const logout = useCallback(() => {
        // Clear localStorage
        localStorage.removeItem('authState');

        // Reset auth state
        setAuthState(null);
        // console.log("logout complete")

        // Navigate to login page
        navigate('/');
    }, [navigate]);


    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'authState' && !event.newValue) {
                // If `authState` is removed from localStorage, trigger logout
                setAuthState(null);
                navigate('/');
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const reset = useCallback((email, otpToken) => {
        const newAuthState = {
            email,
            otpToken,
        };

        console.log("auth ema", email);
        console.log("auth tok", otpToken);
        // Encrypt and store auth state
        const hashedAuthState = hashData(newAuthState);
        sessionStorage.setItem('authState', hashedAuthState);

        // Update local state
        setAuthState(newAuthState);
    }, []);

    if (isLoading) {
        return <Loading />;
    }


    return (
        <AuthContext.Provider value={{
            authState,
            login,
            logout,
            reset,
            navigate,
            setAuthState,
            checkAuthState,
            updateAccessToken,
            darkMode,
            toggleDarkMode,
            isLoading
        }}>

            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;