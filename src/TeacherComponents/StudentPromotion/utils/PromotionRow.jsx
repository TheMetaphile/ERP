import React from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';
import Switch from './switch';

function PromotionRow({ detail, index, authState, selectedStudents, handleSwitchChange }) {
    return (
        <motion.tr
            className="border-b hover:bg-blue-50 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <td className="py-3 px-4">
                <FaUserGraduate className="inline mr-2 text-blue-600" />
                {detail.rollNumber}
            </td>
            <td className="py-3 px-4">
                <div className="flex items-center">
                    <img src={detail.profileLink} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                    <span>{detail.name}</span>
                </div>
            </td>
            <td className="py-3 px-4">
                <FaChalkboardTeacher className="inline mr-2 text-blue-600" />
                {authState.ClassDetails.class}
            </td>
            <td className="py-3 px-4">
                <FaBookOpen className="inline mr-2 text-blue-600" />
                {authState.ClassDetails.section}
            </td>
            <td className="py-3 px-4">
                <Switch
                    checked={selectedStudents.includes(detail.email)}
                    onChange={(checked) => handleSwitchChange(detail.email, checked)}
                />
            </td>
        </motion.tr>
    );
}

export default PromotionRow;