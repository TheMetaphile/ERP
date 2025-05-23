import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import Loading from '../../../LoadingScreen/Loading';

const FeePaymentRowQuarter = ({ student, key, darkMode }) => {
    const { authState } = useContext(AuthContext);
    const [paymentMode, setPaymentMode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);


    const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
    const textClass = darkMode ? 'text-gray-300' : 'text-gray-900';
    const inputClass = darkMode 
        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600 focus:border-blue-600 placeholder-gray-500' 
        : 'bg-white text-gray-900 border-blue-200 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400';

    const getBadgeClasses = (type) => {
        switch(type) {
            case 'total':
                return darkMode 
                    ? 'text-blue-400 bg-blue-900 border-blue-700' 
                    : 'text-blue-500 bg-blue-100 border-blue-600';
            case 'paid':
                return darkMode 
                    ? 'text-green-400 bg-green-900 border-green-700' 
                    : 'text-green-700 bg-green-100 border-green-600';
            case 'discount':
                return darkMode 
                    ? 'text-green-400 bg-green-900 border-green-700' 
                    : 'text-green-700 bg-green-100 border-green-600';
            case 'pending':
                return darkMode 
                    ? 'text-red-400 bg-red-900 border-red-700' 
                    : 'text-red-600 bg-red-100 border-red-600';
            default:
                return '';
        }
    };

    const getStatusClasses = () => {
        const isPaid = student.totalFee === student.paidFee;
        return darkMode
            ? (isPaid 
                ? 'text-green-400 bg-green-900 border-green-700' 
                : 'text-red-400 bg-red-900 border-red-700')
            : (isPaid 
                ? 'text-green-600 bg-green-200 border-green-600' 
                : 'text-red-600 bg-red-200 border-red-600');
    };

    const payOnline = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${BASE_URL}/fee/encrypt/url`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${authState?.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.paymentLink) {
                window.location.href = response.data.paymentLink;
            }
        } catch (error) {
            console.error('Error fetching agents:', error.response.data.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (amount <= (student.totalFee - student.paidFee - student.manualDiscount - student.categoryDiscount) && amount > 0) {
            if (paymentMode === 'Online') {
                const datee = formatDateTime();

                payOnline({
                    amount: amount,
                    id: authState?.userDetails?._id,
                    by: authState?.userDetails?._id,
                    title: "Quarterly Fee",
                    email: authState?.userDetails?.email,
                    number: authState?.userDetails?.phoneNumber,
                    semester: authState?.userDetails?.section,
                    session: authState?.userDetails?.session,
                    course: authState?.userDetails?.currentClass,
                    date: datee,
                    discount: 0
                });
            }
        }
    }, [paymentMode]);

    const onAmountChange = (value) => {
        const numericValue = parseInt(value);
        const calculatedMax = student.totalFee - student.paidFee - student.manualDiscount - student.categoryDiscount;

        if (numericValue >= 0 && numericValue <= calculatedMax) {
            setAmount(numericValue);
        } else if (numericValue > calculatedMax) {
            setAmount(calculatedMax);
        } else {
            setAmount(0);
        }
    };

    const formatDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <tr className={`${bgClass} border-b ${hoverBgClass} ${textClass}`}>
            <td className="px-3 py-4">{student.months.join(', ')}</td>
            <td className="px-3 py-4">{student.quarter}</td>
            <td className="px-3 py-4 whitespace-nowrap">
                <div className={`px-2 py-1 font-semibold border rounded-full ${getBadgeClasses('total')}`}>
                    ₹ {student.totalFee}
                </div>
            </td>
            <td className="px-3 py-4 whitespace-nowrap">
                <div className={`px-2 py-1 font-semibold border rounded-full ${getBadgeClasses('paid')}`}>
                    ₹ {student.paidFee}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className={`px-2 py-1 font-semibold border rounded-full ${getBadgeClasses('discount')}`}>
                    ₹ {student.manualDiscount + student.categoryDiscount}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className={`px-2 py-1 font-semibold border rounded-full ${getBadgeClasses('pending')}`}>
                    ₹ {student.totalFee - student.paidFee - student.manualDiscount - student.categoryDiscount}
                </div>
            </td>
            <td className="px-3 py-2">
                <div className={`px-3 py-1 rounded-full border text-center ${getStatusClasses()}`}>
                    {student.totalFee === student.paidFee ? 'Paid' : 'Pending'}
                </div>
            </td>
            <td className="px-3 py-4">
                <input
                    type="number"
                    value={amount}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            e.preventDefault();
                        }
                    }}
                    onWheel={(e) => e.target.blur()}
                    min={0}
                    max={student.totalFee - student.paidFee - student.manualDiscount - student.categoryDiscount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    className={`px-2 py-1 w-20 text-center rounded-full border shadow-sm focus:outline-none focus:ring-1 ${inputClass}`}
                    placeholder="Enter amount"
                />
            </td>
            <td className="px-3 py-4">
                {!(student.totalFee === student.paidFee) && (
                    <div className="relative">
                        <button
                            className={`
                                ${darkMode 
                                    ? 'text-blue-400 bg-blue-900 hover:bg-blue-800' 
                                    : 'text-blue-600 bg-blue-200 hover:bg-blue-300'
                                } 
                                focus:outline-none px-5 py-1 rounded-full text-center
                            `}
                            onClick={() => setPaymentMode('Online')}
                        >
                            Pay
                        </button>
                    </div>
                )}
                {student.totalFee === student.paidFee && (
                    <span className={`
                        ${darkMode 
                            ? 'text-gray-400 bg-gray-700' 
                            : 'text-gray-600 bg-gray-200'
                        } 
                        px-5 py-1 rounded-full
                    `}>
                        Paid
                    </span>
                )}
            </td>
        </tr>
    );
};

export default FeePaymentRowQuarter;