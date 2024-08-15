import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function AllNotificationTile({ details }) {
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    return (
        <div className="w-full space-y-4 mt-6">
            {details.map((detail, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full p-4 rounded-lg border border-gray-300 shadow-md bg-white hover:shadow-lg transition duration-300"
                >
                    <div className='w-full'>
                        <div 
                            className='w-full flex justify-between items-center cursor-pointer'
                            onClick={() => handleClick(index)}
                        >
                            <h2 className="text-lg font-semibold text-gray-800">{detail.title}</h2>
                            {expanded === index ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
                        </div>
                        <AnimatePresence>
                            {expanded === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2 text-gray-600"
                                >
                                    <p>{detail.description}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className='flex justify-between mt-4 items-center w-full'>
                            <div className='flex items-center'>
                                <img src={detail.from.profileLink} alt={detail.from.name} className='h-10 w-10 mobile:max-tablet:h-8 mobile:max-tablet:w-8 rounded-full object-cover' />
                                <div className="ml-2 flex items-center">
                                    <FaUser className="text-gray-500 mr-1" />
                                    <span className="font-medium text-gray-700">{detail.from.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <FaClock className="mr-1" />
                                <span>{detail.date}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}