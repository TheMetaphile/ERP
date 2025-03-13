import React, { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from '../../Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaClipboardCheck, FaPencilAlt } from 'react-icons/fa';

function Appraisal() {
  const { darkMode } = useContext(AuthContext);
  const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/appraisal/apply');

  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col px-6 items-start mt-6 mb-8 mx-auto mobile:max-tablet:px-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
    >
      <ToastContainer />
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`text-4xl font-bold mb-6 mobile:max-tablet:mb-4 mobile:max-tablet:text-xl ${darkMode ? 'text-white' : 'text-black'
          }`}
      >
        Appraisal
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className={`border shadow-lg rounded-lg w-full overflow-hidden ${darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-blue-200'
          }`}
      >
        <div
          className={`flex items-center justify-between px-6 mobile:max-tablet:px-2 py-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'
            }`}
        >
          <div className="flex gap-4">
            <LinkButton
              to="/Teacher-Dashboard/appraisal/applied"
              icon={<FaClipboardCheck />}
              label="Applied"
              isSelected={selectedLink === '/Teacher-Dashboard/appraisal/applied'}
              onClick={() => handleLinkSelect('/Teacher-Dashboard/appraisal/applied')}
              darkMode={darkMode}
            />
            <LinkButton
              to="/Teacher-Dashboard/appraisal/apply"
              icon={<FaPencilAlt />}
              label="Apply"
              isSelected={selectedLink === '/Teacher-Dashboard/appraisal/apply'}
              onClick={() => handleLinkSelect('/Teacher-Dashboard/appraisal/apply')}
              darkMode={darkMode}
            />
          </div>
        </div>
        <div className={`p-6 mobile:max-tablet:p-2 ${darkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
          <Outlet context={{ darkMode }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Appraisal;

const LinkButton = ({ to, icon, label, isSelected, onClick, darkMode }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className={`flex items-center gap-2 text-lg font-medium px-4 py-2 transition-colors duration-200 ${isSelected
          ? (darkMode
            ? 'text-blue-300 border-b-2 border-blue-300'
            : 'text-blue-600 border-b-2 border-blue-600')
          : (darkMode
            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'text-blue-600 hover:bg-blue-100')
        }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  </motion.div>
);