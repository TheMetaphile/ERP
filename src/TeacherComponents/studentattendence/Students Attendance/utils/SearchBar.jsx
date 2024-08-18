import React from 'react';
import { motion } from 'framer-motion';

export default function SearchBar({ handleMonthChange, month }) {
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
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out text-gray-700"
            >
                <option value="">Select Month</option>
                {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ].map((monthName, index) => (
                    <option key={index} value={index + 1}>{monthName}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </motion.div>
    );
}