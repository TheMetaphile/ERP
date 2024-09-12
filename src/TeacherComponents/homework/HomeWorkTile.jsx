import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL_Homework } from '../../Config';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdCalendar, IoMdTime, IoMdCreate, IoMdTrash, IoMdCheckmark, IoMdClose } from 'react-icons/io';


export default function HomeWorkTile({ details, Class, additionalData, selectedSubject }) {
    const { authState } = useContext(AuthContext);
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
            const response = await axios.put(`${BASE_URL_Homework}/homework/update?class=${Class}&id=${detail._id}&date=${detail.date}`,
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
                        Authorization: `Bearer ${authState.accessToken}`,
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
            const response = await axios.delete(`${BASE_URL_Homework}/homework/delete?class=${Class}&month=${new Date().getMonth() + 1}&year=${currentYear}&id=${detail._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
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
        <div className="space-y-4 mt-3 mobile:max-tablet:mx-2">
            {editedDetails.map((detail, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className='bg-white border border-blue-200 rounded-lg shadow-lg overflow-hidden'
                >


                    <div className='w-full flex-col p-4 space-y-3'>
                        <motion.div
                            className="flex flex-col mobile:max-tablet:flex-col items-start justify-between cursor-pointer"
                            onClick={() => handleClick(index)}
                            whileHover={{ scale: 1.01 }}
                        >
                            {editingRow === index ? (
                                <>
                                    <div className='flex gap-2 items-center w-full'>
                                        <div className="pl-2 font-medium text-black">Chapter: </div>
                                        <input
                                            className="font-normal border border-blue-300 shadow-md rounded-lg px-3 py-2 text-justify flex-grow"
                                            value={detail.chapter}
                                            onChange={(e) => handleInputChange(index, 'chapter', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex gap-3 items-center w-full mt-2'>
                                        <div className="pl-2 font-medium text-black">Subject: </div>
                                        <input
                                            className="font-normal border border-blue-300 shadow-md rounded-lg px-3 py-2 text-justify flex-grow"
                                            value={detail.subject}
                                            onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex gap-3 items-center w-full mt-2'>
                                        <div className="pl-2 font-medium text-black">Topic: </div>
                                        <input
                                            className="font-normal border border-blue-300 shadow-md rounded-lg px-3 py-2 text-justify flex-grow"
                                            value={detail.topic}
                                            onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex flex-col w-full space-y-2'>
                                        <div className='flex justify-between items-center'>
                                            <div className="pl-2 font-medium text-black">Chapter: <span className='font-normal'>{detail.chapter}</span></div>

                                            <motion.div
                                                className="px-3 py-1 bg-blue-100 text-black rounded-full"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {detail.subject}
                                            </motion.div>
                                        </div>
                                        <div className="pl-2 font-medium text-black">Topic: <span className='font-normal'>{detail.topic}</span></div>
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
                                            <div className=" font-medium text-black">Task: </div>
                                            <textarea
                                                rows={6}
                                                className="font-normal border border-blue-300 shadow-md rounded-lg px-3 py-2 text-justify resize-none"
                                                value={detail.description}
                                                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className=" font-medium text-black">Task: <span className='font-normal'>{detail.description}</span></div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center mt-4 text-sm text-black mobile:max-sm:flex-col mobile:max-sm:items-start">
                            <div className="flex items-center space-x-2">
                                <IoMdCalendar />
                                <span>Date: {detail.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <IoMdTime />
                                {editingRow === index ? (
                                    <input
                                        className="border-b border-blue-300 bg-transparent focus:outline-none focus:border-blue-500"
                                        value={detail.deadline}
                                        onChange={(e) => handleInputChange(index, 'deadline', e.target.value)}
                                    />
                                ) : (
                                    <span>Deadline: {detail.deadline}</span>
                                )}
                            </div>
                        </div>

                        <motion.div
                            className='px-4 py-2 bg-blue-50 flex justify-end space-x-2'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {editingRow === index ? (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2"
                                        onClick={() => handleConfirmClick(index)}

                                    >
                                        <IoMdCheckmark className="text-xl" />
                                        <span>Save</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2"
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
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2"
                                        onClick={() => handleUpdateClick(index)}

                                    >
                                        <IoMdCreate className="text-xl" />
                                        <span>Edit</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md flex items-center space-x-2"
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
