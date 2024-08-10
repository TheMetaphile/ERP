import React, { useContext, useState } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Fee } from "../../../../Config";
import { useLocation, useParams } from "react-router-dom";
import FeeStructureHeader from "../../../../components/fees/utils/feestructureheader";
import QuarterFeeHeader from "../../../../components/fees/utils/QuarterFeeHeader";

export default function FeeStructureField({ fees, selectedOption, setFees }) {
    const [Razorpay] = useRazorpay();
    const { authState } = useContext(AuthContext);
    const [mode, setMode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [docId, setDocId] = useState('');
    const location = useLocation();
    const { id } = useParams();
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const query = useQuery();
    const Class = query.get('Class');
    const Name = query.get('name');
    const Section = query.get('section');

    const handleModeChange = (e, student) => {
        setMode(e.target.value);
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        console.log(`Mode: ${mode}, Student:`, selectedStudent);
        setIsModalOpen(false);

        if (mode === 'Online') {
            const options = {
                'key': 'rzp_test_nNousIIsoO34Lz',
                'amount': selectedStudent.amount * 100,
                'name': 'METAPHILE',
                'description': selectedOption,
                'retry': { 'enabled': true, 'max_count': 1 },
                'send_sms_hash': true,
                'prefill': {
                    'contact': '8979020025',
                    'email': 'bhanu68tyagi@gmail.com'
                },
                handler: function (response) {
                    const today = new Date();
                    const datee = new Date().toISOString().split('T')[0];
                    const installmentId = `${datee}-${id}`;
                    console.log(response, 'success online', datee, id, installmentId)

                    postPaymentDetails({
                        email: id,
                        amount: selectedStudent.amount,
                        date: today,
                        status: "Success",
                        installment_id: installmentId,
                        order_id: selectedStudent.month,
                        payment_id: response.razorpay_payment_id,
                        signature: "Online"
                    });

                },

            };

            const rzp1 = new Razorpay(options);

            rzp1.on("payment.failed", function (response) {
                const today = new Date();

                const datee = new Date().toISOString().split('T')[0];
                const installmentId = `${datee}-${id}`;
                console.log(response, 'fail online', datee, id, installmentId);

                postPaymentDetails({
                    email: id,
                    amount: selectedStudent.payableAmount,
                    date: today,
                    status: "Failed",
                    installment_id: installmentId,
                    order_id: selectedStudent.month,
                    payment_id: response.error.metadata.payment_id,
                    signature: "Online"
                });
            });

            rzp1.open();
        }
        else if (mode === 'Cash') {
            const today = new Date();

            const datee = new Date().toISOString().split('T')[0];
            const installmentId = `${datee}-${id}`;
            console.log('normal', datee, id, installmentId);

            postPaymentDetails({
                email: id,
                amount: selectedStudent.amount,
                date: today,
                status: "Success",
                installment_id: installmentId,
                order_id: selectedStudent.month,
                payment_id: 'Cash',
                signature: mode
            });
        }
        else {
            if (!docId) {
                alert('Fill Doc Id First');
            }
            else {
                const today = new Date();
                const datee = new Date().toISOString().split('T')[0];
                const installmentId = `${datee}-${id}`;
                console.log('normal', datee, id, installmentId);

                postPaymentDetails({
                    email: id,
                    amount: selectedStudent.amount,
                    date: today,
                    status: "Success",
                    installment_id: installmentId,
                    order_id: selectedStudent.month,
                    payment_id: docId,
                    signature: mode
                });
            }
        }
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

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {selectedOption === 'monthlyfee' ? (
                <>
                    <FeeStructureHeader />
                    {fees.monthlyStatus.map((data, index) => (
                        <tbody key={index} className={`w-full rounded-t-lg  whitespace-nowrap  flex items-center border-b border-gray-300 ${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>
                            <tr className=" w-full flex ">
                                <td className="text-gray-500 border-r w-full  border-gray-300 py-2 font-normal  text-center my-2">{data.month}</td>
                                <td className="text-gray-500 border-r w-full  border-gray-300 py-2 font-normal  text-center my-2">{data.amount}</td>
                                <td className="text-gray-500 border-r w-full  border-gray-300 py-2 font-normal  text-center my-2">{data.discountApplied}</td>
                                <td className="text-gray-500 border-r w-full  border-gray-300 py-2 font-normal  text-center my-2">{data.status}</td>

                                <td className="text-gray-500 border-r w-full  border-gray-300 py-2 font-normal  text-center my-2">

                                    {data.status === 'Submitted' ? (
                                        <>Paid</>
                                    ) : (
                                        <select
                                            className=" text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm rounded-full bg-aquamarine py-2"
                                            value={mode}
                                            onChange={(e) => handleModeChange(e, data)}
                                        >
                                            <option value="none">None</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Online">Online</option>
                                            <option value="RTGS">RTGS</option>
                                            <option value="Cheque">Cheque</option>
                                            <option value="Demand Draft">Demand Draft</option>
                                        </select>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    ))}
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
                                    <td className="text-gray-500 border-r w-full    border-gray-300 py-2 font-normal  text-center">{data.discountApplied}</td>
                                    <td className="text-gray-500 border-r  w-full   border-gray-300 py-2 font-normal  text-center">{data.pendingFee}</td>
                                    <td className="text-gray-500 border-r w-full    border-gray-300 py-2 font-normal  text-center">{data.status}</td>
                                    <td className=" w-full text-center">
                                        {data.status === 'Submitted' ? (
                                            <>Paid</>
                                        ) : (
                                            <select
                                                className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm rounded-full bg-aquamarine py-2 my-2 mx-2"
                                                value={mode}
                                                onChange={(e) => handleModeChange(e, data)}
                                            >
                                                <option value="none">None</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Online">Online</option>
                                                <option value="RTGS">RTGS</option>
                                                <option value="Cheque">Cheque</option>
                                                <option value="Demand Draft">Demand Draft</option>
                                            </select>
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



            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 rounded-lg z-10 w-2/5">
                        <h2 className="text-xl mb-4">Confirm Payment</h2>
                        {selectedStudent && (
                            <div className='flex gap-20 items-center'>
                                <div>
                                    <p><strong>Name:</strong> {Name}</p>
                                    <p><strong>Class:</strong> {Class}</p>
                                    <p><strong>Section:</strong> {Section}</p>
                                    <p><strong>Month:</strong> {selectedStudent.month}</p>
                                </div>
                                <div>
                                    <p><strong>Discount:</strong> {selectedStudent.discountApplied}</p>
                                    <p><strong>Payable:</strong> {selectedStudent.amount}</p>
                                    <p><strong>Mode:</strong> {mode}</p>
                                </div>
                            </div>
                        )}
                        {mode === 'Online' || mode === 'Cash' ? (
                            <></>
                        ) : (
                            <input
                                type="text"
                                placeholder="Enter Document Number"
                                value={docId}
                                onChange={(e) => setDocId(e.target.value)}
                                className="border rounded p-2 w-full mb-4"
                            />
                        )}
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

