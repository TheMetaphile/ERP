import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaUserGraduate, FaQuestionCircle, FaBookOpen } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import { refreshAccessToken } from '../../../RefreshTokenHelper';

const DoubtCard = ({ doubt, index, expanded, handleClick, handleDelete, darkMode }) => {

    const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const borderClass = darkMode ? 'border-gray-700' : 'border-blue-200';
    const textClass = {
        primary: darkMode ? 'text-blue-300' : 'text-blue-800',
        secondary: darkMode ? 'text-blue-400' : 'text-blue-600',
        question: darkMode ? 'text-blue-400' : 'text-blue-700',
    };
    const iconClass = darkMode
        ? { primary: 'text-blue-400', secondary: 'text-blue-500' }
        : { primary: 'text-blue-600', secondary: 'text-blue-600' };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`border ${borderClass} p-4 rounded-lg shadow-lg mt-4 ${bgClass}`}
        >
            <div className={`flex mobile:max-sm:flex-col mobile:max-sm:items-start items-center justify-between cursor-pointer ${textClass.primary}`}
                onClick={() => handleClick(index)}>
                <div className="flex items-center space-x-4">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={doubt.student[0].profileLink}
                        alt=""
                        className={`w-12 h-12 rounded-full border-2 ${darkMode ? 'border-blue-700' : 'border-blue-300'}`}
                    />
                    <h3 className="font-semibold text-blue-800">{doubt.student[0].name}</h3>

                    <div>
                        <div className={`flex items-center text-sm ${textClass.secondary} whitespace-nowrap`}>
                            <FaUserGraduate className="mr-1" />
                            <span>Roll: {doubt.student[0].rollNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className={`font-medium ${textClass.secondary}`}>{doubt.subject}</span>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-full  ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}
                    >
                        {expanded === index ? <FaChevronUp className={iconClass.primary} /> : <FaChevronDown className={iconClass.primary} />}
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`
                            hover:bg-red-600 text-white 
                            px-3 py-2 rounded-lg shadow-md 
                            flex items-center 
                            ${darkMode ? 'bg-red-700' : 'bg-red-500'}
                          `}
                        onClick={() => handleDelete(index, doubt._id)}
                    >
                        <MdDeleteForever />
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {expanded === index && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                    >
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                            <h4 className={`font-medium flex items-center mb-2  ${textClass.primary}`}>
                                <FaQuestionCircle
                                    className={`mr-2 ${iconClass.secondary}`}
                                />
                                Question:
                            </h4>
                            <p className={`${textClass.question} mb-4`}>{doubt.question}</p>

                            {doubt.imageUrl && (
                                <img src={doubt.imageUrl} alt="Doubt" className="mt-2 max-w-xs rounded-lg shadow-md" />
                            )}
                        </div>
                        <div className={`mt-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                            <h4 className={`font-medium flex items-center mb-2 ${textClass.primary}`}>
                                <FaBookOpen className={`mr-2 ${iconClass.secondary}`} />
                                Answer:
                            </h4>
                            <p className="text-blue-700">{doubt.solution}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function AnsweredTile({ data, Class, darkMode }) {
    const [expanded, setExpanded] = useState(null);
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [resolvedDoubts, setResolvedDoubts] = useState([]);

    const textClass = darkMode ? 'text-white' : 'text-black';
    const counterClass = darkMode
        ? 'bg-blue-700 text-white'
        : 'bg-blue-600 text-white';

    useEffect(() => {
        if (data) {
            setResolvedDoubts(data.filter(doubt => doubt.status === "Resolved"));
        }
    }, [data]);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const handleDelete = async (index, id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/doubts/delete?class=${Class}&doubtId=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Doubt Deleted Successfully');
                setResolvedDoubts((prevPendingDoubts) =>
                    prevPendingDoubts.filter((_, i) => i !== index)
                );
            }
        } catch (error) {
            console.error("Error deleting Doubt:", error);
            toast.error(error.response.data.error);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleDelete(index, id);
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full mx-auto"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between mb-6"
            >

                <h2 className={`text-2xl mobile:max-tablet:text-sm font-medium ${textClass}`}>Resolved Doubts</h2>
                <div className={` flex items-center mobile:max-tablet:p-2 mobile:max-tablet:text-xs px-4 py-2  rounded-lg shadow-md ${counterClass}`}>

                    <IoMdCheckmarkCircleOutline className="mr-2" />
                    <span>{resolvedDoubts.length} Resolved</span>
                </div>
            </motion.div>

            {resolvedDoubts.map((doubt, index) => (
                <DoubtCard
                    key={index}
                    doubt={doubt}
                    index={index}
                    expanded={expanded}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                    darkMode={darkMode}
                />
            ))}
        </motion.div>
    );
}