import React, { useState, useContext } from "react";
import AuthContext from '../../../Context/AuthContext';

function SubjectSelection({ onSubjectSelect }) {
  const { authState, darkMode } = useContext(AuthContext);
  const [subjects, setSubjects] = useState(authState?.subjects);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const bgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const borderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
  const focusClass = darkMode 
    ? 'focus:ring-indigo-400 focus:border-indigo-400' 
    : 'focus:ring-indigo-500 focus:border-indigo-500';

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);
    onSubjectSelect(subject);
  };

  return (
    <div className="mobile:max-tablet:w-full">
      <select 
        id="subject" 
        value={selectedSubject} 
        onChange={handleSubjectChange}
        className={`
          mt-1 mobile:w-full border block py-2 text-base 
          ${bgClass} ${textClass} ${borderClass} ${focusClass}
          focus:outline-none sm:text-sm rounded-md
        `}
      >
        {subjects.map((subject, index) => (
          <option 
            key={index} 
            value={subject}
            className={`
              ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
            `}
          >
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SubjectSelection;