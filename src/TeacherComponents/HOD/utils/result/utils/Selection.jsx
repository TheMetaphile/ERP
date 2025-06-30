import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import { BASE_URL } from '../../../../../Config';
import { refreshAccessToken } from '../../../../../RefreshTokenHelper';
import { toast } from 'react-toastify';

function Selection({ handleClassChange, handleSectionChange, handleSessionChange, Class, Section, Session }) {
  const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
  const [sectionsDetails, setSectionsDetails] = useState([]);

  const wingClasses = {
    'Pre-Nursery-U.K.G': ['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G'],
    '1st-2nd': ['1st', '2nd'],
    '3rd-5th': ['3rd', '4th', '5th'],
    '6th-8th': ['6th', '7th', '8th'],
    '9th-12th': ['9th', '10th', '11th', '12th']
  };

  const availableClasses = wingClasses[authState?.userDetails?.co_ordinator_wing] || [];

  const fetchSections = async (selectedClass) => {
    try {
      const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
        accessToken: authState?.accessToken,
        class: selectedClass
      });
      const sectionsDetail = response.data.sections.map((sectionObj) => sectionObj.section);
      setSectionsDetails(sectionsDetail);
    } catch (error) {
      console.error('Error while fetching section:', error);
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await fetchSections(selectedClass);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
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


  return (
    <div className="w-fit flex items-center gap-2 mobile:max-tablet:flex-col mobile:max-tablet:w-full mobile:max-tablet:px-4">
      <select
        id="class"
        value={Class}
        className={`w-full px-4 py-2 border-2 focus:outline-none focus:ring-2 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2 
          ${darkMode
            ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-700'
            : 'border-blue-300 focus:ring-blue-500'}`}
        onChange={handleClassChangeWithFetch}
      >
        <option value="" className={darkMode ? 'bg-gray-800 text-gray-300' : ''}>
          Search by Class
        </option>
        {availableClasses.map((className) => (
          <option
            key={className}
            value={className}
            className={darkMode ? 'bg-gray-800 text-white' : ''}
          >
            {className}
          </option>
        ))}
      </select>

      <select
        id="section"
        value={Section}
        onChange={handleSectionChange}
        className={`w-full px-4 py-2 border-2 focus:outline-none focus:ring-2 transition duration-300 rounded-md mobile:max-tablet:text-xs mobile:max-tablet:px-1 mobile:max-tablet:py-2 
          ${darkMode
            ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-700'
            : 'border-blue-300 focus:ring-blue-500'}`}
      >
        <option value="" className={darkMode ? 'bg-gray-800 text-gray-300' : ''}>
          Search by Section
        </option>
        {sectionsDetails.map((section, index) => (
          <option
            key={index}
            value={section}
            className={darkMode ? 'bg-gray-800 text-white' : ''}
          >
            {section}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selection;
