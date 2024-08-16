import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../Config';

function Selection({ handleClassChange, handleSectionChange, handleSessionChange, Class, Section, Session }) {

  const { authState } = useContext(AuthContext);
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
      const response = await axios.post(`${BASE_URL_Login}/classTeacher/fetch/sections`, {
        accessToken: authState.accessToken,
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

  return (
    <div className="w-fit flex items-center gap-2 mobile:max-tablet:flex-col mobile:max-tablet:w-full mobile:max-tablet:px-4">
      <select id="class" value={Class} className="w-full px-4 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2" onChange={handleClassChangeWithFetch}>
        <option value="">Search by Class</option>
        <option value="Pre-Nursery">Pre-Nursery</option>
        <option value="Nursery">Nursery</option>
        <option value="L.K.G">L.K.G</option>
        <option value="U.K.G">U.K.G</option>
        <option value="1st">1st</option>
        <option value="2nd">2nd</option>
        <option value="3rd">3rd</option>
        <option value="4th">4th</option>
        <option value="5th">5th</option>
        <option value="6th">6th</option>
        <option value="7th">7th</option>
        <option value="8th">8th</option>
        <option value="9th">9th</option>
        <option value="10th">10th</option>
        <option value="11th">11th</option>
        <option value="12th">12th</option>
      </select>

      <select id="section" value={Section} onChange={handleSectionChange} className="w-full px-4 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2">
        <option value="">Search by Section</option>
        {sectionsDetails.map((section, index) => (
          <option key={index} value={section}>{section}</option>
        ))}
      </select>

      <select
        id="session"
        value={Session}
        onChange={handleSessionChangeInternal}
        className="w-full px-4 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2"
      >
        <option value="">Select Session</option>
        {sessions.map((session, index) => (
          <option key={index} value={session}>
            {session}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selection;
