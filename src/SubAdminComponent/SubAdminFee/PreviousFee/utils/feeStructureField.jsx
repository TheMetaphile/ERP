import React, { useContext, useState } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Fee } from "../../../../Config";
import { useLocation, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCalendarAlt, FaPercent, FaCreditCard, FaUser, FaChalkboardTeacher, FaSchool } from 'react-icons/fa';

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

    const handleModeChange = (e, student, index) => {
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
                        signature: "Online",
                        pending: true,
                        pendingId: selectedStudent._id
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
                    signature: "Online",
                    pending: true,
                    pendingId: selectedStudent._id
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
                signature: mode,
                pending: true,
                pendingId: selectedStudent._id
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
                    signature: mode,
                    pending: true,
                    pendingId: selectedStudent._id
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
            setFees(fees.filter((_, i) => i !== clickedIndex));


        } catch (error) {
            console.error('Error posting payment details:', error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const FeeStructureHeader = () => (
        <motion.thead className="bg-purple-200 rounded-t-lg w-full">
            <tr className="w-full flex">
                <th className="flex-1 p-4 text-center">Month</th>
                <th className="flex-1 p-4 text-center">Class</th>
                <th className="flex-1 p-4 text-center">Session</th>
                <th className="flex-1 p-4 text-center">Amount</th>
                <th className="flex-1 p-4 text-center">Discount</th>
                <th className="flex-1 p-4 text-center">Action</th>
            </tr>
        </motion.thead>
    );



    const Cell = ({ icon: Icon, content }) => (
        <td className="flex-1 p-4 text-center flex items-center justify-center">
            {/* <Icon className="mr-2 text-blue-500" /> */}
            <span>{content}</span>
        </td>
    );


    return (
        <motion.table
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto p-4 "
        >

            <>
                <FeeStructureHeader />
                {fees.map((data, index) => (
                    <motion.tbody
                        key={index}
                        variants={rowVariants}
                        className={`w-full rounded-lg shadow-md my-2 ${clickedIndex === index ? 'bg-blue-100' : 'bg-white'}`}
                        onClick={() => handleClick(index)}
                    >
                        <tr className="w-full flex">
                            <Cell icon={FaCalendarAlt} content={data.month} />
                            <Cell icon={FaCalendarAlt} content={data.class} />
                            <Cell icon={FaCalendarAlt} content={data.session} />

                            <Cell icon={FaMoneyBillWave} content={data.amount} />
                            <Cell icon={FaPercent} content={data.discount} />
                            <td className="flex-1 p-4 text-center">
                                {data.status === 'Submitted' ? (
                                    <span className="text-green-500 font-semibold">Paid</span>
                                ) : (
                                    <motion.select
                                        whileHover={{ scale: 1.05 }}
                                        className="w-full p-2 rounded-full bg-gradient-to-r from-blue-200 to-purple-300 text-black"
                                        value={mode}
                                        onChange={(e) => handleModeChange(e, data)}
                                    >
                                        <option value="none">Select Payment Mode</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Online">Online</option>
                                        <option value="RTGS">RTGS</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Demand Draft">Demand Draft</option>
                                    </motion.select>
                                )}
                            </td>
                        </tr>
                    </motion.tbody>
                ))}
            </>

            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-8 rounded-lg z-10 w-2/5 shadow-2xl"
                    >
                        <h2 className="text-2xl mb-6 font-bold text-blue-600">Confirm Payment</h2>
                        {selectedStudent && (
                            <div className='flex gap-20 items-center'>
                                <div>
                                    <p className="mb-2"><FaUser className="inline mr-2 text-blue-500" /><strong>Name:</strong> {Name}</p>
                                    <p className="mb-2"><FaChalkboardTeacher className="inline mr-2 text-blue-500" /><strong>Class:</strong> {Class}</p>
                                    <p className="mb-2"><FaSchool className="inline mr-2 text-blue-500" /><strong>Section:</strong> {Section}</p>
                                    <p className="mb-2"><FaCalendarAlt className="inline mr-2 text-blue-500" /><strong>Month:</strong> {selectedStudent.month}</p>
                                </div>
                                <div>
                                    <p className="mb-2"><FaPercent className="inline mr-2 text-blue-500" /><strong>Discount:</strong> {selectedStudent.discount}</p>
                                    <p className="mb-2"><FaMoneyBillWave className="inline mr-2 text-blue-500" /><strong>Payable:</strong> {selectedStudent.amount}</p>
                                    <p className="mb-2"><FaCreditCard className="inline mr-2 text-blue-500" /><strong>Mode:</strong> {mode}</p>
                                </div>
                            </div>
                        )}
                        {mode !== 'Online' && mode !== 'Cash' && (
                            <input
                                type="text"
                                placeholder="Enter Document Number"
                                value={docId}
                                onChange={(e) => setDocId(e.target.value)}
                                className="border rounded p-2 w-full mb-4"
                            />
                        )}
                        <div className="flex justify-end gap-4 mt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-green-500 text-white rounded-full"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-red-500 text-white rounded-full"
                                onClick={handleCancel}
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.table>
    );
}


