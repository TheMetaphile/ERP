import React, { useContext } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from "../../../Config";
import Header from './feestructureheader.jsx';
import QuarterFeeHeader from "./QuarterFeeHeader.jsx";
import { usePaymentContext } from "./PaymentContext.jsx";

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
        <>
            {selectedOption === 'monthlyfee' ? (

                <>
                    <Header />
                    {
                        fees.monthlyStatus.map((data, index) => (
                            <tbody key={index} className=" w-full rounded-t-lg  whitespace-nowrap  flex items-center border-b border-gray-300 ">
                                <tr className=" w-full flex">
                                    <td className="text-gray-500 border-r  w-full   border-gray-300 py-2 font-normal  text-center">{data.month}</td>
                                    <td className="text-gray-500 border-r w-full    border-gray-300 py-2 font-normal  text-center">{data.amount}</td>
                                    <td className="text-gray-500 border-r w-full    border-gray-300 py-2 font-normal  text-center">{data.status}</td>
                                    <td className=" w-full text-center">
                                        {data.status === 'Submitted' ? (
                                            <>Paid</>
                                        ) : (
                                            <button className=" my-2 mx-1 text-lg rounded-full bg-secondary px-6 py-1  border border-gray-300 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap hover:cursor-pointer" onClick={() => handlePayment({ amount: data.amount, order_id: data.month, title: selectedOption })}>Pay</button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }
                </>
            ) : selectedOption === 'quarterFee' ? (
                <>
                    <QuarterFeeHeader />
                    {
                        fees.quarterlyStatus.map((data, index) => (
                            <tbody key={index} className=" w-full rounded-t-lg  whitespace-nowrap  flex items-center border-b border-gray-300 ">
                                <tr className=" w-full flex">
                                    <td className="text-gray-500 border-r  w-full   border-gray-300 py-2 font-normal  text-center"> {data.months.join(', ')}</td>
                                    <td className="text-gray-500 border-r  w-full   border-gray-300 py-2 font-normal  text-center">{data.quarter}</td>
                                    <td className="text-gray-500 border-r w-full    border-gray-300 py-2 font-normal  text-center">{data.amount}</td>
                                    <td className="text-gray-500 border-r  w-full   border-gray-300 py-2 font-normal  text-center">{data.pendingFee}</td>
                                    <td className="text-gray-500 border-r w-full    border-gray-300 py-2 font-normal  text-center">{data.status}</td>
                                    <td className=" w-full text-center">
                                        {data.status === 'Submitted' ? (
                                            <>Paid</>
                                        ) : (
                                            <button className=" my-2 mx-1 text-lg rounded-full bg-secondary px-6 py-1  border border-gray-300 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap hover:cursor-pointer" onClick={() => handlePayment({ amount: data.pendingFee, order_id: data.quarter, title: selectedOption })}>Pay</button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }
                </>
            ) : (
                <tbody className=" w-full rounded-t-lg  whitespace-nowrap  flex items-center border-b border-gray-300 ">
                    <tr className=" w-full flex">

                        <td className="text-gray-500 border-r  w-64   border-gray-300 py-2 font-normal  text-center">{fees.admissionFee}</td>
                        <td className="text-gray-500 border-r  w-64   border-gray-300 py-2 font-normal  text-center">{fees.monthlyfee}</td>
                        <td className="text-gray-500 border-r  w-64   border-gray-300 py-2 font-normal  text-center">{fees.quarterFee}</td>



                        <td className=" w-36 text-center">
                            <button className=" my-2 mx-1 text-lg rounded-full bg-secondary px-6 py-1  border border-gray-300 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap hover:cursor-pointer" onClick={() => handlePayment({ amount: data.payableAmount, order_id: data.id, title: data.title, deadline: data.deadline })}>Pay</button>
                        </td>
                    </tr>
                </tbody>
            )}




        </>
    );
}

