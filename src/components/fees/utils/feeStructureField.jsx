import React, { useContext } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from "../../../Config";
import Header from './feestructureheader.jsx';
import QuarterFeeHeader from "./QuarterFeeHeader.jsx";
import { usePaymentContext } from "./PaymentContext.jsx";
import { motion } from "framer-motion";

export default function FeeStructureField({ fees, selectedOption, setFees }) {
    const [Razorpay] = useRazorpay();
    const { authState } = useContext(AuthContext);
    const { paymentDetails, setPaymentDetails } = usePaymentContext();

    console.log(fees);

    const handlePayment = async (params) => {
        // const order = await createOrder(params); //  Create order on your backend
        console.log('params se aaya', params)
        const options = {
            'key': 'rzp_test_nNousIIsoO34Lz',
            'amount': params.amount * 100,
            'name': 'METAPHILE',
            'description': params.title,
            'retry': { 'enabled': true, 'max_count': 1 },
            'send_sms_hash': true,
            'prefill': {
                'contact': '8979020025',
                'email': 'bhanu68tyagi@gmail.com'
            },
            handler: function (response) {
                const today = new Date();
                const datee = new Date().toISOString().split('T')[0];
                const email = authState.userDetails.email;
                const installmentId = `${datee}-${email}`;
                console.log(response, 'resssssssss', datee, email, installmentId)

                postPaymentDetails({
                    email: email, // or the user's email
                    amount: params.amount,
                    date: today,
                    status: "Success",
                    installment_id: installmentId, // or a relevant installment id
                    order_id: params.order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: "Online"
                });

            },

        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            const today = new Date();
            const datee = new Date().toISOString().split('T')[0];
            const email = authState.userDetails.email;
            const installmentId = `${datee}-${email}`;
            console.log(response, 'fffffffffff', datee, email, installmentId);

            postPaymentDetails({
                email: email, // or the user's email
                amount: params.amount,
                date: today,
                status: "Failed",
                installment_id: installmentId, // or a relevant installment id
                order_id: params.order_id,
                payment_id: response.error.metadata.payment_id,
                signature: "Online" // no signature in case of failure
            });
        });

        rzp1.open();
    };

    const postPaymentDetails = async (NewpaymentDetails) => {
        console.log('postpayment', NewpaymentDetails)
        try {
            const response = await axios.post(`${BASE_URL_Fee}/fee/payment`,
                NewpaymentDetails,
                {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`
                    }
                }
            );
            if (response.status === 200) {
                updateContext({
                    amount: NewpaymentDetails.amount,
                    date: NewpaymentDetails.date,
                    payment_status: NewpaymentDetails.status,
                    installment_id: NewpaymentDetails.installment_id, // or a relevant installment id
                    order_id: NewpaymentDetails.order_id,
                    payment_id: NewpaymentDetails.payment_id,
                    signature: "Online" // no signature in case of failure
                });

                // Update the fees state
                setFees((prevFees) => {
                    return {
                        ...prevFees,
                        monthlyStatus: prevFees.monthlyStatus.map((item) =>
                            item.month === NewpaymentDetails.order_id ? { ...item, status: 'Submitted' } : item
                        ),
                        quarterlyStatus: prevFees.quarterlyStatus.map((item) =>
                            item.quarter === NewpaymentDetails.order_id ? { ...item, status: 'Submitted' } : item
                        ),
                    };
                });

                console.log('Payment details posted and stored successfully:', response.data);
            }

        } catch (error) {
            console.error('Error posting payment details:', error);
        }
    };

    const updateContext = (newRow) => {
        setPaymentDetails(Array.isArray(paymentDetails) ? [newRow, ...paymentDetails] : [newRow]);
    };

    return (
        <div className="bg-gray-100  rounded-lg shadow-lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3 }}
                className="bg-white rounded-xl overflow-hidden"
            >
                {selectedOption === 'monthlyfee' ? (


                    <table className="w-full">
                        <Header />

                        <tbody>
                            {fees.monthlyStatus.map((data, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="border-b border-gray-200  transition-all hover:bg-gray-200 duration-300 ease-in-out"
                                >
                                    <td className="py-3 px-4 text-center">{data.month}</td>
                                    <td className="py-3 px-4 text-center">{data.amount}</td>
                                    <td className="py-3 px-4 text-center">{data.discountApplied}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs ${data.status === 'Submitted' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {data.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        {data.status === 'Submitted' ? (
                                            <span className="text-green-600 font-semibold">Paid</span>
                                        ) : (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                                                onClick={() => handlePayment({ amount: data.amount, order_id: data.month, title: selectedOption })}
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>


                ) : selectedOption === 'quarterFee' ? (
                    
                            <table className="w-full">
                                <QuarterFeeHeader />

                                <tbody>
                                    {fees.quarterlyStatus.map((data, index) => (
                                        <motion.tr
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{
                                                scale: 1.02,
                                                transition: { duration: 0.2 }
                                            }}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in-out"
                                        >
                                            <td className="py-3 px-4 text-center">{data.months.join(', ')}</td>
                                            <td className="py-3 px-4 text-center">{data.quarter}</td>
                                            <td className="py-3 px-4 text-center">{data.amount}</td>
                                            <td className="py-3 px-4 text-center">{data.discountApplied}</td>
                                            <td className="py-3 px-4 text-center">{data.pendingFee}</td>
                                            <td className="py-3 px-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs ${data.status === 'Submitted' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                    {data.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                {data.status === 'Submitted' ? (
                                                    <span className="text-green-600 font-semibold">Paid</span>
                                                ) : (
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                                                        onClick={() => handlePayment({ amount: data.pendingFee, order_id: data.quarter, title: selectedOption })}
                                                    >
                                                        Pay Now
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                    
                ) : (
                    <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FeeCard title="Admission Fee" amount={fees.admissionFee} />
                            <FeeCard title="Monthly Fee" amount={fees.monthlyfee} />
                            <FeeCard title="Quarterly Fee" amount={fees.quarterFee} />
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function FeeCard({ title, amount }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">{amount}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                Pay Now
            </button>
        </div>
    );
}

