import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FeeStatusRow from './utils/feesStatusRow';
import FeeStructure from './utils/FeeStructure';
import TransactionRow from './utils/TransactionHistoryRow';
import { ToastContainer } from 'react-toastify';
import { PaymentProvider } from './utils/PaymentContext';

const MotionSelect = motion.select;

export default function Fees() {
    const [selectedOption, setSelectedOption] = useState('monthlyfee');

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const sectionVariants = {
        initial: { opacity: 0, x: -20 },
        in: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
    };

    return (
        <PaymentProvider>
            <motion.div
                className="flex flex-col w-full  mx-auto  space-y-6 min-h-screen"
                initial="initial"
                animate="in"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.5 }}
            >
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

                <motion.section variants={sectionVariants} transition={{ delay: 0.1 }}>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Fee Status</h1>
                    <FeeStatusRow />
                </motion.section>

                <motion.section variants={sectionVariants} transition={{ delay: 0.2 }} >
                    <div className='flex items-center justify-between w-full mb-4'>
                        <h2 className="text-3xl font-bold text-gray-800">Fees Structure</h2>
                        <MotionSelect
                            value={selectedOption}
                            onChange={handleDropdownChange}
                            className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <option value="admissionFee">Admission Fee</option>
                            <option value="monthlyfee">Monthly Fee</option>
                            <option value="quarterFee">Quarterly Fee</option>
                        </MotionSelect>
                    </div>
                    <FeeStructure selectedOption={selectedOption} />
                </motion.section>

                <motion.section variants={sectionVariants} transition={{ delay: 0.3 }}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Transaction History</h2>
                    <TransactionRow selectedOption={selectedOption} />
                </motion.section>
            </motion.div>
        </PaymentProvider>
    );
}