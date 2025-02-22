import React, { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import Loading from '../../../LoadingScreen/Loading';

const FeePaymentRow = ({ student, key }) => {
    const { authState } = useContext(AuthContext);
    const [paymentMode, setPaymentMode] = useState('');
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    console.log(student)
    const payOnline = async (data) => {
        try {
            setLoading(true);
            //console.log("triggered url", data);

            const response = await axios.post(
                `${BASE_URL}/fee/encrypt/url`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`,
                        'Content-Type': 'application/json', // Optional: Explicitly set content type
                    },
                }
            );

            //console.log("Response:", response.data.paymentLink);

            if (response.data.paymentLink) {
                window.location.href = response.data.paymentLink; // Redirects the current tab
            } else {
                //console.error("Failed to initiate payment");
            }
        } catch (error) {
            console.error('Error fetching agents:', error.response.data.error);
        }
        setLoading(false);
    };






    useEffect(() => {

        if (amount <= (student.totalFee - student.paidFee - student.manualDiscount - student.categoryDiscount)) {
            if (paymentMode === 'Online') {
                const datee = formatDateTime();

                payOnline({
                    amount: amount,
                    id: authState?.userDetails?._id,
                    by: authState?.userDetails?._id,
                    title: "Monthly Fee",
                    email: authState?.userDetails?.email,
                    number: authState?.userDetails?.fatherPhoneNumber,
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
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-3 py-4">{student.month}</td>
            <td className="px-3 py-4 whitespace-nowrap">
                <div className='text-blue-500 px-2 py-1 bg-blue-100 font-semibold border border-blue-600 rounded-full'>
                    ₹ {student.totalFee}
                </div>
            </td>
            <td className="px-3 py-4 whitespace-nowrap">
                <div className='text-green-700 px-2 py-1 bg-green-100 font-semibold border border-green-600 rounded-full'>
                    ₹ {student.paidFee}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-green-700 px-2 py-1 bg-green-100 font-semibold border border-green-600 rounded-full'>
                    ₹ {student.manualDiscount + student.categoryDiscount}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-red-600 px-2 py-1 bg-red-100 font-semibold border border-red-600 rounded-full'>
                    ₹ {student.totalFee - student.paidFee - student.manualDiscount - student.categoryDiscount}
                </div>
            </td>
            <td className={`px-3 py-2  `}>
                <div className={`px-3 py-1 rounded-full border text-center ${student.totalFee === student.paidFee ? 'text-green-600 bg-green-200 border-green-600' : 'text-red-600 bg-red-200 border-red-600'}`}>
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
                    className=" px-2 py-1 w-20 text-center rounded-full bg-white border border-blue-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    placeholder="Enter amount"
                />
            </td>

            <td className="px-3 py-4">
                {!(student.totalFee === student.paidFee) && paymentMode === '' && (
                    <div className="relative">
                        <button
                            className="text-blue-600 bg-blue-200 focus:outline-none px-5 py-1 rounded-full text-center"
                            onClick={() => setPaymentMode('Online')}
                        >
                            Pay
                        </button>
                    </div>
                )}
                {student.totalFee === student.paidFee && (
                    <span className="text-gray-600 bg-gray-200 px-5 py-1 rounded-full">Paid</span>
                )}


            </td>

        </tr>
    );
};

export default FeePaymentRow;