import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdCalendar, IoMdTime, IoMdCreate, IoMdTrash, IoMdCheckmark, IoMdClose } from 'react-icons/io';


export default function HomeWorkTile({ details, Class, additionalData, selectedSubject }) {
    const { authState, darkMode } = useContext(AuthContext);
    const [editingRow, setEditingRow] = useState(null);
    const [editedDetails, setEditedDetails] = useState(details);
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    const handleUpdateClick = (index) => {
        setEditingRow(index);
    };

    useEffect(() => {
        if (additionalData.length !== 0 && additionalData[0].subject === selectedSubject) {
            setEditedDetails(prevData => [...additionalData, ...prevData]);
        }
    }, [additionalData, selectedSubject]);

    const handleConfirmClick = async (index) => {
        const detail = editedDetails[index];
        try {
            const response = await axios.put(`${BASE_URL}/homework/update?class=${Class}&id=${detail._id}&date=${detail.date}`,
                {
                    update: {
                        subject: detail.subject,
                        chapter: detail.chapter,
                        topic: detail.topic,
                        description: detail.description,
                        date: detail.date,
                        deadline: detail.deadline
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Homework Updated');
                setEditingRow(null);
            }
        } catch (error) {
            console.error("Error updating homework:", error);
            toast.error(error.response.data.error);
        }
    };

    const handleDelete = async (index) => {
        const currentYear = new Date().getFullYear();
        const detail = editedDetails[index];
        try {
            const response = await axios.delete(`${BASE_URL}/homework/delete?class=${Class}&month=${new Date().getMonth() + 1}&year=${currentYear}&id=${detail._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Homework Deleted');
                setEditedDetails(editedDetails.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error("Error deleting homework:", error);
            toast.error(error.response.data.error);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedDetails = editedDetails.map((detail, i) =>
            i === index ? { ...detail, [field]: value } : detail
        );
        setEditedDetails(updatedDetails);
    };

    return (
        <div className={`space-y-4 mt-3 mobile:max-tablet:mx-2 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {editedDetails.map((detail, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`border rounded-lg shadow-lg overflow-hidden ${darkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-blue-200'
                        }`}
                >
                    <div className={`w-full flex-col p-4 space-y-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                        <motion.div
                            className="flex flex-col mobile:max-tablet:flex-col items-start justify-between cursor-pointer"
                            onClick={() => handleClick(index)}
                            whileHover={{ scale: 1.01 }}
                        >
                            {editingRow === index ? (
                                <>
                                    <div className='flex gap-2 items-center w-full'>
                                        <div className={`pl-2 font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Chapter: </div>
                                        <input
                                            className={`font-normal border rounded-lg px-3 py-2 text-justify flex-grow ${darkMode
                                                ? 'bg-gray-700 text-white border-gray-600'
                                                : 'border-blue-300 shadow-md'
                                                }`}
                                            value={detail.chapter}
                                            onChange={(e) => handleInputChange(index, 'chapter', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex gap-3 items-center w-full mt-2'>
                                        <div className={`pl-2 font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Subject: </div>
                                        <input
                                            className={`font-normal border rounded-lg px-3 py-2 text-justify flex-grow ${darkMode
                                                ? 'bg-gray-700 text-white border-gray-600'
                                                : 'border-blue-300 shadow-md'
                                                }`}
                                            value={detail.subject}
                                            onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex gap-3 items-center w-full mt-2'>
                                        <div className={`pl-2 font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Topic: </div>
                                        <input
                                            className={`font-normal border rounded-lg px-3 py-2 text-justify flex-grow ${darkMode
                                                ? 'bg-gray-700 text-white border-gray-600'
                                                : 'border-blue-300 shadow-md'
                                                }`}
                                            value={detail.topic}
                                            onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex flex-col w-full space-y-2'>
                                        <div className='flex justify-between items-center'>
                                            <div className={`pl-2 font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                                                Chapter: <span className='font-normal'>{detail.chapter}</span>
                                            </div>

                                            <motion.div
                                                className={`px-3 py-1 rounded-full ${darkMode
                                                    ? 'bg-blue-800 text-white'
                                                    : 'bg-blue-100 text-black'
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {detail.subject}
                                            </motion.div>
                                        </div>
                                        <div className={`pl-2 font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                                            Topic: <span className='font-normal'>{detail.topic}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>

                        <AnimatePresence>
                            {(editingRow === index || expanded === index) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {editingRow === index ? (
                                        <div className="flex flex-col space-y-2">
                                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Task: </div>
                                            <textarea
                                                rows={6}
                                                className={`font-normal border rounded-lg px-3 py-2 text-justify resize-none ${darkMode
                                                    ? 'bg-gray-700 text-white border-gray-600'
                                                    : 'border-blue-300 shadow-md'
                                                    }`}
                                                value={detail.description}
                                                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                                                Task: <span className='font-normal'>{detail.description}</span>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={`flex justify-between items-center mt-4 text-sm mobile:max-sm:flex-col mobile:max-sm:items-start ${darkMode ? 'text-gray-300' : 'text-black'}`}>
                            <div className="flex items-center space-x-2">
                                <IoMdCalendar />
                                <span>Date: {detail.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <IoMdTime />
                                {editingRow === index ? (
                                    <input
                                        className={`border-b bg-transparent focus:outline-none ${darkMode
                                            ? 'border-gray-600 text-white focus:border-blue-500'
                                            : 'border-blue-300 focus:border-blue-500'
                                            }`}
                                        value={detail.deadline}
                                        onChange={(e) => handleInputChange(index, 'deadline', e.target.value)}
                                    />
                                ) : (
                                    <span>Deadline: {detail.deadline}</span>
                                )}
                            </div>
                        </div>

                        <motion.div
                            className={`px-4 py-2 flex justify-end space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'
                                }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {editingRow === index ? (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 ${darkMode
                                            ? 'bg-green-700 hover:bg-green-600'
                                            : 'bg-green-500 hover:bg-green-600'
                                            }`}
                                        onClick={() => handleConfirmClick(index)}
                                    >
                                        <IoMdCheckmark className="text-xl" />
                                        <span>Save</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 ${darkMode
                                            ? 'bg-red-700 hover:bg-red-600'
                                            : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                        onClick={() => setEditingRow(null)}
                                    >
                                        <IoMdClose className="text-xl" />
                                        <span>Cancel</span>
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 ${darkMode
                                            ? 'bg-blue-700 hover:bg-blue-600'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                            }`}
                                        onClick={() => handleUpdateClick(index)}
                                    >
                                        <IoMdCreate className="text-xl" />
                                        <span>Edit</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2 ${darkMode
                                            ? 'bg-red-700 hover:bg-red-600'
                                            : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                        onClick={() => handleDelete(index)}
                                    >
                                        <IoMdTrash className="text-xl" />
                                        <span>Delete</span>
                                    </motion.button>
                                </>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
