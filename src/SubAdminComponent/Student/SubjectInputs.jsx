import React, { useContext, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { FaBook } from 'react-icons/fa';
import AuthContext from "../../Context/AuthContext";

const SubjectInputs = ({ subjects, setSubject, subjectList = [] }) => {
  const { darkMode } = useContext(AuthContext);
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleAddSubject = () => {
    const subjectObject = subjectList.find(sub => sub.subject === selectedSubject);
    if (selectedSubject && subjectObject && !subjects.find(sub => sub.subject === subjectObject.subject)) {
      setSubject([...subjects, subjectObject]);
      setSelectedSubject("");
    }
  };

  const handleCancel = (subjectToRemove) => {
    setSubject(subjects.filter(subject => subject.subject !== subjectToRemove.subject));
  };

  return (
    <div className={`w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-md p-6 mb-6`}>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FaBook className="mr-2 text-indigo-600" />
        Applied Subjects
      </h3>
      <div className="flex flex-wrap mb-4">
        {subjects.map(({ subject, type }, index) => (
          <div key={index} className={`flex items-center mr-3 mb-3 rounded-full ${darkMode ? 'bg-indigo-900 text-indigo-200 border-indigo-700 hover:bg-indigo-800'
            : 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200'
            } shadow-sm border pl-4 pr-2 py-1 transition-all duration-300`}>
            <span className="mr-2 text-sm font-medium">{subject} ({type})</span>
            <div className={`flex items-center justify-center w-5 h-5 rounded-full ${darkMode ? 'text-indigo-300 hover:bg-indigo-700' : 'text-indigo-600 hover:bg-indigo-200'
              } focus:outline-none transition-colors duration-300`}
              onClick={() => handleCancel({ subject })}
              aria-label={`Remove ${subject}`}>
              <AiOutlineClose size={12} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end">
        <div className="flex-grow mr-4">
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 whitespace-nowrap`} htmlFor="selectSubject">
            Select Subject
          </label>
          <select className={`block w-full py-2 px-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            id="selectSubject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {subjectList.map(({ subject, type, _id }) => (
              <option key={_id} value={subject}>{subject} ({type})</option>
            ))}
          </select>
        </div>
        <button className={`inline-flex items-center mobile:max-tablet:px-1 mobile:max-tablet:py-1 whitespace-nowrap px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${darkMode ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300`}
          onClick={handleAddSubject}
          disabled={!selectedSubject}>
          <AiOutlinePlus className="mr-2" />
          Add Subject
        </button>
      </div>
    </div>
  );
};

export default SubjectInputs;