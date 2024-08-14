import React from 'react';
import LinearProgressBar from './../LinearProgressBar/LinearProgressBar';

export default function SubjectProgress({ subject, description, percent }) {
  return (
    <div className="flex flex-col tablet:flex-row items-start tablet:items-center w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex flex-col tablet:flex-row tablet:items-center tablet:w-2/5 mb-3 tablet:mb-0">
        <h3 className="text-lg font-semibold text-text_blue mb-2 tablet:mb-0 tablet:mr-4 tablet:w-1/2">
          {subject}
        </h3>
        <p className="text-sm text-gray-600 tablet:w-1/2">
          {description}
        </p>
      </div>
      <div className="w-full tablet:w-3/5">
        <LinearProgressBar value={percent} max={100} />
        <p className="text-right text-sm font-medium text-gray-700 mt-1">
          {percent}%
        </p>
      </div>
    </div>
  );
}