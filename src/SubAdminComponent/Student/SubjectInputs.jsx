import React, { useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';

const SubjectInputs = ({ stream, subjects, setSubject }) => {
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const renderSubjectInputs = () => {
    switch (stream) {
      case "PCM":
      case "PCB":
      case "PCMB":
        setSubjectList([
          "Computer Science",
          "Physical Education",
          "Informatics Practices",
          "Biotechnology",
          "Psychology"
        ]);
        break;
      case "Commerce":
        setSubjectList([
          "Mathematics",
          "Informatics Practices",
          "Physical Education",
          "Entrepreneurship",
          "Computer Science",
          "Fine Arts"
        ]);
        break;
      case "Arts":
        setSubjectList([
          "Geography",
          "Economics",
          "Sociology",
          "Psychology",
          "Philosophy",
          "Physical Education",
          "Fine Arts",
          "Home Science",
          "Music",
          "Informatics Practices",
          "Mathematics"
        ]);
        break;
      default:
        setSubjectList([]);
    }
  };

  const handleCancel = (subjectToRemove) => {
    if (subjectList.includes(subjectToRemove)) {
      const updatedSubjects = subjects.filter(subject => subject !== subjectToRemove);
      setSubject(updatedSubjects);
    }
  };

  const handleAddSubject = () => {
    if (selectedSubject && !subjects.includes(selectedSubject)) {
      setSubject([...subjects, selectedSubject]);
    }
    setSelectedSubject("");
  };

  useEffect(() => {
    renderSubjectInputs();
  }, [stream]);

  return (
    <div className="w-full rounded-md mobile:max-tablet:w-full ">
      <label className="block text-lg mb-2 mobile:max-laptop:text-sm" htmlFor="category">
        Applied Subjects
      </label>
      <div className="flex flex-wrap">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center mr-3 mb-3 rounded-full bg-purple-200 text-w shadow-md border border-gray-300 pl-4 pr-1 py-1">
            <span className="mr-2">{subject}</span>
            <div
              className="flex items-center justify-center w-6 h-6 cursor-pointer rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none"
              onClick={() => handleCancel(subject)}
            >
              <AiOutlineClose size={12} />
            </div>
          </div>
        ))}
      </div>
      <label className="block text-lg mb-2 mobile:max-laptop:text-sm">
        Select Subject
        <select
          className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
          id="selectSubject"
          type="text"
          name="selectSubject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjectList.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
        <div
          className="mt-4 px-4 py-2 w-48 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleAddSubject}
        >
          Add Subject
        </div>
      </label>

    </div>
  );
};

export default SubjectInputs;
