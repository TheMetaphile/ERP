import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaBell, FaChevronRight, FaMoon, FaSun } from 'react-icons/fa';
import Notice from './notice.jsx';
import AuthContext from '../../Context/AuthContext';

export default function Enddrawer() {
  const { darkMode } = useContext(AuthContext);


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Title animation
  const titleVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120 
      }
    }
  };

  return (
    <motion.div
      className={`h-full overflow-auto no-scrollbar px-4 py-3 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800 text-white' 
          : 'bg-white text-gray-800'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="flex justify-between items-center text-xl font-bold mb-4"
        variants={titleVariants}
      >
        <div className="flex items-center gap-2 text-lg whitespace-nowrap">
          <FaBell className={`text-lg ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} />
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Daily Notice
          </span>
        </div>
        <Link 
          to="/Sub-Admin/Notice" 
          className={`${
            darkMode 
              ? 'text-blue-300 hover:text-blue-200' 
              : 'text-blue-600 hover:text-blue-800'
          } text-sm flex items-center gap-1 transition-colors duration-200 font-medium`}
        >
          See All
          <FaChevronRight className="text-xs" />
        </Link>
      </motion.h2>

      <motion.section className="mb-6 h-full" variants={itemVariants}>
        <motion.div
          className={`rounded-lg shadow-md h-full overflow-y-auto transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 hover:shadow-lg hover:shadow-blue-900/20' 
              : 'bg-white hover:shadow-xl hover:shadow-blue-300/30'
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className={`p-1 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <Notice />
          </div>
        </motion.div>
      </motion.section>

      {/* Info card at the bottom */}
      <motion.div
        variants={itemVariants}
        className={`rounded-lg p-4 mt-4 ${
          darkMode 
            ? 'bg-gray-700' 
            : 'bg-blue-50'
        }`}
      >
        <div className="flex items-start">
          <div className={`p-2 rounded-full mr-3 ${
            darkMode 
              ? 'bg-gray-600 text-blue-300' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            {darkMode ? <FaMoon /> : <FaSun />}
          </div>
          <div>
            <h3 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {darkMode ? 'Dark Mode Active' : 'Light Mode Active'}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {darkMode 
                ? 'Switch to light mode from the navbar for better daytime visibility.' 
                : 'Switch to dark mode from the navbar for reduced eye strain at night.'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}