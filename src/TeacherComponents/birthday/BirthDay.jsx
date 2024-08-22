import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

function BirthDay() {
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/birthday/student');
    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar mobile:max-laptop: bg-blue-50"
        >
            <motion.h1 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className='text-3xl font-semibold mobile:max-tablet:text-xl text-blue-600'
            >
                Birthday Celebrations
            </motion.h1>
            <div className='mt-6 w-full'>
                <div className="flex items-center justify-between mb-3 ">
                    <div className="flex gap-2 -mb-0.5">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to={'/Teacher-Dashboard/birthday/teacher'}
                                className={`text-xl mobile:max-tablet:text-lg font-medium px-4 py-2 rounded-t-lg flex items-center gap-2 transition-colors duration-300 ${selectedLink === '/Teacher-Dashboard/birthday/teacher' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => handleLinkSelect('/Teacher-Dashboard/birthday/teacher')}
                            >
                                <FaChalkboardTeacher />
                                Teacher
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to={'/Teacher-Dashboard/birthday/student'}
                                className={`text-xl mobile:max-tablet:text-lg font-medium px-4 py-2 rounded-t-lg flex items-center gap-2 transition-colors duration-300 ${selectedLink === '/Teacher-Dashboard/birthday/student' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => handleLinkSelect('/Teacher-Dashboard/birthday/student')}
                            >
                                <FaUserGraduate />
                                Student
                            </Link>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Outlet />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default BirthDay