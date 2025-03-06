import React, { useState, useEffect, useContext } from 'react';
import { FaBook, FaSun, FaMoon, FaPlus, FaTrash, FaSave, FaFilter, FaChalkboardTeacher } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { BASE_URL } from '../../Config';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';

const SubjectManagement = () => {

  const { darkMode, authState } = useContext(AuthContext);
  const classes = ['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const streams = ['PCM','PCMB',"PCB", 'Commerce', 'Arts', 'General'];
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [coreSubjects, setCoreSubjects] = useState([]);
  const [optionalSubjects, setOptionalSubjects] = useState([]);
  const [newCoreSubject, setNewCoreSubject] = useState('');
  const [newOptionalSubject, setNewOptionalSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fetch subjects when class and stream are selected
  useEffect(() => {
    if (selectedClass && selectedStream) {
      fetchSubjects();
    }
  }, [selectedClass, selectedStream]);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      // In a real application, you would add your API base URL
      const response = await axios.post(`${BASE_URL}/subjects/fetch`, {
        Class: selectedClass,
        stream: selectedStream
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.accessToken}`
        }
      });

      const data = response.data;
      if (data.status) {

        setCoreSubjects(data.coreSubjects || []);
        setOptionalSubjects(data.optionalSubjects || []);
      } else {
        setMessage({ text: data.error || 'Failed to fetch subjects', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error connecting to server', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const saveSubjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/subjects/create`, {
        Class: selectedClass,
        stream: selectedStream,
        coreSubjects,
        optionalSubjects
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.accessToken}`
        }
      });

      const data = response.data;

      if (data.status) {
        setMessage({ text: 'Subjects saved successfully!', type: 'success' });
      } else {
        setMessage({ text: data.error || 'Failed to save subjects', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error connecting to server', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const addCoreSubject = () => {
    if (newCoreSubject.trim()) {
      setCoreSubjects([...coreSubjects, newCoreSubject.trim()]);
      setNewCoreSubject('');
    }
  };

  const addOptionalSubject = () => {
    if (newOptionalSubject.trim()) {
      setOptionalSubjects([...optionalSubjects, newOptionalSubject.trim()]);
      setNewOptionalSubject('');
    }
  };

  const removeCoreSubject = (index) => {
    setCoreSubjects(coreSubjects.filter((_, i) => i !== index));
  };

  const removeOptionalSubject = (index) => {
    setOptionalSubjects(optionalSubjects.filter((_, i) => i !== index));
  };

  // Toggle dark mode


  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}

        <div className="flex items-center mb-3">
          <IoMdSchool className="text-4xl mr-3 text-blue-600" />
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Subject Management Portal
          </h1>
        </div>



        {/* Filters */}
        <div className={`mb-8 p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <FaFilter className="mr-2 text-blue-500" />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className={`w-full p-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Stream
              </label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className={`w-full p-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select Stream</option>
                {streams.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Message display */}
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            {message.text}
          </div>
        )}

        {/* Main content - only show if class and stream are selected */}
        {selectedClass && selectedStream ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-8`}>
            {/* Core Subjects */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                <FaChalkboardTeacher className="mr-2 text-blue-500" />
                <h2 className="text-xl font-semibold">Core Subjects</h2>
              </div>

              <div className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    value={newCoreSubject}
                    onChange={(e) => setNewCoreSubject(e.target.value)}
                    placeholder="Add new core subject"
                    className={`flex-grow p-2 rounded-l-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                      } focus:ring-blue-500 focus:border-blue-500`}
                    onKeyPress={(e) => e.key === 'Enter' && addCoreSubject()}
                  />
                  <button
                    onClick={addCoreSubject}
                    className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {coreSubjects.length === 0 ? (
                  <p className="py-4 text-center text-gray-500">No core subjects added yet</p>
                ) : (
                  coreSubjects.map((subject, index) => (
                    <div key={index} className="flex justify-between items-center py-3">
                      <div className="flex items-center">
                        <FaBook className="mr-2 text-blue-500" />
                        <span>{subject}</span>
                      </div>
                      <button
                        onClick={() => removeCoreSubject(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Optional Subjects */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                <FaBook className="mr-2 text-green-500" />
                <h2 className="text-xl font-semibold">Optional Subjects</h2>
              </div>

              <div className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    value={newOptionalSubject}
                    onChange={(e) => setNewOptionalSubject(e.target.value)}
                    placeholder="Add new optional subject"
                    className={`flex-grow p-2 rounded-l-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                      } focus:ring-blue-500 focus:border-blue-500`}
                    onKeyPress={(e) => e.key === 'Enter' && addOptionalSubject()}
                  />
                  <button
                    onClick={addOptionalSubject}
                    className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {optionalSubjects.length === 0 ? (
                  <p className="py-4 text-center text-gray-500">No optional subjects added yet</p>
                ) : (
                  optionalSubjects.map((subject, index) => (
                    <div key={index} className="flex justify-between items-center py-3">
                      <div className="flex items-center">
                        <FaBook className="mr-2 text-green-500" />
                        <span>{subject}</span>
                      </div>
                      <button
                        onClick={() => removeOptionalSubject(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={`p-10 text-center rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <IoMdSchool className="mx-auto text-5xl text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Select Class and Stream</h2>
            <p className="text-gray-500">Please select a class and stream to manage subjects</p>
          </div>
        )}

        {/* Save Button - only show if class and stream are selected */}
        {selectedClass && selectedStream && (
          <div className="flex justify-end">
            <button
              onClick={saveSubjects}
              disabled={isLoading}
              className={`flex items-center px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  <span>Save Subjects</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectManagement;