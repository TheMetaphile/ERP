import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDeleteForever, MdOutlineModeEdit, MdCheck, MdCancel, MdExpandMore } from "react-icons/md";
import AuthContext from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL_AskDoubt } from '../../../Config';

export default function MyDoubtTile({ data }) {
    const { authState } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [doubts, setDoubts] = useState(data);
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    useEffect(() => {
        setDoubts(data);
    }, [data]);

    const handleDelete = async (index, id) => {
        try {
            const response = await axios.delete(`${BASE_URL_AskDoubt}/doubts/delete?class=${authState.userDetails.currentClass}&doubtId=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            if (response.status === 200) {
                toast.success('Doubt Deleted Successfully');
                setDoubts(prevDoubts => prevDoubts.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error("Error deleting Doubt:", error);
            toast.error(error.response.data.error);
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
            const response = await axios.put(`${BASE_URL_AskDoubt}/doubts/update/student?id=${id}`, {
                class: authState.userDetails.currentClass,
                question: editedData.question,
                subject: editedData.subject
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
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
                        className="border border-gray-300 py-4 px-5 mt-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex justify-between items-center cursor-pointer mobile:max-tablet:flex-col gap-2 mobile:max-tablet:items-start" onClick={() => handleClick(index)}>
                            <div className='flex items-center gap-3 mobile:max-sm:flex-col mobile:max-sm:items-start'>
                                {editMode === index ? (
                                    <input
                                        type="text"
                                        name="subject"
                                        value={editedData.subject}
                                        onChange={handleInputChange}
                                        className="px-3 py-2 bg-blue-100 rounded-lg border border-blue-300 w-fit focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                ) : (
                                    <h1 className="px-3 py-2 bg-blue-100 rounded-lg border border-blue-300 w-fit font-semibold text-blue-800"> {item.subject}</h1>
                                )}
                                <div className="text-gray-500 px-3">Question No. {index + 1}</div>
                            </div>

                            <div className={`flex items-center ${item.status === "Pending" ? "text-orange-500" :
                                item.status === "Rejected" ? "text-red-500" :
                                    "text-green-500"
                                } font-medium gap-2 mobile:flex-wrap`}>
                                <div className='flex items-center gap-2'>
                                    {item.status === 'Pending' && (
                                        editMode === index ? (
                                            <>
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg shadow-md' onClick={() => handleConfirmEdit(index, item._id)}><MdCheck /></motion.button>
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg shadow-md' onClick={handleCancelEdit}><MdCancel /></motion.button>
                                            </>
                                        ) : (
                                            <>
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md flex items-center' onClick={() => handleEditToggle(index, item)}> <MdOutlineModeEdit /></motion.button>
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-md flex items-center' onClick={() => handleDelete(index, item._id)}><MdDeleteForever /></motion.button>
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
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex justify-between items-center mt-4 mobile:max-tablet:flex-col">
                                        <div className="font-normal px-2 w-full">
                                            {editMode === index ? (
                                                <textarea
                                                    name="question"
                                                    value={editedData.question}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    rows="3"
                                                />
                                            ) : (
                                                <p className="text-gray-700">{item.question}</p>
                                            )}
                                        </div>
                                    </div>
                                    {item.status === 'Resolved' && (
                                        <div className='mt-4 px-3 font-normal bg-green-100 p-3 rounded-lg'>
                                            <span className='text-lg font-medium text-green-700'>Answer:</span>
                                            <p className="mt-2 text-gray-700">{item.solution}</p>
                                        </div>
                                    )}
                                    <div className='px-3 flex items-center justify-between mt-4 text-sm text-gray-600'>
                                        {(item.status === 'Resolved' || item.status === 'Rejected') && (
                                            <div className='flex items-center gap-2'>
                                                <img src={item.teacher[0].profileLink} alt="" className='w-8 h-8 rounded-full border-2 border-blue-500'></img>
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
                            <MdExpandMore size={24} className="text-gray-500" />
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}