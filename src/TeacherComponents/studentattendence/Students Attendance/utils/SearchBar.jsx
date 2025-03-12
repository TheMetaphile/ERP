import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../../../Context/AuthContext';

export default function SearchBar({ handleMonthChange, month }) {
    const { darkMode } = useContext(AuthContext);

    const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-gray-700';
    const borderClass = darkMode 
        ? 'border-gray-700 focus:border-indigo-600' 
        : 'border-gray-300 focus:border-blue-500';
    const iconClass = darkMode ? 'text-gray-400' : 'text-gray-700';

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <select
                id="month"
                name="month"
                value={month}
                onChange={(e) => handleMonthChange(e.target.value)}
                className={`
                    appearance-none border rounded-lg 
                    py-2 px-4 pr-8 leading-tight 
                    focus:outline-none transition 
                    duration-300 ease-in-out 
                    ${bgClass} ${textClass} ${borderClass}
                `}
            >
                <option 
                    value="" 
                    className={darkMode ? 'bg-gray-800' : 'bg-white'}
                >
                    Select Month
                </option>
                {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ].map((monthName, index) => (
                    <option 
                        key={index} 
                        value={index + 1}
                        className={darkMode ? 'bg-gray-800' : 'bg-white'}
                    >
                        {monthName}
                    </option>
                ))}
            </select>
            <div 
                className={`
                    pointer-events-none absolute 
                    inset-y-0 right-0 flex 
                    items-center px-2 
                    ${iconClass}
                `}
            >
                <svg 
                    className="fill-current h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </motion.div>
    );
}