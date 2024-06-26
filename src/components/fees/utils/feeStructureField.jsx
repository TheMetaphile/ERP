import React from 'react';
import useRazorpay from "react-razorpay";

export default function FeeStructureField({ fees }) {
    const [Razorpay] = useRazorpay();

    const handlePayment = async (params) => {
        // const order = await createOrder(params); //  Create order on your backend
        console.log(params)
        const options = {
            'key': 'rzp_live_GFqD7mHBThythU',
            'amount': 100,
            'name': 'METAPHILE',
            'description': params.title,
            'retry': { 'enabled': true, 'max_count': 1 },
            'send_sms_hash': true,
            'prefill': {
                'contact': '8979020025',
                'email': 'bhanu68tyagi@gmail.com'
            },
            handler: function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                console.log(response,'res')
            },

        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            console.log(response)
        });

        rzp1.open();
    };

    async function createOrder(params) {
        // Replace this with your actual backend API call to create an order
        return fetch('/api/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }).then(response => response.json());
    }

    return (
        <div className=" w-full  justify-between rounded-t-lg  whitespace-nowrap">
            {fees.map((data, index) => (
                <div key={index} className="whitespace-nowrap flex items-center border-b border-gray-300 justify-between w-full ">
                    <h5 className="text-gray-500 font-normal border-r border-gray-300 h-full py-2 w-28 text-center">{index + 1}</h5>
                    <h5 className="text-gray-500 font-normal border-r border-gray-300 h-full py-2 w-32 text-center">{data.title}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.amount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.discount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-32 text-center">{data.payableAmount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.deadline}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.status}</h5>
                    {/* <h5 className="text-gray-500 py-2 font-normal w-28 text-center">Pay</h5> */}
                    <h5 className="w-32 my-2 text-lg rounded-full bg-secondary px-2 py-1  border border-gray-300 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap hover:cursor-pointer"
                        onClick={() => handlePayment({ amount: data.payableAmount, order_id: data.order_id, title: data.title })}
                    >
                        Pay
                    </h5>

                </div>
            ))}
        </div>
    );
}

