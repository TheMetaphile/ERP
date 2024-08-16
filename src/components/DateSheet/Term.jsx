import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';
import Table from './Table.jsx';

export default function Term() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='w-full p-4'
    >
      <div className='text-center mt-4 font-medium'>
        <motion.h3
          whileHover={{ scale: 1.05 }}
          className='text-black-400 text-2xl flex items-center justify-center'
        >
          <FaCalendarAlt className='mr-2 text-primary' />
          Term I-Date sheet
        </motion.h3>
        <p className='text-sm mt-2 text-gray-600'>2023-2024</p>
      </div>
      <Table />
    </motion.div>
  )
}