import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaUserGraduate, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Student_Leave } from '../../../Config';

export default function NewTile({ data }) {
    const [expanded, setExpanded] = useState(null);
    const { authState } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        if (data && data.StudentsLeaves) {
            setLeaves(data.StudentsLeaves);
        }
    }, [data]);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    const handleStatusUpdate = async (leaveId, status, email) => {
        console.log('id', leaveId, 'status', status, 'email', email)
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL_Student_Leave}/leave/update`,
                {
                    status: status,
                    leaveId: leaveId
                },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );
            console.log(`Leave ${leaveId} status updated to ${status}:`, response.data);
            setLeaves(prevLeaves => prevLeaves.filter(leave => leave._id !== leaveId));
        } catch (err) {
            console.error("Error updating status");
            setError(`Error updating status: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const expandVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }
    };

    return (
        <motion.div 
            className="w-full space-y-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {data.length > 0 ? (
                data.filter(student => student.status === "Pending").map((student, studentIndex) => (
                    <motion.div 
                        key={studentIndex} 
                        className="border border-blue-200 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                        whileHover={{ scale: 1.02 }}
                        layout
                    >
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => handleClick(`${studentIndex}`)}>
                            <div className="flex items-center space-x-4">
                                <img src={student.profileLink} alt="" className="w-12 h-12 rounded-full border-2 border-blue-300" />
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-700">{student.name}</h3>
                                    <div className="flex items-center text-sm text-blue-600">
                                        <FaUserGraduate className="mr-2" />
                                        Class {authState.ClassDetails.class} {authState.ClassDetails.section}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-sm text-blue-600">
                                    <FaCalendarAlt className="inline mr-2" />
                                    {student.startDate} - {student.endDate}
                                </div>
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: expanded === `${studentIndex}` ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown className="text-blue-500" />
                                </motion.div>
                            </div>
                        </div>
                        <AnimatePresence>
                            {expanded === `${studentIndex}` && (
                                <motion.div
                                    variants={expandVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="mt-4"
                                >
                                    <h4 className="text-lg font-medium text-blue-600 mb-2">Reason</h4>
                                    <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{student.reason}</p>
                                    <div className="mt-4 flex space-x-4">
                                        <motion.button
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors duration-300"
                                            onClick={() => handleStatusUpdate(student._id, 'Approved', student.email)}
                                            disabled={loading}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaCheckCircle className="inline mr-2" /> Approve
                                        </motion.button>
                                        <motion.button
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors duration-300"
                                            onClick={() => handleStatusUpdate(student._id, 'Rejected', student.email)}
                                            disabled={loading}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaTimesCircle className="inline mr-2" /> Reject
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))
            ) : (
                <motion.div 
                    className="text-center text-blue-600 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    No new leave requests
                </motion.div>
            )}

            {data.filter(student => student.status === 'Approved').map((student, studentIndex) => (
                <motion.div 
                    key={student._id} 
                    className="border border-green-200 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                    layout
                >
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => handleClick(studentIndex)}>
                        <div className="flex items-center space-x-4">
                            <img src={student.profileLink} alt="" className="w-12 h-12 rounded-full border-2 border-green-300" />
                            <div>
                                <h3 className="text-lg font-semibold text-green-700">{student.name}</h3>
                                <div className="flex items-center text-sm text-green-600">
                                    <FaUserGraduate className="mr-2" />
                                    Class {authState.ClassDetails.class} {authState.ClassDetails.section}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-green-600">
                                <FaCalendarAlt className="inline mr-2" />
                                {student.startDate} - {student.endDate}
                            </div>
                            <motion.div
                                initial={false}
                                animate={{ rotate: expanded === studentIndex ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaChevronDown className="text-green-500" />
                            </motion.div>
                        </div>
                    </div>
                    <AnimatePresence>
                        {expanded === studentIndex && (
                            <motion.div
                                variants={expandVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="mt-4"
                            >
                                <h4 className="text-lg font-medium text-green-600 mb-2">Reason</h4>
                                <p className="text-gray-700 bg-green-50 p-3 rounded-lg">{student.reason}</p>
                                <div className="mt-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                                        {student.status}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}

            {data.filter(student => student.status === 'Rejected').map((student, studentIndex) => (
                <motion.div 
                    key={student._id} 
                    className="border border-red-200 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                    layout
                >
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => handleClick(studentIndex)}>
                        <div className="flex items-center space-x-4">
                            <img src={student.profileLink} alt="" className="w-12 h-12 rounded-full border-2 border-red-300" />
                            <div>
                                <h3 className="text-lg font-semibold text-red-700">{student.name}</h3>
                                <div className="flex items-center text-sm text-red-600">
                                    <FaUserGraduate className="mr-2" />
                                    Class {authState.ClassDetails.class} {authState.ClassDetails.section}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-red-600">
                                <FaCalendarAlt className="inline mr-2" />
                                {student.startDate} - {student.endDate}
                            </div>
                            <motion.div
                                initial={false}
                                animate={{ rotate: expanded === studentIndex ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaChevronDown className="text-red-500" />
                            </motion.div>
                        </div>
                    </div>
                    <AnimatePresence>
                        {expanded === studentIndex && (
                            <motion.div
                                variants={expandVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="mt-4"
                            >
                                <h4 className="text-lg font-medium text-red-600 mb-2">Reason</h4>
                                <p className="text-gray-700 bg-red-50 p-3 rounded-lg">{student.reason}</p>
                                <div className="mt-4">
                                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium">
                                        {student.status}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </motion.div>
    );
}