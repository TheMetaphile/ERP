import React, { useState, useContext, useEffect } from 'react';
import { MdEdit, MdDeleteForever, MdCheck } from "react-icons/md";
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL_Homework } from '../../Config';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdBook, IoMdCalendar, IoMdTime, IoMdCreate, IoMdTrash, IoMdCheckmark, IoMdClose } from 'react-icons/io';


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
                    transition={{ duration: 0.3 }}
                    className='bg-white border border-indigo-100 rounded-lg shadow-lg overflow-hidden'
                >
                    <div
                        className="p-4 cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
                        onClick={() => handleClick(index)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center space-x-2">
                                <IoMdBook className="text-indigo-600 text-xl" />
                                <h3 className="font-semibold text-lg text-indigo-900">
                                    {editingRow === index ? (
                                        <input
                                            className="border-b border-indigo-300 bg-transparent focus:outline-none focus:border-indigo-500"
                                            value={detail.chapter}
                                            onChange={(e) => handleInputChange(index, 'chapter', e.target.value)}
                                        />
                                    ) : (
                                        detail.chapter
                                    )}
                                </h3>
                            </div>
                            <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                                {editingRow === index ? (
                                    <input
                                        className="bg-transparent border-b border-indigo-300 focus:outline-none focus:border-indigo-500"
                                        value={detail.subject}
                                        onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                                    />
                                ) : (
                                    detail.subject
                                )}
                            </div>
                        </div>
                        <div className="text-indigo-700 font-medium mb-2">
                            Topic: {' '}
                            {editingRow === index ? (
                                <input
                                    className="border-b border-indigo-300 bg-transparent focus:outline-none focus:border-indigo-500"
                                    value={detail.topic}
                                    onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                                />
                            ) : (
                                <span className="font-normal text-indigo-600">{detail.topic}</span>
                            )}
                        </div>
                        <AnimatePresence>
                            {expanded === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="text-indigo-700 font-medium mt-2">
                                        Task: {' '}
                                        {editingRow === index ? (
                                            <textarea
                                                rows={4}
                                                className="w-full mt-1 border border-indigo-300 rounded p-2 focus:outline-none focus:border-indigo-500"
                                                value={detail.description}
                                                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                            />
                                        ) : (
                                            <span className="font-normal text-indigo-600">{detail.description}</span>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="flex justify-between items-center mt-4 text-sm text-indigo-500">
                            <div className="flex items-center space-x-2">
                                <IoMdCalendar />
                                <span>Date: {detail.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <IoMdTime />
                                {editingRow === index ? (
                                    <input
                                        className="border-b border-indigo-300 bg-transparent focus:outline-none focus:border-indigo-500"
                                        value={detail.deadline}
                                        onChange={(e) => handleInputChange(index, 'deadline', e.target.value)}
                                    />
                                ) : (
                                    <span>Deadline: {detail.deadline}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-indigo-50 flex justify-end space-x-2">
                        {editingRow === index ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-green-500 text-white px-3 py-1 rounded-md shadow-md flex items-center space-x-1"
                                    onClick={() => handleConfirmClick(index)}
                                >
                                    <IoMdCheckmark />
                                    <span>Save</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md flex items-center space-x-1"
                                    onClick={() => setEditingRow(null)}
                                >
                                    <IoMdClose />
                                    <span>Cancel</span>
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-indigo-500 text-white px-3 py-1 rounded-md shadow-md flex items-center space-x-1"
                                    onClick={() => handleUpdateClick(index)}
                                >
                                    <IoMdCreate />
                                    <span>Edit</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md flex items-center space-x-1"
                                    onClick={() => handleDelete(index)}
                                >
                                    <IoMdTrash />
                                    <span>Delete</span>
                                </motion.button>
                            </>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
