// TimeTableStructure.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSun, FiMoon, FiPlus, FiClock, FiTrash2 } from 'react-icons/fi';
import { BASE_URL } from '../../../../Config';
import AuthContext from '../../../../Context/AuthContext';

const TimeTableStructure = ({formData, setFormData, handleSubmit}) => {
    const [darkMode, setIsDarkMode] = useState(false);
    const { authState } = useContext(AuthContext);

    const handleAddLecture = () => {
        setFormData(prev => ({
            ...prev,
            lectureStructure: [
                ...prev.lectureStructure,
                { startTime: '', endTime: '', lectureNo: prev.lectureStructure.length + 1 }
            ]
        }));
    };

    const handleLectureChange = (index, field, value) => {
        const updatedStructure = [...formData.lectureStructure];
        updatedStructure[index] = {
            ...updatedStructure[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            lectureStructure: updatedStructure
        }));
    };

    const handleRemoveLecture = (index) => {
        const updatedStructure = formData.lectureStructure.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            lectureStructure: updatedStructure.map((lecture, i) => ({
                ...lecture,
                lectureNo: i + 1
            }))
        }));
    };


    return (
        <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Dark Mode Toggle */}
            {/* <button
        onClick={() => setIsDarkMode(!darkMode)}
        className={`fixed top-4 right-4 p-3 rounded-full ${
          darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'
        } transition-all duration-300 hover:scale-110`}
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button> */}

            {/* Main Form Container */}
            <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300`}>
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">
                    Create Timetable Structure
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Class Range</label>
                            <select
                                className="w-full border-2 border-purple-300 p-2 rounded-md focus:outline-none focus:border-purple-500 bg-white"
                                name="classRange"
                                value={formData.classRange}
                                onChange={(e) => setFormData(prev => ({ ...prev, classRange: e.target.value }))}
                                required
                            >
                                <option value="" disabled>Select Class</option>
                                <option value="Pre-Nursery - U.K.J">Pre-Nursery - U.K.J</option>
                                <option value="1st-12th">1st - 12th</option>
                            </select>

                        </div>


                        <div>
                            <label className="block text-sm font-medium mb-2">Lectures Before Lunch</label>
                            <input
                                type="number"
                                value={formData.numberOfLeacturesBeforeLunch}
                                onChange={(e) => setFormData(prev => ({ ...prev, numberOfLeacturesBeforeLunch: e.target.value }))}
                                className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                                required
                            />
                        </div>
                    </div>

                    {/* Lecture Structure */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Lecture Structure</h2>
                            <button
                                type="button"
                                onClick={handleAddLecture}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <FiPlus /> Add Lecture
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData?.lectureStructure?.map((lecture, index) => (
                                index + 1 == formData.numberOfLeacturesBeforeLunch ?
                                    <>
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                } flex flex-wrap items-center gap-4`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <FiClock className="text-blue-500" />
                                                <span className="font-medium">Lecture {lecture.lectureNo}</span>
                                            </div>

                                            <div className="flex flex-1 items-center gap-4">
                                                <input
                                                    type="time"
                                                    value={lecture.startTime}
                                                    onChange={(e) => handleLectureChange(index, 'startTime', e.target.value)}
                                                    className={`p-2 rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                                        }`}
                                                    required
                                                />
                                                <span>to</span>
                                                <input
                                                    type="time"
                                                    value={lecture.endTime}
                                                    onChange={(e) => handleLectureChange(index, 'endTime', e.target.value)}
                                                    className={`p-2 rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                                        }`}
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLecture(index)}
                                                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                } flex flex-wrap items-center gap-4 text-center`}
                                        >
                                            LUNCH
                                        </div>
                                    </>
                                    :
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                            } flex flex-wrap items-center gap-4`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <FiClock className="text-blue-500" />
                                            <span className="font-medium">Lecture {lecture.lectureNo}</span>
                                        </div>

                                        <div className="flex flex-1 items-center gap-4">
                                            <input
                                                type="time"
                                                value={lecture.startTime}
                                                onChange={(e) => handleLectureChange(index, 'startTime', e.target.value)}
                                                className={`p-2 rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                                    }`}
                                                required
                                            />
                                            <span>to</span>
                                            <input
                                                type="time"
                                                value={lecture.endTime}
                                                onChange={(e) => handleLectureChange(index, 'endTime', e.target.value)}
                                                className={`p-2 rounded border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                                    }`}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveLecture(index)}
                                            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors mt-8"
                    >
                        Create Structure
                    </button>
                </form>
            </div>
            <ToastContainer position="bottom-right" theme={darkMode ? 'dark' : 'light'} />
        </div>
    );
};

export default TimeTableStructure;