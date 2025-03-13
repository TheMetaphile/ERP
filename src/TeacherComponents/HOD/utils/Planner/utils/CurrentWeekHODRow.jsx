import React from 'react'
import { motion } from 'framer-motion';

function CurrentWeekHODRow({ details, index, darkMode }) {
    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <motion.tr
            key={index}
            variants={rowVariants}
            className={darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'hover:bg-blue-50'}
        >
            <td className={`border-y p-4 whitespace-nowrap gap-2 
                ${darkMode
                    ? 'border-gray-700 text-white'
                    : 'border-black'}`}>
                {details.date}
            </td>
            <td className={`border-y p-4 whitespace-nowrap gap-2 
                ${darkMode
                    ? 'border-gray-700 text-white'
                    : 'border-black'}`}>
                {details.chapter}
            </td>
            <td className={`border-y p-4 whitespace-nowrap gap-2 
                ${darkMode
                    ? 'border-gray-700 text-white'
                    : 'border-black'}`}>
                {details.topic}
            </td>
            <td className={`border-y p-4 whitespace-nowrap gap-2 
                ${darkMode
                    ? 'border-gray-700 text-white'
                    : 'border-black'}`}>
                {details.teachingAids}
            </td>
            <td className={`border-y p-4 whitespace-nowrap gap-2 
                ${darkMode
                    ? 'border-gray-700 text-white'
                    : 'border-black'}`}>
                {details.Activity}
            </td>
            <td className={`border-y p-4 whitespace-nowrap gap-2 
                ${darkMode
                    ? 'border-gray-700 text-white'
                    : 'border-black'}`}>
                {details.description ? (
                    <>{details.description}, {details.status}</>
                ) : (
                    <>NA</>
                )}
            </td>
        </motion.tr>
    )
}

export default CurrentWeekHODRow