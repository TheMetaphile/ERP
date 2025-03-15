import React, { useContext, useState } from "react";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL } from "../../../../Config";
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCalendarAlt, FaPercent, FaCreditCard, FaUser, FaChalkboardTeacher, FaSchool } from 'react-icons/fa';
import FeePaymentRow from "./FeePaymentRow";
import FeePaymentRowQuarter from "./FeePaymentRowQuarter";

export default function FeeStructureField({ fees, selectedOption, setFees, Student, fetchFees, selectedDiscount, removeDiscount, fetchTransaction }) {
    const [Razorpay] = useRazorpay();
    const { authState, darkMode } = useContext(AuthContext);
    const [mode, setMode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [docId, setDocId] = useState('');
    const id = Student.email;
    const [clickedIndex, setClickedIndex] = useState(null);


    console.log('SelectedDiscount: ', selectedDiscount, "removeDiscount: ", removeDiscount)
    const handleClick = (index) => {
        setClickedIndex(index);
    };


    const Class = Student.currentClass;
    const Name = Student.name;
    const Section = Student.section;

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
            const response = await axios.post(`${BASE_URL}/fee/payment`,
                paymentDetails,
                {
                    headers: {
                        'Authorization': `Bearer ${authState?.accessToken}`
                    }
                }
            );
            console.log('Payment details posted successfully:', response.data);

            setFees((prev) => {
                const field = selectedOption === 'monthlyfee' ? 'monthlyStatus' : 'quarterlyStatus';

                // Create a deep copy of the 'fees' object
                const updatedFees = {
                    ...prev,
                    [field]: prev[field].map((item, index) => {
                        if (index === clickedIndex) {
                            return {
                                ...item,
                                status: 'Submitted', // Update the specific field you want
                            };
                        }
                        return item;
                    })
                };

                return updatedFees; // Return the updated fees object
            });


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
        <motion.thead className={`${darkMode ? 'bg-gray-700' : 'bg-blue-200'
            }`}>
            <tr>
                {[
                    'Month', 'Total Fee', 'Paid Fee', 'Applied Discount',
                    'Pending Fee', 'Payment Method', 'Doc Id', 'Status',
                    'Discount', 'Amount', 'Payment Mode'
                ].map((header) => (
                    <th
                        key={header}
                        className={`px-3 py-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'
                            }`}
                    >
                        {header}
                    </th>
                ))}
            </tr>
        </motion.thead>
    );

    const QuarterFeeHeader = () => (
        <motion.thead
            variants={rowVariants}
            className={`${darkMode ? 'bg-gray-700' : 'bg-blue-200'
                }`}
        >
            <tr>
                {[
                    'Months', 'Quarter', 'Total Fee', 'Paid Fee',
                    'Applied Discount', 'Pending Fee', 'Payment Method',
                    'Doc Id', 'Status', 'Discount', 'Amount', 'Payment Mode'
                ].map((header) => (
                    <th
                        key={header}
                        className={`px-3 py-3 ${darkMode ? 'text-gray-300' : 'text-gray-800'
                            }`}
                    >
                        {header}
                    </th>
                ))}
            </tr>
        </motion.thead>
    );

    const Cell = ({ content }) => (
        <td className="flex-1 p-4 text-center flex items-center justify-center">
            <span>{content}</span>
        </td>
    );


    return (
        <motion.table
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`w-full ${darkMode ? 'bg-gray-900 text-gray-200' : ''}`}
        >
            {selectedOption === 'monthlyfee' && (
                <>
                    <FeeStructureHeader />
                    {fees.monthlyStatus.map((data, index) => (
                        <tbody key={index}>
                            <FeePaymentRow
                                student={data}
                                fetchFees={fetchFees}
                                fetchTransaction={fetchTransaction}
                                selectedStudent={Student}
                                selectedDiscount={selectedDiscount}
                            />
                        </tbody>
                    ))}
                </>
            )}

            {selectedOption === 'quarterFee' && (
                <>
                    <QuarterFeeHeader />
                    {fees.quarterlyStatus.map((data, index) => (
                        <tbody key={index}>
                            <FeePaymentRowQuarter
                                student={data}
                                fetchFees={fetchFees}
                                fetchTransaction={fetchTransaction}
                                selectedStudent={Student}
                                selectedDiscount={selectedDiscount}
                            />
                        </tbody>
                    ))}
                </>
            )}

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
                        className={`p-8 rounded-lg z-10 w-2/5 shadow-2xl ${darkMode
                            ? 'bg-gray-800 text-gray-200'
                            : 'bg-white'
                            }`}
                    >
                        <h2 className={`text-2xl mb-6 font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`}>
                            Confirm Payment
                        </h2>

                        {selectedStudent && (
                            <div className='flex gap-20 items-center'>
                                <div>
                                    {[
                                        { icon: FaUser, label: 'Name', value: Name },
                                        { icon: FaChalkboardTeacher, label: 'Class', value: Class },
                                        { icon: FaSchool, label: 'Section', value: Section },
                                        { icon: FaCalendarAlt, label: 'Month', value: selectedStudent.month }
                                    ].map(({ icon: Icon, label, value }) => (
                                        <p
                                            key={label}
                                            className={`mb-2 ${darkMode ? 'text-gray-300' : ''
                                                }`}
                                        >
                                            <Icon className={`inline mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'
                                                }`} />
                                            <strong>{label}:</strong> {value}
                                        </p>
                                    ))}
                                </div>

                                <div>
                                    {[
                                        { icon: FaPercent, label: 'Discount', value: selectedStudent.discountApplied },
                                        { icon: FaMoneyBillWave, label: 'Payable', value: selectedStudent.amount },
                                        { icon: FaCreditCard, label: 'Mode', value: mode }
                                    ].map(({ icon: Icon, label, value }) => (
                                        <p
                                            key={label}
                                            className={`mb-2 ${darkMode ? 'text-gray-300' : ''
                                                }`}
                                        >
                                            <Icon className={`inline mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'
                                                }`} />
                                            <strong>{label}:</strong> {value}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {mode !== 'Online' && mode !== 'Cash' && (
                            <input
                                type="text"
                                placeholder="Enter Document Number"
                                value={docId}
                                onChange={(e) => setDocId(e.target.value)}
                                className={`border rounded p-2 w-full mb-4 ${darkMode
                                    ? 'bg-gray-700 text-gray-200 border-gray-600'
                                    : ''
                                    }`}
                            />
                        )}

                        <div className="flex justify-end gap-4 mt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 text-white rounded-full ${darkMode
                                    ? 'bg-green-700 hover:bg-green-800'
                                    : 'bg-green-500 hover:bg-green-600'
                                    }`}
                                onClick={handleConfirm}
                            >
                                Confirm
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2 text-white rounded-full ${darkMode
                                    ? 'bg-red-700 hover:bg-red-800'
                                    : 'bg-red-500 hover:bg-red-600'
                                    }`}
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


