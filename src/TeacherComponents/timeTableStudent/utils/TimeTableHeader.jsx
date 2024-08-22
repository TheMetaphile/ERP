import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaChalkboardTeacher, FaClock, FaGraduationCap } from 'react-icons/fa';

export default function TimetableHeader() {
    const headerItems = [
        { icon: FaGraduationCap, text: "Lecture" },
        { icon: FaBook, text: "Subject" },
        { icon: FaChalkboardTeacher, text: "Teacher" },
        { icon: FaClock, text: "Timing" },
    ];

    return (

            <motion.thead 
                className="bg-gradient-to-r from-blue-400  to-blue-200 text-black rounded-t-lg overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
               
            >
                <tr>
                    {headerItems.map((item, index) => (
                        <motion.th 
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-4 text-center w-1/4"
                        >
                            <motion.div 
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-center space-x-2"
                            >
                                <item.icon className="text-xl" />
                                <span className="font-semibold">{item.text}</span>
                            </motion.div>
                        </motion.th>
                    ))}
                </tr>
            </motion.thead>
       
    );
}
