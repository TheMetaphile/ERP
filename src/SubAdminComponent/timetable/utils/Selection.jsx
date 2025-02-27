import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaChalkboard, FaUsers } from 'react-icons/fa';

function Selection({ selectClass, selectedSection, onClassChange, onSectionChange, onStudentDayChange, onSearch }) {
    const [day, setDay] = useState('tuesday');
    const handleDayChange = (event) => {
        const value = event.target.value;
        setDay(value);
        onStudentDayChange(value);
    };

    const selectVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            className="border rounded-lg shadow-lg w-full flex flex-col p-3 overflow-y-auto items-start mt-4 mb-6 no-scrollbar bg-purple-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container w-full">
                <motion.div
                    className="flex justify-between items-center gap-4 mobile:max-tablet:flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, staggerChildren: 0.1 }}
                >
                    <motion.div className="w-1/4 mobile:max-tablet:w-full" variants={selectVariants}>
                        <div className="relative">
                            <FaChalkboard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600" />
                            <select
                                className="w-full pl-10 pr-4 py-3 border-2 border-purple-300 rounded-md bg-white text-purple-800 focus:outline-none focus:border-purple-500 transition duration-300"
                                value={selectClass}
                                onChange={(e) => onClassChange(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {["Pre-Nursery", "Nursery", "L.K.J", "U.K.J", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map(
                                    (cls) => <option key={cls} value={cls}>{cls}</option>
                                )}
                            </select>
                        </div>
                    </motion.div>

                    <motion.div className="w-1/4 mobile:max-tablet:w-full" variants={selectVariants}>
                        <div className="relative">
                            <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600" />
                            <select
                                className="w-full pl-10 pr-4 py-3 border-2 border-purple-300 rounded-md bg-white text-purple-800 focus:outline-none focus:border-purple-500 transition duration-300"
                                value={selectedSection}
                                onChange={(e) => onSectionChange(e.target.value)}
                            >
                                <option value="">Select Section</option>
                                {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
                                    (section) => <option key={section} value={section}>{section}</option>
                                )}
                            </select>
                        </div>
                    </motion.div>

                    <motion.div className="w-1/4 mobile:max-tablet:w-full" variants={selectVariants}>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600" />
                            <select
                                className="w-full pl-10 pr-4 py-3 border-2 border-purple-300 rounded-md bg-white text-purple-800 focus:outline-none focus:border-purple-500 transition duration-300"
                                value={day}
                                onChange={handleDayChange}
                            >
                                <option value="">Select Day</option>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                                    (d) => <option key={d.toLowerCase()} value={d.toLowerCase()}>{d}</option>
                                )}
                            </select>
                        </div>
                    </motion.div>

                    {/* <motion.button
            className="px-6 py-3 bg-purple-600 text-white rounded-md flex items-center justify-center hover:bg-purple-700 transition duration-300"
            onClick={onSearch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch className="mr-2" />
            Search
          </motion.button> */}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Selection