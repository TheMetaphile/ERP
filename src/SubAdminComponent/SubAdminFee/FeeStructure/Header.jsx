import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../../Context/AuthContext';

function Header({ headings }) {
  const { darkMode } = useContext(AuthContext);

  return (
    <thead className={`whitespace-nowrap ${darkMode ? 'bg-gray-700' : 'bg-blue-200'
      }`}>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {headings.map((heading, index) => (
          <th
            key={index}
            className={`px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
          >
            {heading}
          </th>
        ))}
      </motion.tr>
    </thead>
  );
}

export default Header;