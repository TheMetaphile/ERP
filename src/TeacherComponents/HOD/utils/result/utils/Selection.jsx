import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../../../Config';

function Selection({ handleClassChange, handleSectionChange, handleSessionChange, Class, Section, Session }) {
  const { authState } = useContext(AuthContext);
  const [sectionsDetails, setSectionsDetails] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');

  const wingClasses = {
    'Pre-Nursery-U.K.G': ['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G'],
    '1st-2nd': ['1st', '2nd'],
    '3rd-5th': ['3rd', '4th', '5th'],
    '6th-8th': ['6th', '7th', '8th'],
    '9th-12th': ['9th', '10th', '11th', '12th']
  };

  const availableClasses = wingClasses[authState?.userDetails?.co_ordinator_wing] || [];

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const newSessions = [];
    for (let i = 0; i < 5; i++) {
      const startYear = currentYear - i;
      const endYear = startYear + 1;
      newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
    }
    setSessions(newSessions);
  }, []);

  const fetchSections = async (selectedClass) => {
    try {
      const response = await axios.post(`${BASE_URL_Login}/classTeacher/fetch/sections`, {
        accessToken: authState.accessToken,
        class: selectedClass
      });
      const sectionsDetail = response.data.sections.map((sectionObj) => sectionObj.section);
      setSectionsDetails(sectionsDetail);
    } catch (error) {
      console.error('Error while fetching section:', error);
    }
  };

  const handleClassChangeWithFetch = (e) => {
    const selectedClass = e.target.value;
    handleClassChange(e);
    if (selectedClass) {
      fetchSections(selectedClass);
    } else {
      setSectionsDetails([]);
    }
  };

  const handleSessionChangeInternal = (e) => {
    const selectedSessionValue = e.target.value;
    setSelectedSession(selectedSessionValue);
    handleSessionChange(selectedSessionValue);
  };

  return (
    <div className="w-fit flex items-center gap-2 mobile:max-tablet:flex-col mobile:max-tablet:w-full mobile:max-tablet:px-4">
      <select
        id="class"
        value={Class}
        className="w-full px-4 py-2 border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2"
        onChange={handleClassChangeWithFetch}
      >
        <option value="">Search by Class</option>
        {availableClasses.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>

      <select
        id="section"
        value={Section}
        onChange={handleSectionChange}
        className="w-full px-4 py-2 border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2"
      >
        <option value="">Search by Section</option>
        {sectionsDetails.map((section, index) => (
          <option key={index} value={section}>
            {section}
          </option>
        ))}
      </select>

      {/* <select
        id="session"
        value={Session}
        onChange={handleSessionChangeInternal}
        className="w-full px-4 py-2 border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2"
      >
        <option value="">Select Session</option>
        {sessions.map((session, index) => (
          <option key={index} value={session}>
            {session}
          </option>
        ))}
      </select> */}
    </div>
  );
}

export default Selection;
