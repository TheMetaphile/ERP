import React from 'react';
import { motion } from 'framer-motion';

function Header({ headings }) {
  return (
    <thead className="bg-purple-200">
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {headings.map((heading, index) => (
          <th key={index} className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
            {heading}
          </th>
        ))}
      </motion.tr>
    </thead>
  );
}

export default Header;