import { useState } from 'react';
import Logo from '../../../assets/metaphile_logo.png';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaUser, FaClock } from 'react-icons/fa';

export default function TeacherTile({ details }) {
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }
    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-blue-50 mb-4"
    >
        {details.map((detail, index) => (
            <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className='p-4 border border-blue-200 rounded-lg shadow-md mt-4 bg-white hover:shadow-lg transition-shadow duration-300'
            >
                <div className='flex items-center w-full'>
                    <div className='ml-4 flex-grow'>
                        <motion.div
                            className="font-semibold text-lg text-blue-700 cursor-pointer flex items-center justify-between"
                            onClick={() => handleClick(index)}
                        >
                            <span>{detail.title}</span>
                            {expanded === index ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown className="text-blue-500" />}
                        </motion.div>
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: expanded === index ? 'auto' : 0, opacity: expanded === index ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {expanded === index && (
                                <p className="mt-2 text-sm text-gray-600">{detail.description}</p>
                            )}
                        </motion.div>
                        <div className='flex items-center justify-between mt-3 text-sm text-gray-500'>
                            <div className="flex items-center">
                                <FaUser className="text-blue-400 mr-2" />
                                <img src={detail.from.profileLink} alt="profile" className='w-6 h-6 rounded-full mr-2'/>
                                <span>{detail.from.name}</span>
                            </div>
                            <div className="flex items-center">
                                <FaClock className="text-blue-400 mr-2" />
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


