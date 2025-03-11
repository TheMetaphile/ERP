import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaChevronDown, FaChevronUp, FaClock, FaCalendarAlt, FaUser } from "react-icons/fa";
import AuthContext from '../../../Context/AuthContext';

export default function SubjectHomeWorkTile({ subject, details }) {
    const { darkMode } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(null);

    const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const borderClass = darkMode ? 'border-gray-700 hover:border-indigo-700' : 'border-gray-300 hover:border-indigo-300';
    const iconClass = darkMode ? 'text-indigo-400' : 'text-indigo-600';
    const subjectBgClass = darkMode ? 'bg-indigo-700' : 'bg-indigo-600';

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
                    className={`mt-4 p-4 w-full rounded-lg shadow-lg border ${bgClass} ${borderClass} transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                >
                    <motion.div 
                        className={`flex items-center justify-between cursor-pointer ${textClass}`} 
                        onClick={() => handleClick(index)}
                    >
                        <div className="flex items-center space-x-2">
                            <FaBook className={iconClass} />
                            <div className="font-medium">
                                Chapter: <span className="font-normal">{detail.chapter}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <motion.div 
                                className={`px-3 py-1 ${subjectBgClass} text-white rounded-full`}
                                whileHover={{ scale: 1.1 }}
                            >
                                {subject}
                            </motion.div>
                            {expanded === index ? 
                                <FaChevronUp className={subTextClass} /> : 
                                <FaChevronDown className={subTextClass} />
                            }
                        </div>
                    </motion.div>

                    <div className={`mt-2 pl-2 font-medium flex items-center space-x-2 ${subTextClass}`}>
                        <FaBook className={iconClass} />
                        <span>
                            Topic: <span className="font-normal">{detail.topic}</span>
                        </span>
                    </div>

                    <AnimatePresence>
                        {expanded === index && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`mt-2 pl-2 font-medium ${subTextClass}`}
                            >
                                Description: <span className="font-normal">{detail.description}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div 
                        className={`mt-4 flex flex-wrap justify-between items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-red-500" />
                            <span>
                                Deadline: <span className={`font-medium ${textClass}`}>{detail.deadline}</span>
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-green-500" />
                            <span>
                                Date: <span className={`font-medium ${textClass}`}>{detail.date}</span>
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-500" />
                            <span>By:</span>
                            <img 
                                src={detail.by.profileLink} 
                                alt="profile" 
                                className='w-6 h-6 rounded-full' 
                            />
                            <span className={`font-medium ${textClass}`}>{detail.by.name}</span>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    )
}