// PaymentContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [statsDetails, setStatsDetails] = useState(null);


    useEffect(() => {
        console.log(paymentDetails, "form context !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(statsDetails, "form context !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

    }, [paymentDetails, statsDetails]);

    return (
        <PaymentContext.Provider value={{ paymentDetails, setPaymentDetails, statsDetails, setStatsDetails }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = () => useContext(PaymentContext);
