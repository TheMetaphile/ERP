import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaUser, FaClock } from 'react-icons/fa';
import AuthContext from '../../../Context/AuthContext';

export default function TeacherTile({ details }) {
    const { darkMode } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full mb-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
        >
            {details.map((detail, index) => (
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg shadow-md mt-4 transition-shadow duration-300 ${darkMode
                            ? 'bg-gray-800 border border-gray-700 hover:shadow-xl'
                            : 'bg-white border border-blue-200 hover:shadow-lg'
                        }`}
                >
                    <div className='flex items-center w-full'>
                        <div className='ml-4 flex-grow'>
                            <motion.div
                                className={`font-semibold text-lg cursor-pointer flex items-center justify-between ${darkMode
                                        ? 'text-blue-300 hover:text-blue-200'
                                        : 'text-blue-700 hover:text-blue-600'
                                    }`}
                                onClick={() => handleClick(index)}
                            >
                                <span>{detail.title}</span>
                                {expanded === index ? (
                                    <FaChevronUp className={`${darkMode ? 'text-blue-400' : 'text-blue-500'
                                        }`} />
                                ) : (
                                    <FaChevronDown className={`${darkMode ? 'text-blue-400' : 'text-blue-500'
                                        }`} />
                                )}
                            </motion.div>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: expanded === index ? 'auto' : 0, opacity: expanded === index ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                {expanded === index && (
                                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'
                                        }`}>
                                        {detail.description}
                                    </p>
                                )}
                            </motion.div>
                            <div className={`flex items-center justify-between mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                <div className="flex items-center">
                                    <FaUser className={`mr-2 ${darkMode ? 'text-blue-500' : 'text-blue-400'
                                        }`} />
                                    <img
                                        src={detail.from.profileLink}
                                        alt="profile"
                                        className={`w-6 h-6 rounded-full mr-2 border ${darkMode
                                                ? 'border-gray-600'
                                                : 'border-blue-200'
                                            }`}
                                    />
                                    <span>{detail.from.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaClock className={`mr-2 ${darkMode ? 'text-blue-500' : 'text-blue-400'
                                        }`} />
                                    <span>{detail.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}