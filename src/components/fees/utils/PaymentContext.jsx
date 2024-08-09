// PaymentContext.js
import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [paymentDetails, setPaymentDetails] = useState(null);

    return (
        <PaymentContext.Provider value={{ paymentDetails, setPaymentDetails }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = () => useContext(PaymentContext);
