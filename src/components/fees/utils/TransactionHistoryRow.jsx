import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../../Context/AuthContext.jsx";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading.jsx";
import TransactionHistoryHeader from "./TransactionHistoryHeader";
import TransactionField from "./TransactionField.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../../Config.js";
import { usePaymentContext } from "./PaymentContext.jsx";
import { refreshAccessToken } from "../../../RefreshTokenHelper.js";

export default function TransactionRow({ darkMode }) {
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const paymentDetail = usePaymentContext();
    const { setPaymentDetails } = paymentDetail;
    const [data, setData] = useState([]);

    const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
    const textClass = darkMode ? 'text-gray-300' : 'text-gray-800';
    const noDataTextClass = darkMode ? 'text-gray-500' : 'text-gray-600';

    useEffect(() => {
        if (authState?.accessToken) {
            setLoading(true);
            fetchTransaction();
        } else {
            toast.error('No access token available');
        }
    }, [authState?.accessToken]);

    const fetchTransaction = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/fee/fetch/particularStudent/transactions?email=${authState?.userDetails?.email}`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });
            setData(response.data.transactions)
        }
        catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchTransaction();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div
            className={`
                w-full h-fit mb-4 shadow-md rounded-lg border 
                ${bgClass} ${borderClass} 
                overflow-x-auto no-scrollbar
            `}
        >
            {loading ? (
                <Loading />
            ) : data.length === 0 ? (
                <div className={`text-center p-4 ${noDataTextClass}`}>
                    No data available
                </div>
            ) : (
                <div>
                    <TransactionField
                        data={data}
                        darkMode={darkMode}
                    />
                </div>
            )}
        </div>
    );
}