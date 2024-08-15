import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaChevronDown, FaChevronUp, FaClock, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function SubjectHomeWorkTile({ subject, details }) {
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    return (
        <motion.div 
            className='mt-2 w-full px-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {details.map((detail, index) => (
                <motion.div 
                    key={index} 
                    className='mt-4 p-4 w-full rounded-lg shadow-lg border border-gray-300 hover:border-indigo-300 transition-all duration-300'
                    whileHover={{ scale: 1.02 }}
                >
                    <motion.div 
                        className="flex items-center justify-between cursor-pointer" 
                        onClick={() => handleClick(index)}
                    >
                        <div className="flex items-center space-x-2">
                            <FaBook className="text-indigo-600" />
                            <div className="font-medium">Chapter: <span className="font-normal">{detail.chapter}</span></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <motion.div 
                                className="px-3 py-1 bg-indigo-600 text-white rounded-full"
                                whileHover={{ scale: 1.1 }}
                            >
                                {subject}
                            </motion.div>
                            {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </motion.div>

                    <div className="mt-2 pl-2 font-medium flex items-center space-x-2">
                        <FaBook className="text-indigo-500" />
                        <span>Topic: <span className="font-normal">{detail.topic}</span></span>
                    </div>

                    <AnimatePresence>
                        {expanded === index && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 pl-2 font-medium"
                            >
                                Description: <span className="font-normal">{detail.description}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div 
                        className='mt-4 flex flex-wrap justify-between items-center text-gray-600 text-sm'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-red-500" />
                            <span>Deadline: <span className="font-medium text-black">{detail.deadline}</span></span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-green-500" />
                            <span>Date: <span className="font-medium text-black">{detail.date}</span></span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-500" />
                            <span>By:</span>
                            <img src={detail.by.profileLink} alt="profile" className='w-6 h-6 rounded-full' />
                            <span className="font-medium text-black">{detail.by.name}</span>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    )
}