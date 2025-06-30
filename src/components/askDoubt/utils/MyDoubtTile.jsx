import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDeleteForever, MdOutlineModeEdit, MdCheck, MdCancel, MdExpandMore } from "react-icons/md";
import AuthContext from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../../Config';
import { refreshAccessToken } from '../../../RefreshTokenHelper';

export default function MyDoubtTile({ data, darkMode }) {
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [doubts, setDoubts] = useState(data);
    const [expanded, setExpanded] = useState(null);

    const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
    const inputClass = darkMode
        ? 'bg-gray-700 text-white border-gray-600 focus:ring-indigo-600'
        : 'bg-blue-100 text-black border-blue-300 focus:ring-blue-400';
    const subjectBadgeClass = darkMode
        ? 'bg-indigo-900 text-indigo-300 border-indigo-700'
        : 'bg-blue-100 text-blue-800 border-blue-300';

    const getStatusColorClass = (status) => {
        if (darkMode) {
            switch (status) {
                case 'Pending': return 'text-yellow-400';
                case 'Rejected': return 'text-red-400';
                case 'Resolved': return 'text-green-400';
                default: return 'text-gray-400';
            }
        } else {
            switch (status) {
                case 'Pending': return 'text-orange-500';
                case 'Rejected': return 'text-red-500';
                case 'Resolved': return 'text-green-500';
                default: return 'text-gray-500';
            }
        }
    };
    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    useEffect(() => {
        setDoubts(data);
    }, [data]);

    const handleDelete = async (index, id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/doubts/delete?class=${authState?.userDetails?.currentClass}&doubtId=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Doubt Deleted Successfully');
                setDoubts(prevDoubts => prevDoubts.filter((_, i) => i !== index));
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

    const handleEditToggle = (index, item) => {
        if (editMode === index) {
            setEditMode(null);
        } else {
            setEditMode(index);
            setEditedData({ subject: item.subject, question: item.question });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleConfirmEdit = async (index, id) => {
        try {
            const response = await axios.put(`${BASE_URL}/doubts/update/student?id=${id}`, {
                class: authState?.userDetails?.currentClass,
                question: editedData.question,
                subject: editedData.subject
            }, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Doubt Edited Successfully');
                setEditMode(null);
                setDoubts(prevDoubts => prevDoubts.map((item, i) => i === index ? { ...item, question: editedData.question, subject: editedData.subject } : item));
            }
        } catch (error) {
            console.error("Error editing Doubt:", error);
            toast.error(error.response.data.error);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleConfirmEdit(index, id);
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditedData({});
    };

    return (
        <motion.div layout>
            <AnimatePresence>
                {doubts.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`
                            border ${borderClass} py-4 px-5 mt-4 
                            rounded-lg shadow-md ${bgClass} 
                            hover:shadow-lg transition-shadow duration-300
                        `}
                    >
                        <div
                            className={`
                                flex justify-between items-center 
                                cursor-pointer mobile:max-tablet:flex-col 
                                gap-2 mobile:max-tablet:items-start 
                                ${textClass}
                            `}
                            onClick={() => handleClick(index)}
                        >
                            <div className='flex items-center gap-3 mobile:max-sm:flex-col mobile:max-sm:items-start'>
                                {editMode === index ? (
                                    <input
                                        type="text"
                                        name="subject"
                                        value={editedData.subject}
                                        onChange={handleInputChange}
                                        className={`
                                            px-3 py-2 rounded-lg border 
                                            w-fit focus:outline-none focus:ring-2 
                                            ${inputClass}
                                        `}
                                    />
                                ) : (
                                    <h1 className={`
                                        px-3 py-2 rounded-lg border 
                                        w-fit font-semibold 
                                        ${subjectBadgeClass}
                                    `}>
                                        {item.subject}
                                    </h1>
                                )}
                                <div className={`${subTextClass}`}>
                                    Question No. {index + 1}
                                </div>
                            </div>

                            <div className={`
                                flex items-center 
                                ${getStatusColorClass(item.status)} 
                                font-medium gap-2 mobile:flex-wrap
                            `}>
                                <div className='flex items-center gap-2'>
                                    {item.status === 'Pending' && (
                                        editMode === index ? (
                                            <>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`
                                                        ${darkMode
                                                            ? 'bg-green-700 hover:bg-green-600'
                                                            : 'bg-green-500 hover:bg-green-600'
                                                        } 
                                                        text-white px-3 py-2 rounded-lg shadow-md
                                                    `}
                                                    onClick={() => handleConfirmEdit(index, item._id)}
                                                >
                                                    <MdCheck />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`
                                                        ${darkMode
                                                            ? 'bg-gray-600 hover:bg-gray-500'
                                                            : 'bg-gray-400 hover:bg-gray-500'
                                                        } 
                                                        text-white px-3 py-2 rounded-lg shadow-md
                                                    `}
                                                    onClick={handleCancelEdit}
                                                >
                                                    <MdCancel />
                                                </motion.button>
                                            </>
                                        ) : (
                                            <>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`
                                                        ${darkMode
                                                            ? 'bg-blue-700 hover:bg-blue-600'
                                                            : 'bg-blue-500 hover:bg-blue-600'
                                                        } 
                                                        text-white px-3 py-2 rounded-lg shadow-md flex items-center
                                                    `}
                                                    onClick={() => handleEditToggle(index, item)}
                                                >
                                                    <MdOutlineModeEdit />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`
                                                        ${darkMode
                                                            ? 'bg-red-700 hover:bg-red-600'
                                                            : 'bg-red-500 hover:bg-red-600'
                                                        } 
                                                        text-white px-3 py-2 rounded-lg shadow-md flex items-center
                                                    `}
                                                    onClick={() => handleDelete(index, item._id)}
                                                >
                                                    <MdDeleteForever />
                                                </motion.button>
                                            </>
                                        )
                                    )}
                                </div>
                                <span className="font-bold">{item.status}</span>
                            </div>
                        </div>
                        <AnimatePresence>
                            {expanded === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <div className="flex justify-between items-center mt-4 mobile:max-tablet:flex-col">
                                        <div className={`font-normal px-2 w-full ${textClass}`}>
                                            {editMode === index ? (
                                                <textarea
                                                    name="question"
                                                    value={editedData.question}
                                                    onChange={handleInputChange}
                                                    className={`
                                                        w-full border rounded-lg 
                                                        px-3 py-2 focus:outline-none focus:ring-2 
                                                        ${inputClass}
                                                    `}
                                                    rows="3"
                                                />
                                            ) : (
                                                <p className={textClass}>{item.question}</p>
                                            )}
                                        </div>
                                    </div>
                                    {item.status === 'Resolved' && (
                                        <div className={`
                                            mt-4 px-3 font-normal p-3 rounded-lg 
                                            ${darkMode ? 'bg-green-900' : 'bg-green-100'}
                                        `}>
                                            <span className={`
                                                text-lg font-medium 
                                                ${darkMode ? 'text-green-300' : 'text-green-700'}
                                            `}>
                                                Answer:
                                            </span>
                                            <p className={textClass}>{item.solution}</p>
                                        </div>
                                    )}
                                    <div className={`
                                        px-3 flex items-center 
                                        justify-between mt-4 text-sm 
                                        ${subTextClass}
                                    `}>
                                        {(item.status === 'Resolved' || item.status === 'Rejected') && (
                                            <div className='flex items-center gap-2'>
                                                <img
                                                    src={item.teacher[0].profileLink}
                                                    alt=""
                                                    className='w-8 h-8 rounded-full border-2 border-blue-500'
                                                />
                                                <div>{item.teacher[0].name}</div>
                                            </div>
                                        )}
                                        <div className="font-medium">Date: {item.date}</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.div
                            className="mt-2 flex justify-center"
                            animate={{ rotate: expanded === index ? 180 : 0 }}
                        >
                            <MdExpandMore
                                size={24}
                                className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}