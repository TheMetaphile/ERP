import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

function SessionSelector({ sessions, selectedSession, setSelectedSession }) {
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
        className="appearance-none bg-white border-2 border-purple-300 rounded-md py-2 px-4 pr-8 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md"
      >
        {sessions.map((session, index) => (
          <option key={index} value={session}>{session}</option>
        ))}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 pointer-events-none" />
    </motion.div>
  );
}

export default SessionSelector;