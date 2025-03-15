import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import AuthContext from '../../../Context/AuthContext';

function SessionSelector({ sessions, selectedSession, setSelectedSession }) {
  const { darkMode } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='relative'
    >
      <select
        value={selectedSession}
        onChange={(e) => setSelectedSession(e.target.value)}
        className={`appearance-none rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 transition duration-300 shadow-md ${darkMode
          ? 'bg-gray-700 text-gray-200 border-2 border-gray-600 focus:ring-blue-600'
          : 'bg-white border-2 border-blue-300 text-blue-700 focus:ring-blue-500'
          }`}
      >
        {sessions.map((session, index) => (
          <option
            key={index}
            value={session}
            className={darkMode ? 'bg-gray-800 text-gray-200' : ''}
          >
            {session}
          </option>
        ))}
      </select>
      <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${darkMode ? 'text-blue-400' : 'text-blue-500'
        }`} />
    </motion.div>
  );
}

export default SessionSelector;