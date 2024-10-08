import React from 'react';
import { motion } from 'framer-motion';

function PageTitle({ icon: Icon, title }) {
  return (
    <motion.h1
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-purple-500 flex items-center mobile:max-tablet:text-lg whitespace-nowrap"
    >
      <Icon className="mr-4 text-4xl mobile:max-tablet:mr-2" />
      {title}
    </motion.h1>
  );
}

export default PageTitle;