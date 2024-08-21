import React from 'react';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';

function Selection({ setFilter }) {
    const handleChange = (e) => {
        setFilter(e.target.value);
    }

    return (
        <motion.div
            className="w-1/4 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FaFilter className="absolute top-3 left-3 text-blue-600" />
            <motion.select
                className="w-full px-10 py-2 border-2 border-blue-300 rounded-md bg-white text-blue-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                onChange={handleChange}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
            </motion.select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </motion.div>
    )
}

export default Selection;