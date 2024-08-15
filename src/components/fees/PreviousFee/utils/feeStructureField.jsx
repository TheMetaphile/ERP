import React, { useContext } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import AuthContext from "../../../../Context/AuthContext.jsx";
import { BASE_URL_Fee } from "../../../../Config";
import Header from './feestructureheader.jsx';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCreditCard } from 'react-icons/fa';

export default function FeeStructureField({ fees }) {
    const [Razorpay] = useRazorpay();
    const { authState } = useContext(AuthContext);


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
                    signature: "Online",
                    pending: true,
                    pendingId: params.pendingId
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
                signature: "Online", // no signature in case of failure
                pending: true,
                pendingId: params.pendingId
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
                console.log('Payment details posted and stored successfully:', response.data);
            }

        } catch (error) {
            console.error('Error posting payment details:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}

        >

            <motion.table
                className="w-full bg-white shadow-lg rounded-lg overflow-hidden"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.thead
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-blue-300 to-blue-100 text-black "
                >
                    <tr>
                        <th className="py-3 px-4 text-center">Class</th>
                        <th className="py-3 px-4 text-center">Session</th>
                        <th className="py-3 px-4 text-center">Month</th>
                        <th className="py-3 px-4 text-center">Amount</th>
                        <th className="py-3 px-4 text-center">Discount</th>
                        <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                </motion.thead>
                <tbody>
                    {fees.map((data, index) => (
                        <motion.tr
                            key={index}
                            className="border-b border-gray-200  transition-all hover:bg-gray-200 duration-300 ease-in-out whitespace-nowrap "
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.0 }
                            }}
                        >
                            <td className="py-3 px-4 text-center">{data.class}</td>
                            <td className="py-3 px-4 text-center">{data.session}</td>
                            <td className="py-3 px-4 text-center">{data.month}</td>
                            <td className="py-3 px-4 text-center">₹ {data.amount}</td>
                            <td className="py-3 px-4 text-center">₹ {data.discount}</td>
                            <td className="py-3 px-4 text-center flex justify-center">
                                {data.status === 'Submitted' ? (
                                    <motion.div
                                        className="flex items-center text-green-500"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FaCheckCircle className="mr-2" />
                                        Paid
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-200"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handlePayment({ amount: data.amount, order_id: `pending/${data.class}/${data.month}`, title: data.month, pendingId: data._id })}
                                    >
                                        <FaCreditCard className="mr-2" />
                                        Pay Now
                                    </motion.button>
                                )}
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </motion.table>
        </motion.div>
    );
}

