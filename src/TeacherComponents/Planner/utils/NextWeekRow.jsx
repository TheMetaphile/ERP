import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';

function NextWeekRow({ details, index, setDetails, status }) {
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

    return (
        <motion.tr
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className={'bg-white whitespace-nowrap'}
        >
            <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                {details.date}
            </motion.td>

            {status ? (
                <>
                    <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                        {details.chapter}
                    </motion.td>
                    <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                        {details.topic}
                    </motion.td>
                    <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                        {details.teachingAids}
                    </motion.td>
                    <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                        {details.Activity}
                    </motion.td>
                </>
            ) : (
                <>
                    <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                            <input
                                className='w-full border-2 border-blue-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300'
                                type="text"
                                name='chapter'
                                value={details.chapter}
                                onChange={handleChange}
                            />
                            <FaEdit className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        </motion.div>
                    </motion.td>
                    <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                            <input
                                className='w-full border-2 border-blue-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300'
                                type="text"
                                name='topic'
                                value={details.topic}
                                onChange={handleChange}
                            />
                            <FaEdit className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        </motion.div>
                    </motion.td>
                    <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                            <input
                                className='w-full border-2 border-blue-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300'
                                type="text"
                                name='teachingAids'
                                value={details.teachingAids}
                                onChange={handleChange}
                            />
                            <FaEdit className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        </motion.div>
                    </motion.td>
                    <motion.td variants={cellVariants} className='border-y p-4 border-blue-200'>
                        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                            <input
                                className='w-full border-2 border-blue-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300'
                                type="text"
                                name='Activity'
                                value={details.Activity}
                                onChange={handleChange}
                            />
                            <FaEdit className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        </motion.div>
                    </motion.td>
                </>
            )}
        </motion.tr>
    );
}

export default NextWeekRow;