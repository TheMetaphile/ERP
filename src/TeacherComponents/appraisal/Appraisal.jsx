import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaClipboardCheck, FaPencilAlt } from 'react-icons/fa';

function Appraisal() {
  const { authState } = useContext(AuthContext);
  const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/appraisal/apply');


  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col px-6 items-start mt-6 mb-8 mx-auto mobile:max-tablet:px-2"
    >
      <ToastContainer />
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}

        className="text-4xl font-bold text-black mb-6 mobile:max-tablet:mb-4 mobile:max-tablet:text-xl"

      >
        Appraisal
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}

        className="border border-blue-200 shadow-lg rounded-lg w-full overflow-hidden bg-white"
      >
        <div className="flex items-center justify-between px-6 mobile:max-tablet:px-2 py-4 bg-blue-50">

          <div className="flex gap-4">
            <LinkButton
              to="/Teacher-Dashboard/appraisal/applied"
              icon={<FaClipboardCheck />}
              label="Applied"
              isSelected={selectedLink === '/Teacher-Dashboard/appraisal/applied'}
              onClick={() => handleLinkSelect('/Teacher-Dashboard/appraisal/applied')}
            />
            <LinkButton
              to="/Teacher-Dashboard/appraisal/apply"
              icon={<FaPencilAlt />}
              label="Apply"
              isSelected={selectedLink === '/Teacher-Dashboard/appraisal/apply'}
              onClick={() => handleLinkSelect('/Teacher-Dashboard/appraisal/apply')}
            />
          </div>
        </div>
        <div className="p-6 mobile:max-tablet:p-2">
          <Outlet />
        </div>
      </motion.div>
    </motion.div>

  )
}

export default Appraisal


const LinkButton = ({ to, icon, label, isSelected, onClick }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className={`flex items-center gap-2 text-lg font-medium px-4 py-2 transition-colors duration-200 ${isSelected
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'bg-white text-blue-600 hover:bg-blue-100'
        }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  </motion.div>
);