import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import logo from './../../assets/metaphile_logo.png';
import School from './school.jsx';
import download from './../../assets/Download.png';

export default function Datesheet() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=' p-4'
    >
      <motion.h1
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className=' text-3xl mobile:max-tablet:text-lg font-bold text-primary '
      >
        Datesheet
      </motion.h1>
      <div className='flex flex-col overflow-y-auto items-center justify-center mb-2 no-scrollbar'>
        <School img={logo} schoolname="Metaphile Public School" address="Noida sector 62, Block A23" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-200 mt-10 border border-transparent rounded-xl px-4 py-2 flex shadow-md mb-2 items-center"
          onClick={handlePrint}
        >
          <span className="text-black flex items-center">
            Download
            <FaDownload className='ml-2' />
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}