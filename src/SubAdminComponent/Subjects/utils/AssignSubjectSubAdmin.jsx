import React, { useState, useContext } from 'react';
import AssignSubjectRow from './AssignSubjectRow';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaMoon, FaSun } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../../../Context/AuthContext';
// Adjust path as needed

function AssignSubjectSubAdmin() {
    // Get darkMode state from AuthContext
    const { darkMode } = useContext(AuthContext);

    const content = [
        { class: 'Pre-Nursery' },
        { class: 'L.K.G' },
        { class: 'U.K.G' },
        { class: '1st' },
        { class: '2nd' },
        { class: '3rd' },
        { class: '4th' },
        { class: '5th' },
        { class: '6th' },
        { class: '7th' },
        { class: '8th' },
        { class: '9th' },
        { class: '10th' },
        { class: '11th' },
        { class: '12th' },
    ];
    const streams = ['PCM', 'PCMB', "PCB", 'Commerce', 'Arts', 'General'];
    const [selectedStream, setSelectedStream] = useState('');

    // Animation variants for consistent animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mb-3 no-scrollbar ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-secondary-50'
            } transition-colors duration-300 mobile:max-tablet:mx-2.5`}
        >
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />
            
            <div className='flex justify-between items-center w-full p-2'>
                <motion.h1
                    variants={itemVariants}
                    className={`text-3xl p-4 mobile:max-tablet:text-lg font-medium ${
                        darkMode ? 'text-white' : 'text-black400'
                    } flex items-center`}
                >
                    <FaChalkboardTeacher className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    Assign Subject Teacher
                </motion.h1>

                <motion.div 
                    variants={itemVariants}
                    className="flex items-center gap-4"
                >
                    <select
                        value={selectedStream}
                        onChange={(e) => setSelectedStream(e.target.value)}
                        className={`w-full p-3 rounded-md border ${
                            darkMode 
                                ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-400 focus:border-blue-400' 
                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                        } transition-colors duration-300`}
                    >
                        <option value="">Select Stream</option>
                        {streams.map((stream) => (
                            <option key={stream} value={stream}>
                                {stream}
                            </option>
                        ))}
                    </select>
                </motion.div>
            </div>

            <motion.div
                variants={itemVariants}
                className={`border rounded-lg shadow-lg w-full flex flex-col px-3 mobile:max-tablet:px-0 
                overflow-y-auto items-start mt-2 mb-3 no-scrollbar ${
                    darkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                } transition-colors duration-300`}
            >
                {content.map((con, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        custom={index}
                        className='w-full'
                    >
                        <AssignSubjectRow 
                            Class={con.class} 
                            key={index} 
                            selectedStream={selectedStream}
                            darkMode={darkMode} // Pass darkMode to child component
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default AssignSubjectSubAdmin;