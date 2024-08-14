import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { FaBook } from 'react-icons/fa';

const SubjectInputs = ({ stream, subjects, setSubject }) => {
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const renderSubjectInputs = () => {
    const streamSubjects = {
      "PCM": ["Computer Science", "Physical Education", "Informatics Practices"],
      "PCB": ["Computer Science", "Physical Education", "Informatics Practices", "Biotechnology"],
      "PCMB": ["Computer Science", "Physical Education", "Informatics Practices", "Biotechnology", "Psychology"],
      "Commerce": ["Mathematics", "Informatics Practices", "Physical Education", "Entrepreneurship", "Computer Science", "Fine Arts"],
      "Arts": ["Geography", "Economics", "Sociology", "Psychology", "Philosophy", "Physical Education", "Fine Arts", "Home Science", "Music", "Informatics Practices", "Mathematics"]
    };
    setSubjectList(streamSubjects[stream] || []);
  };

  const handleCancel = (subjectToRemove) => {
    if (subjectList.includes(subjectToRemove)) {
      setSubject(subjects.filter(subject => subject !== subjectToRemove));
    }
  };

  const handleAddSubject = () => {
    if (selectedSubject && !subjects.includes(selectedSubject)) {
      setSubject([...subjects, selectedSubject]);
      setSelectedSubject("");
    }
  };

  useEffect(() => {
    renderSubjectInputs();
  }, [stream]);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FaBook className="mr-2 text-indigo-600" />
        Applied Subjects
      </h3>
      <div className="flex flex-wrap mb-4">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center mr-3 mb-3 rounded-full bg-indigo-100 text-indigo-800 shadow-sm border border-indigo-200 pl-4 pr-2 py-1 transition-all duration-300 hover:bg-indigo-200">
            <span className="mr-2 text-sm font-medium">{subject}</span>
            <div
              className="flex items-center justify-center w-5 h-5 rounded-full text-indigo-600 hover:bg-indigo-200 focus:outline-none transition-colors duration-300"
              onClick={() => handleCancel(subject)}
              aria-label={`Remove ${subject}`}
            >
              <AiOutlineClose size={12} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end">
        <div className="flex-grow mr-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="selectSubject">
            Select Subject
          </label>
          <select
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="selectSubject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjectList.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div
          className="inline-flex items-center px-4 py-2 border border-transparent cursor-pointer text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          onClick={handleAddSubject}
          disabled={!selectedSubject}
        >
          <AiOutlinePlus className="mr-2" />
          Add Subject
        </div>
      </div>
    </div>
  );
};

export default SubjectInputs;