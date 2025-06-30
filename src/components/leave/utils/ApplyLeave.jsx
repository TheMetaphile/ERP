import React, { useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaPencilAlt } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading';
import { BASE_URL } from '../../../Config';
import { refreshAccessToken } from '../../../RefreshTokenHelper';

export default function ApplyLeave({ onNewLeave, darkMode }) {
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const bgClass = darkMode
        ? 'bg-gradient-to-br from-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 to-blue-50';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
    const titleClass = darkMode ? 'text-indigo-400' : 'text-indigo-700';
    const inputClass = darkMode
        ? 'bg-gray-700 text-white border-gray-600 focus:ring-indigo-600 focus:border-indigo-600'
        : 'bg-white text-black border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500';
    const iconClass = darkMode ? 'text-indigo-400' : 'text-indigo-500';
    const buttonClass = darkMode
        ? 'bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800'
        : 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700';

    const handleApply = async () => {
        if (!startDate || !endDate || !reason) {
            toast.error("Please fill all fields");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/leave/apply`, {
                startDate,
                endDate,
                reason
            }, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`,
                }
            });
            if (response.status === 200) {
                toast.success('Leave applied successfully!');
                onNewLeave(response.data);
                setStartDate('');
                setEndDate('');
                setReason('');
            }
        } catch (error) {
            toast.error(error.message);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleApply();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getFromDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getToDate = () => {
        const today = new Date(startDate);
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`
                flex flex-col border ${borderClass} 
                items-center p-6 rounded-xl shadow-lg 
                ${bgClass}
            `}
        >
            <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`text-2xl md:text-3xl font-bold ${titleClass} mb-6`}
            >
                Apply for Leave
            </motion.h1>
            <div className='w-full max-w-md'>
                <div className="flex flex-col space-y-4 mb-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className='flex items-center space-x-2'
                    >
                        <FaCalendarAlt className={iconClass} />
                        <input
                            type="date"
                            min={getFromDate()}
                            className={`
                                flex-grow px-4 py-2 border rounded-lg 
                                focus:outline-none focus:ring-2 
                                ${inputClass}
                            `}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className='flex items-center space-x-2'
                    >
                        <FaCalendarAlt className={iconClass} />
                        <input
                            type="date"
                            min={getToDate()}
                            className={`
                                flex-grow px-4 py-2 border rounded-lg 
                                focus:outline-none focus:ring-2 
                                ${inputClass}
                            `}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </motion.div>
                </div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mb-6"
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <FaPencilAlt className={iconClass} />
                        <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Reason for Leave
                        </label>
                    </div>
                    <textarea
                        className={`
                            w-full px-4 py-2 border rounded-lg 
                            focus:outline-none focus:ring-2 
                            ${inputClass}
                        `}
                        rows={6}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    ></textarea>
                </motion.div>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                    flex items-center justify-center space-x-2 
                    ${buttonClass} text-white 
                    px-6 py-3 rounded-full 
                    font-medium shadow-md 
                    hover:shadow-lg 
                    transition duration-300
                `}
                onClick={handleApply}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <span>Apply</span>
                        <IoMdSend />
                    </>
                )}
            </motion.button>
        </motion.div>
    );
}