import React, { useContext, useState } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Fee } from "../../../../Config";
import { useLocation, useParams } from "react-router-dom";

export default function FeeStructureField({ fees }) {
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
                'key': 'rzp_live_GFqD7mHBThythU',
                'amount': selectedStudent.payableAmount * 100,
                'name': 'METAPHILE',
                'description': selectedStudent.title,
                'retry': { 'enabled': true, 'max_count': 1 },
                'send_sms_hash': true,
                'prefill': {
                    'contact': '8979020025',
                    'email': 'bhanu68tyagi@gmail.com'
                },
                handler: function (response) {
                    const datee = new Date().toISOString().split('T')[0];
                    const installmentId = `${datee}-${id}`;
                    console.log(response, 'success online', datee, id, installmentId)

                    postPaymentDetails({
                        email: id, 
                        amount: selectedStudent.payableAmount,
                        date: datee,
                        status: "Success",
                        doc_id: selectedStudent.deadline,
                        installment_id: installmentId, 
                        order_id: "NA",
                        payment_id: response.razorpay_payment_id,
                        signature: "Online"
                    });

                },

            };

            const rzp1 = new Razorpay(options);

            rzp1.on("payment.failed", function (response) {
                const datee = new Date().toISOString().split('T')[0];
                const installmentId = `${datee}-${id}`;
                console.log(response, 'fail online', datee, id, installmentId);

                postPaymentDetails({
                    email: id, 
                    amount: selectedStudent.payableAmount,
                    date: datee,
                    status: "Failed",
                    doc_id: selectedStudent.deadline,
                    installment_id: installmentId, 
                    order_id: "NA",
                    payment_id: response.error.metadata.payment_id,
                    signature: "Online"
                });
            });

            rzp1.open();
        }
        else if (mode === 'Cash') {
            const datee = new Date().toISOString().split('T')[0];
            const installmentId = `${datee}-${id}`;
            console.log('normal', datee, id, installmentId);

            postPaymentDetails({
                email: id,
                amount: selectedStudent.payableAmount,
                date: datee,
                status: "Success",
                doc_id: selectedStudent.deadline,
                installment_id: installmentId,
                order_id: "NA",
                payment_id: 'Cash',
                signature: mode
            });
        }
        else {
            if(!docId){
                alert('Fill Doc Id First');
            }
            else{
                const datee = new Date().toISOString().split('T')[0];
                const installmentId = `${datee}-${id}`;
                console.log('normal', datee, id, installmentId);
    
                postPaymentDetails({
                    email: id,
                    amount: selectedStudent.payableAmount,
                    date: datee,
                    status: "Success",
                    doc_id: selectedStudent.deadline,
                    installment_id: installmentId,
                    order_id: "NA",
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
            {
                fees.map((data, index) => (
                    <tbody key={index} className={`w-full rounded-t-lg  whitespace-nowrap  flex items-center border-b border-gray-300 ${clickedIndex === index ? 'bg-secondary' : ''}`} onClick={() => handleClick(index)}>
                        <tr className=" w-full flex justify-between">
                            <td className="text-gray-500 border-r w-24  border-gray-300 py-2 font-normal  text-center my-2">{index + 1}</td>
                            <td className="text-gray-500 border-r w-64  border-gray-300 py-2 font-normal  text-center my-2">{data.title}</td>
                            <td className="text-gray-500 border-r w-28  border-gray-300 py-2 font-normal  text-center my-2">{data.session}</td>
                            <td className="text-gray-500 border-r w-28  border-gray-300 py-2 font-normal  text-center my-2">{data.amount}</td>
                            <td className="text-gray-500 border-r w-20  border-gray-300 py-2 font-normal  text-center my-2">{data.discount}</td>
                            <td className="text-gray-500 border-r w-60  border-gray-300 py-2 font-normal  text-center my-2">{data.payableAmount}</td>
                            <td className="text-gray-500 border-r w-36  border-gray-300 py-2 font-normal  text-center my-2">{data.deadline}</td>
                            <td className="text-gray-500 border-r w-24  border-gray-300 py-2 font-normal  text-center my-2">{data.status}</td>

                            <select
                                className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm rounded-full bg-secondary py-2 my-2 mx-2"
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
                        </tr>
                    </tbody>
                ))
            }

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
                                    <p><strong>Session:</strong> {selectedStudent.session}</p>
                                </div>
                                <div>
                                    <p><strong>Title:</strong> {selectedStudent.title}</p>
                                    <p><strong>Discount:</strong> {selectedStudent.discount}</p>
                                    <p><strong>Payable:</strong> {selectedStudent.payableAmount}</p>
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

