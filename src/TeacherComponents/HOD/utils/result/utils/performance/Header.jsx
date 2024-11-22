import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ headings }) {
  return (
    <thead>
      <motion.tr
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-400 to-blue-200 text-gray-700 uppercase text-sm leading-normal"
      >
        {headings.map((heading, index) => (
          <th
            key={index}
            className={`py-3 px-6 text-center font-medium `}
          >
            {heading}
          </th>
        ))}
      </motion.tr>
    </thead>
  );
}