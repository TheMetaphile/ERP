import React, { useContext } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from "../../../Config";

export default function FeeStructureField({ fees }) {
    const [Razorpay] = useRazorpay();
    const { authState } = useContext(AuthContext);


    const handlePayment = async (params) => {
        // const order = await createOrder(params); //  Create order on your backend
        console.log('params se aaya', params)
        const options = {
            'key': 'rzp_live_GFqD7mHBThythU',
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
                const datee = new Date().toISOString().split('T')[0];
                const email = authState.userDetails.email;
                const installmentId = `${datee}-${email}`;
                console.log(response, 'resssssssss', datee, email, installmentId)

                postPaymentDetails({
                    email: email, // or the user's email
                    amount: params.amount,
                    date: datee,
                    status: "Success",
                    doc_id: params.deadline,
                    installment_id: installmentId, // or a relevant installment id
                    order_id: "NA",
                    payment_id: response.razorpay_payment_id,
                    signature: "Online"
                });

            },

        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            const datee = new Date().toISOString().split('T')[0];
            const email = authState.userDetails.email;
            const installmentId = `${datee}-${email}`;
            console.log(response, 'fffffffffff', datee, email, installmentId);

            postPaymentDetails({
                email: email, // or the user's email
                amount: params.amount,
                date: datee,
                status: "Failed",
                doc_id: params.deadline,
                installment_id: installmentId, // or a relevant installment id
                order_id: "NA",
                payment_id: response.error.metadata.payment_id,
                signature: "Online" // no signature in case of failure
            });
        });

        rzp1.open();
    };

    const postPaymentDetails = async (paymentDetails) => {
        console.log('postpayment', paymentDetails)
        try {
            const response = await axios.post(`${BASE_URL_Fee}/fee/payment`,
                paymentDetails,
                {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`
                    }
                }
            );
            console.log('Payment details posted successfully:', response.data);
        } catch (error) {
            console.error('Error posting payment details:', error);
        }
    };


    return (
        // <div className=" ">
        <>
            {
                fees.map((data, index) => (
                    <tbody key={index} className=" w-full rounded-t-lg  whitespace-nowrap  flex items-center border-b border-gray-300 ">
                        <tr className=" w-full flex">
                            <td className="text-gray-500 border-r w-24    border-gray-300 py-2 font-normal  text-center">{index + 1}</td>
                            <td className="text-gray-500 border-r  w-64   border-gray-300 py-2 font-normal  text-center">{data.title}</td>
                            <td className="text-gray-500 border-r w-28    border-gray-300 py-2 font-normal  text-center">{data.amount}</td>
                            <td className="text-gray-500 border-r w-20    border-gray-300 py-2 font-normal  text-center">{data.discount}</td>
                            <td className="text-gray-500 border-r w-60   border-gray-300 py-2 font-normal  text-center">{data.payableAmount}</td>
                            <td className="text-gray-500 border-r w-36    border-gray-300 py-2 font-normal  text-center">{data.deadline}</td>
                            <td className="text-gray-500 border-r w-24    border-gray-300 py-2 font-normal  text-center">{data.status}</td>
                            {/* <td className="text-gray-500 py-2 font-normal w-28 text-center">Pay</h5> */}
                            <td className=" w-36 text-center">
                                <button className=" my-2 mx-1 text-lg rounded-full bg-secondary px-6 py-1  border border-gray-300 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap hover:cursor-pointer" onClick={() => handlePayment({ amount: data.payableAmount, order_id: data.id, title: data.title, deadline: data.deadline })}>Pay</button>
                            </td>
                        </tr>
                    </tbody>
                ))
            }
        </>
        // </div > */ 
    );
}

