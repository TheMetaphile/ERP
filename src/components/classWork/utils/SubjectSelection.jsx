import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Subject } from '../../../Config';

function SubjectSelection({ onSubjectSelect }) {
  const { authState } = useContext(AuthContext);
  const [subjects, setSubjects] = useState(authState.subjects);
  const [selectedSubject, setSelectedSubject] = useState('Maths');

  // const fetchSubjects = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL_Subject}/fetch/subjects?class=${authState.userDetails.currentClass}&section=${authState.userDetails.section}`, {
  //       headers: {
  //         Authorization: `Bearer ${authState.accessToken}`,
  //       }
  //     });

  //     setSubjects(response.data.subjects);
  //   } catch (error) {
  //     console.error("Error fetching subjects:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchSubjects();
  // }, [authState]);

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSelectedSubject(subject);
    onSubjectSelect(subject);
  };

  return (
    <div>
      <select id="subject" value={selectedSubject} onChange={handleSubjectChange}
      className="mt-1 border block py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
      </select>
    </div>
  );
}

export default SubjectSelection;
