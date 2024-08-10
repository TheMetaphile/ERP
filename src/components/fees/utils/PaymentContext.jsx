// PaymentContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(()=>{
        console.log(paymentDetails, "form context !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    },[paymentDetails]);

    return (
        <PaymentContext.Provider value={{ paymentDetails, setPaymentDetails }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = () => useContext(PaymentContext);
