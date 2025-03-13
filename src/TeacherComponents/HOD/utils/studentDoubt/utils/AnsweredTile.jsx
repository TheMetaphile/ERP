import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaUserGraduate, FaQuestionCircle, FaBookOpen } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import { BASE_URL } from '../../../../../Config';

const DoubtCard = ({ doubt, index, expanded, handleClick, handleDelete, darkMode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`border p-4 rounded-lg shadow-lg mt-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-blue-200'}`}
        >
            <div className="flex items-center mobile:max-sm:flex-col mobile:max-sm:items-start justify-between cursor-pointer" onClick={() => handleClick(index)}>
                <div className="flex items-center space-x-4">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={doubt.student[0].profileLink}
                        alt=""
                        className={`w-12 h-12 rounded-full border-2 ${darkMode ? 'border-gray-500' : 'border-blue-300'}`}
                    />
                    <h3 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                        {doubt.student[0].name}
                    </h3>

                    <div>
                        <div className={`flex items-center text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} whitespace-nowrap`}>
                            <FaUserGraduate className="mr-1" />
                            <span>Roll: {doubt.student[0].rollNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                        {doubt.subject}
                    </span>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-blue-100'}`}
                    >
                        {expanded === index ?
                            <FaChevronUp className={`${darkMode ? 'text-white' : 'text-blue-600'}`} /> :
                            <FaChevronDown className={`${darkMode ? 'text-white' : 'text-blue-600'}`} />
                        }
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-md flex items-center"
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
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
                            <h4 className={`font-medium flex items-center mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                                <FaQuestionCircle className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                Question:
                            </h4>
                            <p className={`${darkMode ? 'text-gray-200' : 'text-blue-700'} mb-4`}>
                                {doubt.question}
                            </p>
                            {doubt.imageUrl && (
                                <img src={doubt.imageUrl} alt="Doubt" className="mt-2 max-w-xs rounded-lg shadow-md" />
                            )}
                        </div>
                        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
                            <h4 className={`font-medium flex items-center mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                                <FaBookOpen className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                Answer:
                            </h4>
                            <p className={`${darkMode ? 'text-gray-200' : 'text-blue-700'}`}>
                                {doubt.solution}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function AnsweredTile({ data, Class }) {
    const [expanded, setExpanded] = useState(null);
    const [resolvedDoubts, setResolvedDoubts] = useState([]);
    const { authState, darkMode } = useContext(AuthContext);

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
                    Authorization: `Bearer ${authState?.accessToken}`
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
                <h2 className={`text-2xl mobile:max-sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                    Resolved Doubts
                </h2>
                <div className={`flex items-center mobile:max-sm:text-xs text-white px-4 py-2 rounded-lg shadow-md ${darkMode ? 'bg-blue-800' : 'bg-blue-600'}`}>
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