import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../Context/AuthContext.jsx";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading.jsx";
import TransactionHistoryHeader from "./TransactionHistoryHeader";
import TransactionField from "./TransactionField.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Fee } from "../../../Config.js";
import { usePaymentContext } from "./PaymentContext.jsx";

export default function TransactionRow() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const paymentDetail = usePaymentContext();
    const {setPaymentDetails} = paymentDetail;

    useEffect(() => {
        if (authState.accessToken) {
            setLoading(true);
            fetchTransaction();
        } else {
            toast.error('No access token available');
        }
    }, [authState.accessToken]);

    const fetchTransaction = async () => {
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/transactions`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response transaction:", response.data);
            setPaymentDetails(response.data.transactions);
        }
        catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-fit mb-4 shadow-md rounded-lg border border-gray-300   overflow-x-auto no-scrollbar">
            <TransactionHistoryHeader />
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <TransactionField />
                </div>
            )}

        </div>
    );
}
