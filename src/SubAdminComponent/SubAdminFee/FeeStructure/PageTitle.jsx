import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../../Context/AuthContext';

function PageTitle({ icon: Icon, title }) {
  const { darkMode } = useContext(AuthContext);

  return (
    <motion.h1
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`text-3xl font-bold flex items-center mobile:max-tablet:text-lg whitespace-nowrap ${darkMode ? 'text-blue-300' : 'text-blue-500'
        }`}
    >
      <Icon className={`mr-4 text-4xl mobile:max-tablet:mr-2 ${darkMode ? 'text-blue-400' : ''
        }`} />
      {title}
    </motion.h1>
  );
}

export default PageTitle;