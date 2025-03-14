import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';

function Selection({ handleClassChange, handleSectionChange, handleSessionChange, Class, Section, Session }) {
  const { authState, darkMode } = useContext(AuthContext);
  const [sectionsDetails, setSectionsDetails] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');

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
      const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
        accessToken: authState?.accessToken,
        class: selectedClass,
      });
      console.log(response.data, 'section');
      const sectionsDetail = response.data.sections.map(sectionObj => sectionObj.section);
      setSectionsDetails(sectionsDetail);
    } catch (error) {
      console.error("Error while fetching section:", error);
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

  // Common styles for select elements with dark mode support
  const selectClasses = `w-full px-4 py-2 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2 ${
    darkMode 
      ? 'bg-gray-800 border-blue-500 text-white' 
      : 'bg-white border-blue-300 text-gray-800'
  }`;

  // Apply different styles to option elements based on dark mode
  const optionStyles = darkMode ? { backgroundColor: '#1f2937', color: 'white' } : {};

  return (
    <div className="w-fit flex items-center gap-2 mobile:max-tablet:flex-col mobile:max-tablet:w-full mobile:max-tablet:px-4">
      <select 
        id="class" 
        value={Class} 
        className={selectClasses}
        onChange={handleClassChangeWithFetch}
        style={{ color: darkMode ? 'white' : 'inherit' }}
      >
        <option value="" style={optionStyles}>Search by Class</option>
        <option value="Pre-Nursery" style={optionStyles}>Pre-Nursery</option>
        <option value="Nursery" style={optionStyles}>Nursery</option>
        <option value="L.K.G" style={optionStyles}>L.K.G</option>
        <option value="U.K.G" style={optionStyles}>U.K.G</option>
        <option value="1st" style={optionStyles}>1st</option>
        <option value="2nd" style={optionStyles}>2nd</option>
        <option value="3rd" style={optionStyles}>3rd</option>
        <option value="4th" style={optionStyles}>4th</option>
        <option value="5th" style={optionStyles}>5th</option>
        <option value="6th" style={optionStyles}>6th</option>
        <option value="7th" style={optionStyles}>7th</option>
        <option value="8th" style={optionStyles}>8th</option>
        <option value="9th" style={optionStyles}>9th</option>
        <option value="10th" style={optionStyles}>10th</option>
        <option value="11th" style={optionStyles}>11th</option>
        <option value="12th" style={optionStyles}>12th</option>
      </select>

      <select 
        id="section" 
        value={Section} 
        onChange={handleSectionChange} 
        className={selectClasses}
        style={{ color: darkMode ? 'white' : 'inherit' }}
      >
        <option value="" style={optionStyles}>Search by Section</option>
        {sectionsDetails.map((section, index) => (
          <option key={index} value={section} style={optionStyles}>{section}</option>
        ))}
      </select>

      <select
        id="session"
        value={Session}
        onChange={handleSessionChangeInternal}
        className={selectClasses}
        style={{ color: darkMode ? 'white' : 'inherit' }}
      >
        <option value="" style={optionStyles}>Select Session</option>
        {sessions.map((session, index) => (
          <option key={index} value={session} style={optionStyles}>
            {session}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selection;