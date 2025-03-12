import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function AllNotificationTile({ details, darkMode }) {
    const [expanded, setExpanded] = useState(null);

    const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
    const iconClass = darkMode ? 'text-gray-400' : 'text-gray-500';
    const hoverClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    return (
        <div className={`w-full space-y-4 mt-6 ${bgClass}`}>
            {details.map((detail, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`
                        w-full p-4 rounded-lg border 
                        shadow-md ${bgClass} ${borderClass} 
                        ${hoverClass} hover:shadow-lg 
                        transition duration-300
                    `}
                >
                    <div className='w-full'>
                        <div
                            className={`
                                w-full flex justify-between 
                                items-center cursor-pointer 
                                ${textClass}
                            `}
                            onClick={() => handleClick(index)}
                        >
                            <h2 className="text-lg font-semibold">{detail.title}</h2>
                            {expanded === index
                                ? <FaChevronUp className={iconClass} />
                                : <FaChevronDown className={iconClass} />
                            }
                        </div>
                        <AnimatePresence>
                            {expanded === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`mt-2 ${subTextClass}`}
                                >
                                    <p>{detail.description}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className='flex justify-between mt-4 items-center w-full'>
                            <div className='flex items-center'>
                                <img
                                    src={detail.from.profileLink}
                                    alt={detail.from.name}
                                    className='
                                        h-10 w-10 mobile:max-tablet:h-8 
                                        mobile:max-tablet:w-8 rounded-full 
                                        object-cover border-2 
                                        border-indigo-500
                                    '
                                />
                                <div className={`ml-2 flex items-center ${subTextClass}`}>
                                    <FaUser className={`${iconClass} mr-1`} />
                                    <span className="font-medium">{detail.from.name}</span>
                                </div>
                            </div>
                            <div className={`flex items-center text-sm ${subTextClass}`}>
                                <FaClock className={`mr-1 ${iconClass}`} />
                                <span>{detail.date}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}