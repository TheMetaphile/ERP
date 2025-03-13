import React from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';
import Switch from './switch';

function PromotionRow({
    detail,
    index,
    authState,
    selectedStudents,
    handleSwitchChange,
    darkMode
}) {
    return (
        <motion.tr
            className={`border-b transition-colors duration-200 ${darkMode
                    ? 'hover:bg-gray-700 border-gray-700'
                    : 'hover:bg-blue-50 border-gray-200'
                }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                <FaUserGraduate className={`inline mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                {detail.rollNumber}
            </td>
            <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                <div className="flex items-center">
                    <img
                        src={detail.profileLink}
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span>{detail.name}</span>
                </div>
            </td>
            <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                <FaChalkboardTeacher className={`inline mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                {authState?.ClassDetails?.class}
            </td>
            <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                <FaBookOpen className={`inline mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                {authState?.ClassDetails?.section}
            </td>
            <td className="py-3 px-4">
                <Switch
                    checked={selectedStudents.includes(detail.email)}
                    onChange={(checked) => handleSwitchChange(detail.email, checked)}
                    darkMode={darkMode}
                />
            </td>
        </motion.tr>
    );
}

export default PromotionRow;