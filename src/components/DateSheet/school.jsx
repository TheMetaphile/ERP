import React from 'react';
import { motion } from 'framer-motion';
import { FaSchool, FaMapMarkerAlt } from 'react-icons/fa';
import Term from './Term.jsx';

export default function School(props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='flex-1 w-full h-full rounded-lg mt-6 shadow-lg border-2 border-solid border-gray-200 relative overflow-hidden'
    >
      <div className='flex justify-center items-center p-4 bg-gradient-to-r from-blue-200 to-blue-100'>
        <motion.img
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
          src={props.img}
          className='w-20 h-20 mt-3 mobile:max-tablet:h-16 mobile:max-tablet:w-16'
          alt="School Logo"
        />
        <div className='text-center mt-5 px-3 font-semibold'>
          <h2 className='text-2xl flex items-center justify-center'>
            <FaSchool className='mr-2 text-primary' />
            {props.schoolname}
          </h2>
          <span className='text-sm flex items-center justify-center mt-2'>
            <FaMapMarkerAlt className='mr-1 text-secondary' />
            {props.address}
          </span>
        </div>
      </div>
      <div className='border-t-2 border-solid border-gray-300 mt-4'></div>
      <Term />
    </motion.div>
  )
}