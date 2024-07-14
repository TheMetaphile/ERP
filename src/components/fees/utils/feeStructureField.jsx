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
                    signature: "NA"
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
                signature: "NA" // no signature in case of failure
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
        <div className=" w-full  justify-between rounded-t-lg  whitespace-nowrap">
            {fees.map((data, index) => (
                <div key={index} className="whitespace-nowrap flex items-center border-b border-gray-300 justify-between w-full ">
                    <h5 className="text-gray-500 font-normal border-r border-gray-300 h-full py-2 w-20 text-center">{index + 1}</h5>
                    <h5 className="text-gray-500 font-normal border-r border-gray-300 h-full py-2 w-32 text-center">{data.title}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.amount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-20 text-center">{data.discount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-32 text-center">{data.payableAmount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.deadline}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.status}</h5>
                    {/* <h5 className="text-gray-500 py-2 font-normal w-28 text-center">Pay</h5> */}
                    <h5 className="w-32 my-2 text-lg rounded-full bg-secondary px-2 py-1  border border-gray-300 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap hover:cursor-pointer"
                        onClick={() => handlePayment({ amount: data.payableAmount, order_id: data.id, title: data.title, deadline: data.deadline })}
                    >
                        Pay
                    </h5>

                </div>
            ))}
        </div>
    );
}

