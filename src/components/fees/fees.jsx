import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FeeStatusRow from './utils/feesStatusRow';
import FeeStructure from './utils/FeeStructure';
import TransactionRow from './utils/TransactionHistoryRow';
import { toast, ToastContainer } from 'react-toastify';
import { PaymentProvider } from './utils/PaymentContext';
import AuthContext from '../../Context/AuthContext';
import StudentCard from '../../SubAdminComponent/SubAdminFee/StudentFee/utils/ProfileCard';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import { refreshAccessToken } from '../../RefreshTokenHelper';

const MotionSelect = motion.select;

export default function Fees() {
    const [selectedOption, setSelectedOption] = useState('monthlyfee');
    const [Fee, setFee] = useState([]);
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-gray-800';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
    const selectClass = darkMode
        ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-600'
        : 'bg-white text-black border-gray-300 focus:ring-blue-500';

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const fetchFees = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/fee/fetch/student/detailedFee/${authState?.userDetails?._id}`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });

            setFee(response.data);
        }
        catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchFees();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    useEffect(() => {
        if (authState?.userDetails?._id && authState?.accessToken) {
            fetchFees();
        }
    }, [authState?.userDetails, authState?.accessToken]);

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
                className={`flex flex-col w-full mx-auto space-y-6 min-h-screen ${bgClass}`}
                initial="initial"
                animate="in"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.5 }}
            >
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    theme={darkMode ? 'dark' : 'light'}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <StudentCard
                    currentClass={authState?.userDetails?.currentClass}
                    email={authState?.userDetails?.email}
                    fatherName={authState?.userDetails?.fatherName}
                    name={authState?.userDetails?.name}
                    profileLink={authState?.userDetails?.profileLink}
                    rollNumber={authState?.userDetails?.rollNumber}
                    section={authState?.userDetails?.section}
                    darkMode={darkMode}
                />

                <motion.section variants={sectionVariants} transition={{ delay: 0.1 }}>
                    <h1 className={`text-3xl mobile:max-tablet:text-lg font-bold ${textClass} mb-4`}>
                        Fee Status
                    </h1>
                    <FeeStatusRow darkMode={darkMode} />
                </motion.section>

                <motion.section variants={sectionVariants} transition={{ delay: 0.2 }}>
                    <div className='flex items-center justify-between w-full mb-4'>
                        <h2 className={`text-3xl mobile:max-tablet:text-lg font-bold ${textClass}`}>
                            Fees Structure
                        </h2>
                        <MotionSelect
                            value={selectedOption}
                            onChange={handleDropdownChange}
                            className={`border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:border-transparent ${selectClass}`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <option value="admissionFee">Admission Fee</option>
                            <option value="monthlyfee">Monthly Fee</option>
                            <option value="quarterFee">Quarterly Fee</option>
                        </MotionSelect>
                    </div>
                    <FeeStructure
                        selectedOption={selectedOption}
                        fees={Fee}
                        setFees={setFee}
                        darkMode={darkMode}
                    />
                </motion.section>

                <motion.section variants={sectionVariants} transition={{ delay: 0.3 }}>
                    <h2 className={`text-3xl font-bold ${textClass} mb-4`}>
                        Transaction History
                    </h2>
                    <TransactionRow
                        selectedOption={selectedOption}
                        darkMode={darkMode}
                    />
                </motion.section>
            </motion.div>
        </PaymentProvider>
    );
}