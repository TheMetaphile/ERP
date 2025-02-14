// FeePaymentRowQuarter.jsx
import React, { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../../Config';
import useRazorpay from 'react-razorpay';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import logo from '../../../../assets/metaphile_logo.png';
import Loading from '../../../../LoadingScreen/Loading';
// import { useFilters } from '../../Students/utils/Filters';

const FeePaymentRowQuarter = ({ student, key }) => {
    const { authState } = useContext(AuthContext);
    const dropdownRef = useRef(null);
    const [Razorpay] = useRazorpay();
    const [paymentMode, setPaymentMode] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [amount, setAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalPaidAmount, setTotalPaidAmount] = useState(0);
    // const { filters } = useFilters();
    // const { course, Semester, session } = filters;
    const session = '2024-25';
    console.log(student)
    const payOnline = async (data) => {
        try {
            setLoading(true);
            //console.log("triggered url", data);

            const response = await axios.post(
                `${BASE_URL_Login}/encrypt/url`,
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
            //console.error('Error fetching agents:', error.response.data.error);
            if (error.response && error.response.data.error === 'You are not permitted to access this data. Please contact the admin') {
                console.warn('Access denied. Attempting to refresh token...');

                try {
                    const refreshResponse = await axios.post(`${BASE_URL_Login}/token/newAccessToken`, {
                        refreshToken: authState.refreshToken,
                    });

                    const newAccessToken = refreshResponse.data.accessToken;
                    //console.log("newasdg", newAccessToken)
                    updateAccessToken(newAccessToken, authState);

                    authState.accessToken = newAccessToken;

                    await SemesterFeePayment();
                } catch (refreshError) {
                    //console.error('Failed to refresh token:', refreshError);
                    toast.error('Session Expired');
                    logout();
                }
            } else {
                toast.error(error.response.data.error);
            }
        }
        setLoading(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowSuggestion(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function convertToWords(amount) {
        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

        if (amount === 0) return "Zero";

        function convertGroup(num) {
            if (num === 0) return "";
            if (num < 20) return ones[num];
            if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + ones[num % 10] : "");
            return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " and " + convertGroup(num % 100) : "");
        }

        let result = "";
        let groupIndex = 0;

        while (amount > 0) {
            const group = amount % 1000;
            if (group !== 0) {
                result = convertGroup(group) + (thousands[groupIndex] ? " " + thousands[groupIndex] : "") + " " + result;
            }
            amount = Math.floor(amount / 1000);
            groupIndex++;
        }

        return result.trim().replace(/\b\w/g, (char) => char.toUpperCase());
    }

    const parseDate = (dateString) => {
        const [day, month, yearAndTime] = dateString.split('-');
        const [year, time] = yearAndTime.split(' ');
        return new Date(`${year}-${month}-${day}T${time}`).getTime();
    };

    const generateReceipt = (data) => {
        const safeValue = (value) => {
            if (!value) return 'N/A';
            if (typeof value === 'string' && value.includes('T')) {
                const date = new Date(value);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
            return String(value);
        };


        const doc = new jsPDF();

        const colors = {
            primary: '#2980b9',
            secondary: '#3498db',
            accent: '#2ecc71',
            background: '#f4f6f7',
            text: '#2c3e50',
            textLight: '#34495e'
        };

        doc.setFillColor(colors.background);
        doc.rect(0, 0, 210, 297, 'F');

        doc.setFillColor(colors.primary);
        doc.rect(0, 0, 210, 40, 'F');

        try {
            if (logo) {
                const centerX = 25;
                const centerY = 20;
                const radius = 15;

                doc.setFillColor(255, 255, 255);
                doc.circle(centerX, centerY, radius, 'F');

                doc.addImage(logo, 'PNG', centerX - radius, centerY - radius, radius * 2, radius * 2);
            }
        } catch (error) {
            console.warn('Logo could not be added:', error);
        }


        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('OFFICIAL PAYMENT RECEIPT', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(safeValue(authState.userDetails.collegeName), 105, 30, { align: 'center' });

        doc.setDrawColor(colors.secondary);
        doc.setLineWidth(0.7);
        doc.roundedRect(15, 50, 180, 240, 5, 5);



        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');

        const details = [
            { label: 'Receipt Number', value: safeValue(`${parseDate(data.date)}`) },
            { label: 'Student Name', value: student?.name },
            { label: 'Father Name', value: student?.fatherName },
            { label: 'Course', value: student?.course },
            { label: 'Semester', value: safeValue(data.semester) },
            { label: 'Type of Fee', value: 'Semester Fee' },
            { label: 'Payment Mode', value: data.signature },
            { label: 'Payment ID', value: safeValue(data.payment_id) },
            { label: 'Order ID', value: safeValue(data.order_id) },
            { label: 'Payment Amount (In Digits)', value: safeValue(`${data.amount}`) },
            { label: 'Payment Amount (In Words)', value: convertToWords(data.amount) },
            { label: 'Transaction Date', value: safeValue(data.date) },
        ];

        let yPosition = 75;
        details.forEach((detail) => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(colors.textLight);
            doc.text(detail.label + ':', 25, yPosition);

            doc.setFont('helvetica', 'normal');
            doc.setTextColor(colors.text);
            doc.text(detail.value, 110, yPosition);

            yPosition += 15;
        });

        doc.setDrawColor(colors.secondary);
        doc.setLineWidth(0.5);
        doc.line(125, 270, 185, 270);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(colors.textLight);
        doc.text('Signature', 155, 280, { align: 'center' });

        doc.setTextColor(colors.textLight);
        doc.setFontSize(8);
        doc.text('Thank you for your payment', 105, 280, { align: 'center' });
        doc.text('This is an electronically generated receipt', 105, 285, { align: 'center' });

        try {
            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            window.open(url, '_blank');

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 10000);
        } catch (error) {
            //console.error('PDF Generation Error:', error);
            alert('Failed to generate receipt. Please try again.');
        }
    };


    const SemesterFeePayment = async (data) => {
        try {
            //console.log("triggered", data, 'studetn', student.fatherName);
            const { token, ...requestData } = data;
            const response = await axios.post(`${BASE_URL_Login}/payment/backFee`,
                requestData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log(response);
            if (response.status === 200 && response.data.status === true) {
                // console.log(data);

                generateReceipt(data);
                // console.log("here2");

                setTotalPaidAmount((prev) => prev + parseInt(data.amount));
            }
            // fetchBackFeeStatus();
            setShowSuggestion(false);
            setPaymentMode("");
            setAmount(0);
            toast.success("Fee payment successfull");
        } catch (error) {
            console.error('Error fetching back fee status:', error);
            //console.error('Error fetching agents:', error.response.data.error);
            if (error.response && error.response.data.error === 'You are not permitted to access this data. Please contact the admin') {
                console.warn('Access denied. Attempting to refresh token...');

                try {
                    const refreshResponse = await axios.post(`${BASE_URL_Login}/token/newAccessToken`, {
                        refreshToken: authState.refreshToken,
                    });

                    const newAccessToken = refreshResponse.data.accessToken;
                    //console.log("newasdg", newAccessToken)
                    updateAccessToken(newAccessToken, authState);

                    authState.accessToken = newAccessToken;

                    await SemesterFeePayment();
                } catch (refreshError) {
                    //console.error('Failed to refresh token:', refreshError);
                    toast.error('Session Expired');
                    logout();
                }
            } else {
                toast.error(error.response.data.error);
            }
        }
    };

    const handleCashPayment = async () => {
        if (amount + discount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount)) {
            if (discount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount) && discount + amount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount)) {
                try {
                    const datee = formatDateTime();
                    await SemesterFeePayment({
                        token: authState.accessToken,
                        title: "Semester Fee",
                        id: student._id,
                        amount: amount,
                        email: student.studentEmailId,
                        number: student.studentWhatsAppNo,
                        date: datee,
                        by: authState.userDetails._id,
                        status: "Success",
                        order_id: `Semester/${parseInt(student.semester)}/${session}`,
                        payment_id: `CASH-${Date.now()}`,
                        course: student.course,
                        signature: "Cash",
                        semester: parseInt(student.semester),
                        session: session,
                        discount: discount
                    });

                } catch (error) {
                    console.error('Error processing cash payment:', error);
                }
            }
            else {
                toast.error("Discount can not be greater then Pending Fee")
            }
        }
        else {
            toast.error("Discount and Amount can not be greater then Pending Fee")
        }
    };

    const handleOtherPayment = async (email, phone) => {
        if (paymentMode === 'Cash') {
            console.log('cash')
            handleCashPayment();
        }

        else {
            if (amount + discount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount) && documentNumber) {
                if (discount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount) && discount + amount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount)) {
                    const datee = formatDateTime();
                    await SemesterFeePayment({
                        token: authState.accessToken,
                        title: "Semester Fee",
                        id: student._id,
                        amount: amount,
                        email: email,
                        number: phone,
                        date: datee,
                        by: authState.userDetails._id,
                        status: "Success",
                        order_id: `Semester/${parseInt(student.semester)}/${session}`,
                        payment_id: `DocNo-${documentNumber}`,
                        signature: paymentMode,
                        semester: parseInt(student.semester),
                        session: session,
                        course: student.course,
                        discount: discount
                    });
                }
                else {
                    toast.error("Discount can not be greater then Pending Fee")
                }
            } else {
                toast.error("Discount and Amount can not be greater then Pending Fee");
            }
        }
    };

    useEffect(() => {

        if (amount + discount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount)) {
            if (discount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount) && discount + amount <= (student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount)) {
                if (paymentMode === 'Online') {
                    const datee = formatDateTime();

                    payOnline({
                        amount: amount,
                        id: student._id,
                        by: authState.userDetails._id,
                        title: "Semester Fee",
                        email: student.studentEmailId,
                        number: student.studentWhatsAppNo,
                        semester: parseInt(student.semester),
                        session: session,
                        course: student.course,
                        date: datee,
                        discount: discount
                    });
                }
            }
        }
    }, [paymentMode]);

    const onAmountChange = (value) => {
        const numericValue = parseInt(value);
        const calculatedMax = student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount;

        if (numericValue >= 0 && numericValue <= calculatedMax) {
            setAmount(numericValue);
        } else if (numericValue > calculatedMax) {
            setAmount(calculatedMax);
        } else {
            setAmount(0);
        }

    };

    const onDiscountChange = (value) => {
        const numericValue = parseInt(value);
        const calculatedMax = student.totalFee - student.paidFee - parseInt(totalPaidAmount) - student.discount;

        if (numericValue >= 0 && numericValue <= calculatedMax) {
            setDiscount(numericValue);
        } else if (numericValue > calculatedMax) {
            setDiscount(calculatedMax);
        } else {
            setDiscount(0);
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
            <td className="px-3 py-4">{student.months.join(', ')}</td>
            <td className="px-3 py-4">{student.quarter}</td>
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

            <td className="px-3 py-4 ">
                <div className='text-green-700 px-2 py-1 bg-green-100 font-semibold border border-green-600 rounded-full'>
                    {(paymentMode === 'Demand Draft' || paymentMode === 'Cheque') ? (
                        paymentMode
                    )
                        :
                        "N/A"
                    }
                </div>
            </td>
            <td className="px-3 py-4">
                {(paymentMode === 'Demand Draft' || paymentMode === 'Cheque') ? (
                    <div className=" flex flex-col">
                        <input
                            type="text"
                            placeholder="Enter document number"
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                            className=" px-3 py-1 w-32 text-center rounded-full bg-white border border-blue-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                        />
                    </div>
                )
                    :
                    "N/A"
                }
            </td>
            <td className={`px-3 py-2  `}>
                <div className={`px-3 py-1 rounded-full border text-center ${student.totalFee === student.paidFee ? 'text-green-600 bg-green-200 border-green-600' : 'text-red-600 bg-red-200 border-red-600'}`}>
                    {student.totalFee === student.paidFee ? 'Paid' : 'Pending'}
                </div>
            </td>
            <td className="px-3 py-4">
                <input
                    type="number"
                    value={discount}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            e.preventDefault();
                        }
                    }}
                    onWheel={(e) => e.target.blur()}
                    min={0}
                    max={student.totalFee - student.paidFee - student.manualDiscount - student.categoryDiscount}
                    onChange={(e) => onDiscountChange(e.target.value)}
                    className=" px-2 py-1 w-20 text-center rounded-full bg-white border border-blue-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    placeholder="Enter Discount"
                />
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

            <td className="px-3 py-4" ref={dropdownRef}>
                {!(student.totalFee === student.paidFee) && paymentMode === '' && (
                    <div className="relative">
                        <button
                            className="text-blue-600 bg-blue-200 focus:outline-none px-5 py-1 rounded-full text-center"
                            onClick={() => setShowSuggestion(true)}

                        >
                            Pay
                        </button>
                        {paymentMode === '' && showSuggestion && (
                            <div className="absolute z-10 mt-2 top-0 left-0 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {['Online', 'Demand Draft', 'Cheque', 'Cash'].map((mode) => (
                                        <button
                                            key={mode}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                            role="menuitem"
                                            onClick={() => { setShowSuggestion(false); setPaymentMode(mode) }}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )

                        }

                    </div>
                )}
                {student.totalFee === student.paidFee && (
                    <span className="text-gray-600 bg-gray-200 px-5 py-1 rounded-full">Paid</span>
                )}

                {paymentMode !== '' && (
                    <div className="flex space-x-4 items-center">
                        <button
                            onClick={() => handleOtherPayment(student.studentEmailId, student.studentWhatsAppNo)}
                            className="group flex items-center justify-center 
                       w-8 h-8 rounded-full 
                       bg-green-100 hover:bg-green-200 
                       transition-all duration-300 
                       shadow-md hover:shadow-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            <FaCheck
                                className="text-green-600 group-hover:scale-110 transition-transform"
                                size={16}
                            />
                        </button>

                        <button
                            onClick={() => setPaymentMode('')}
                            className="group flex items-center justify-center 
                       w-8 h-8 rounded-full 
                       bg-red-100 hover:bg-red-200 
                       transition-all duration-300 
                       shadow-md hover:shadow-lg 
                       focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            <FaTimes
                                className="text-red-600 group-hover:scale-110 transition-transform"
                                size={16}
                            />
                        </button>
                    </div>
                )}
            </td>

        </tr>
    );
};

export default FeePaymentRowQuarter;