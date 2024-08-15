import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaUserTie, FaClock, FaChalkboardTeacher } from 'react-icons/fa';


const HeaderItem = ({ icon, text }) => (
    <motion.th
      className="px-6 py-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center space-x-2 text-black"
      >
        {icon}
        <motion.h2
          className="text-sm font-semibold text-gray-700"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {text}
        </motion.h2>
      </motion.div>
    </motion.th>
  );
  
  
  
  export default function TimeTableHeader() {
    return (
      <motion.thead
        className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-t-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <tr className="w-full">
          <HeaderItem icon={<FaChalkboardTeacher size={24} />} text="Lecture" />
          <HeaderItem icon={<FaBookOpen size={24} />} text="Subject" />
          <HeaderItem icon={<FaUserTie size={24} />} text="Teacher" />
          <HeaderItem icon={<FaClock size={24} />} text="Timing" />
        </tr>
      </motion.thead>
    );
  }
  