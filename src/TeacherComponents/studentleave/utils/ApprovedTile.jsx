import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCalendarAlt, FaClipboardCheck, FaUserGraduate } from "react-icons/fa";

export default function ApprovedTile({ data }) {
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <motion.div 
            className="w-full bg-black space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {data.StudentsLeaves.filter(student => student.status === 'Approved').map((student, studentIndex) => (
                <motion.div 
                    key={student._id} 
                    className="bg-white border-2 border-indigo-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.div 
                        className='flex justify-between items-center cursor-pointer'
                        onClick={() => handleClick(studentIndex)}
                    >
                        <div className='flex items-center space-x-4'>
                            <motion.img 
                                src={student.profileLink} 
                                alt="" 
                                className='w-12 h-12 rounded-full border-2 border-indigo-300'
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            />
                            <div>
                                <h3 className='font-semibold text-lg text-indigo-800'>{student.name}</h3>
                                <div className='flex items-center text-indigo-600'>
                                    <FaUserGraduate className="mr-2" />
                                    <p>Class {data.class} {data.section}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <motion.div 
                                className='flex items-center text-indigo-600'
                                whileHover={{ scale: 1.05 }}
                            >
                                <FaCalendarAlt className="mr-2" />
                                <span>{student.startDate} to {student.endDate}</span>
                            </motion.div>
                            <motion.div 
                                animate={{ rotate: expanded === studentIndex ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaChevronDown className="text-indigo-600" />
                            </motion.div>
                        </div>
                    </motion.div>
                    
                    <AnimatePresence>
                        {expanded === studentIndex && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className='mt-4'
                            >
                                <h4 className='text-lg font-semibold text-indigo-700 mb-2'>Reason</h4>
                                <motion.p 
                                    className='bg-indigo-50 p-3 rounded-lg text-indigo-800'
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {student.reason}
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <motion.div 
                        className='mt-4 flex items-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaClipboardCheck className="text-green-500 mr-2" />
                        <span className='font-medium text-green-600'>{student.status}</span>
                    </motion.div>
                </motion.div>
            ))}
            {data.StudentsLeaves.filter(student => student.status === 'Approved').length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-indigo-600 font-medium p-4 bg-indigo-50 rounded-xl"
                >
                    No approved leaves
                </motion.div>
            )}
        </motion.div>
    )
}