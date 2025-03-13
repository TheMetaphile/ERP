import React from 'react'
import { motion } from 'framer-motion'

function NextWeekHODRow({ details, index, darkMode }) {
    return (
        <motion.tr
            key={index}
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
        </motion.tr>
    )
}

export default NextWeekHODRow