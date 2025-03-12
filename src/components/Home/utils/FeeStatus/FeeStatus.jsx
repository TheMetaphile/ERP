import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import FeeCard from './utils/CustomCard';
import Loading from "../../../../LoadingScreen/Loading";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL } from '../../../../Config';
import Payable from './../../../../assets/coins.png';
import Paid from './../../../../assets/paid.png';
import Pending from './../../../../assets/pending.png';

export default function FeeStatus({ darkMode }) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState(null);

    const bgClass = darkMode 
        ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
        : 'bg-gradient-to-r from-bg_blue to-secondary';
    const textClass = darkMode ? 'text-white' : 'text-text_blue';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';

    useEffect(() => {
        if (authState?.accessToken) {
            fetchStatus();
        } else {
            toast.error('No access token available');
        }
    }, [authState?.accessToken]);

    const fetchStatus = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/fee/fetch/stats?end=20&start=0&class=${authState?.userDetails?.currentClass}`,
                {
                    headers: {
                        'Authorization': `Bearer ${authState?.accessToken}`
                    }
                }
            );
            setDetails(response.data);
        } catch (error) {
            console.error("Error fetching fee status:", error);
            toast.error('Failed to fetch fee status');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    if (!details) return (
        <div className={`text-center ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Failed to load fee details
        </div>
    );

    const feeCards = [
        {
            img: Payable,
            amount: details.total,
            title: 'Total Payable',
            color: darkMode ? 'bg-blue-900' : 'bg-blue-100',
            textColor: darkMode ? 'text-blue-300' : 'text-blue-800'
        },
        {
            img: Paid,
            amount: details.paid,
            title: 'Total Paid',
            color: darkMode ? 'bg-green-900' : 'bg-green-100',
            textColor: darkMode ? 'text-green-300' : 'text-green-800'
        },
        {
            img: Pending,
            amount: details.discount,
            title: 'Total Discount',
            color: darkMode ? 'bg-indigo-900' : 'bg-blue-100',
            textColor: darkMode ? 'text-indigo-300' : 'text-blue-800'
        },
        {
            img: Pending,
            amount: details.total - details.discount - details.paid,
            title: 'Pending',
            color: darkMode ? 'bg-yellow-900' : 'bg-yellow-100',
            textColor: darkMode ? 'text-yellow-300' : 'text-yellow-800'
        }
    ];

    return (
        <div 
            className={`
                rounded-xl w-full shadow-lg 
                p-4 mobile:p-3 tablet:p-6 
                ${bgClass} ${borderClass}
            `}
        >
            <h2 
                className={`
                    text-xl tablet:text-2xl 
                    font-bold ${textClass} 
                    mb-4 tablet:mb-6
                `}
            >
                Fee Status
            </h2>
            <div 
                className="
                    grid grid-cols-1 mobile:grid-cols-1 
                    tablet:grid-cols-2 laptop:grid-cols-4 
                    gap-3 tablet:gap-4
                "
            >
                {feeCards.map((card, index) => (
                    <FeeCard 
                        key={index}
                        img={card.img} 
                        amount={card.amount} 
                        title={card.title} 
                        color={card.color}
                        darkMode={darkMode}
                        textColor={card.textColor}
                    />
                ))}
            </div>
        </div>
    );
}