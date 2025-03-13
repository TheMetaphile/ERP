import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';

function NextWeekRow({
    details,
    index,
    setDetails,
    status,
    darkMode
}) {
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDetails(prevPlans =>
            prevPlans.map(plan =>
                plan.date === details.date ? { ...plan, [name]: value } : plan
            )
        );
    }

    const cellVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const renderInputField = (name, value) => (
        <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
        >
            <input
                className={`w-full border-2 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300 ${darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-700'
                        : 'border-blue-300 focus:ring-blue-200'
                    }`}
                type="text"
                name={name}
                value={value}
                onChange={handleChange}
            />
            <FaEdit className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-blue-400' : 'text-blue-400'
                }`} />
        </motion.div>
    );

    return (
        <motion.tr
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className={`whitespace-nowrap ${darkMode ? 'bg-gray-900' : 'bg-white'
                }`}
        >
            <motion.td
                variants={cellVariants}
                className={`border-y p-4 ${darkMode ? 'border-gray-700 text-white' : 'border-blue-200 text-black'
                    }`}
            >
                {details.date}
            </motion.td>

            {status ? (
                <>
                    {['chapter', 'topic', 'teachingAids', 'Activity'].map((field, index) => (
                        <motion.td
                            key={index}
                            variants={cellVariants}
                            className={`border-y p-4 ${darkMode ? 'border-gray-700 text-white' : 'border-blue-200 text-black'
                                }`}
                        >
                            {details[field]}
                        </motion.td>
                    ))}
                </>
            ) : (
                <>
                    {[
                        { name: 'chapter', value: details.chapter },
                        { name: 'topic', value: details.topic },
                        { name: 'teachingAids', value: details.teachingAids },
                        { name: 'Activity', value: details.Activity }
                    ].map((field, index) => (
                        <motion.td
                            key={index}
                            variants={cellVariants}
                            className={`border-y p-4 ${darkMode ? 'border-gray-700' : 'border-blue-200'
                                }`}
                        >
                            {renderInputField(field.name, field.value)}
                        </motion.td>
                    ))}
                </>
            )}
        </motion.tr>
    );
}

export default NextWeekRow;