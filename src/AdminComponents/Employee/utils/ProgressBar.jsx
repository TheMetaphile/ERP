import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ step }) => {
  const steps = ["Personal Details", "Address Details", "Access Control", "CTC Management", "Review and Submit"];
  const progress = (step / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <motion.div
        className="w-full bg-blue-100 rounded-full h-3 mb-4 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-blue-600 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="flex justify-between">
        {steps.map((stepName, index) => (
          <motion.div
            key={stepName}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 
                ${index <= step ? 'bg-blue-600' : 'bg-blue-200'}`}
            >
              <span className={`text-xs font-bold ${index <= step ? 'text-white' : 'text-blue-600'}`}>
                {index + 1}
              </span>
            </div>
            <span className={`text-xs text-center ${index <= step ? 'text-blue-600 font-semibold' : 'text-blue-400'}`}>
              {stepName}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;