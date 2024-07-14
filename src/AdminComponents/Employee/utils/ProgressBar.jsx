import React from 'react';

const ProgressBar = ({ step }) => {
  const steps = ["Personal Details", "Address Details", "Access Control","CTC Management", "Review and Submit"];
  const progress = (step / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
