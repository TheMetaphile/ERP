import React, { useState, useContext, useCallback } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Result, BASE_URL_TimeTable } from '../../../Config';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaUtensils, FaBookOpen, FaChalkboardTeacher, FaClock } from 'react-icons/fa';

function TableStudent({ data, selectClass, selectedSection, dayStudent, numberOfLeacturesBeforeLunch, Time }) {
    const timetableData = data || {};
    const [lectures, setLectures] = useState(timetableData[dayStudent] || []);
    const [editingLectureId, setEditingLectureId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const { authState } = useContext(AuthContext);
    const [suggestions, setSuggestions] = useState([]);
    const [teacherInput, setTeacherInput] = useState('');
    const subjects = ["Hindi", "English", "Mathematics", "Science", " Social Science", "Drawing", "Computer", "Sanskrit", "Physics", "Chemistry", "Economics", "Business", " Accounts"];

    const handleEditClick = (lectureId) => {
        setEditingLectureId(lectureId);
        const lecture = lectures.find(l => l._id === lectureId);
        setEditedData({
            subject: lecture.subject,
            teacher: lecture.teacher?.name || ''
        });
        setTeacherInput(lecture.teacher?.name || '');
    };

    const handleCancelClick = () => {
        setEditingLectureId(null);
        setEditedData({});
    };

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinutes} ${ampm}`;
    };

    const handleSaveClick = async (lectureId) => {
        try {
            const url = `${BASE_URL_TimeTable}/timetable/update`;
            const updates = {
                periodId: lectureId,
                ...editedData
            };

            const payload = {
                accessToken: authState.accessToken,
                class: selectClass,
                section: selectedSection,
                day: dayStudent,
                update: updates,
                periodId: lectureId
            };

            const response = await axios.post(url, payload);
            if (response.status === 200) {
                toast.success('Updated Successfully');
                console.log('Update response:', response.data);


                setLectures(prevLectures =>
                    prevLectures.map(lecture =>
                        lecture._id === lectureId ? { ...lecture, subject: editedData.subject, teacher: { name: editedData.teacher } } : lecture
                    )
                );

                setEditingLectureId(null);
                setEditedData({});
            }
        } catch (error) {
            toast.error(error.message || 'Error updating data');
            console.error('Error updating data:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [field]: value
        }));


        if (field === 'teacher') {
            setTeacherInput(value);
            fetchTeacherSuggestions(value);
        }
    };

    const fetchTeacherSuggestions = useCallback(async (searchString) => {
        if (!searchString) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL_Result}/search/teacher`, {
                accessToken: authState.accessToken,
                searchString,
                start: 0,
                end: 30,
            });
            const fetchedSuggestions = response.data.Teachers.map((teacher) => ({
                name: teacher.name,
                profileLink: teacher.profileLink,
                email: teacher.email,
            }));
            setSuggestions(fetchedSuggestions);
        } catch (error) {
            console.error("Error searching for teachers:", error);
            setSuggestions([]);
        }
    }, [authState.accessToken]);

    const handleSuggestionClick = (suggestion) => {
        setTeacherInput(suggestion.name);
        setEditedData(prev => ({ ...prev, teacher: suggestion.email }));
        setSuggestions([]);
    };

    return (
        <div className="w-full rounded-lg border shadow-md">
            <div className="flex p-3 mb-4 justify-between w-full mobile:max-tablet:mb-0">
                <Link
                    to="/Admin-Dashboard/timetable/upload"
                    className="px-4 py-2 rounded-md mr-2 bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                >
                    Upload
                </Link>
            </div>
            <div className="container mx-auto p-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    className="overflow-x-auto shadow-lg rounded-lg"
                >
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-gray-600 uppercase bg-gradient-to-r from-purple-200 to-purple-100 text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Lecture</th>
                                <th className="py-3 px-6 text-left">Time</th>
                                <th className="py-3 px-6 text-left">Subject</th>
                                <th className="py-3 px-6 text-left">Teacher</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {lectures.map((lecture) => (
                                <React.Fragment key={lecture._id}>
                                    {numberOfLeacturesBeforeLunch === lecture.lectureNo - 1 && (
                                        <motion.tr className="border-b border-gray-200 hover:bg-yellow-100">
                                            <td colSpan="5" className="py-3 px-6 text-center font-medium">
                                                <FaUtensils className="inline mr-2" /> LUNCH
                                            </td>
                                        </motion.tr>
                                    )}
                                    <motion.tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left">
                                            <span className="font-medium">{lecture.lectureNo}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <FaClock className="mr-2" />
                                                {`${formatTime(Time[lecture.lectureNo - 1].start)}-${formatTime(Time[lecture.lectureNo - 1].end)}`}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <FaBookOpen className="mr-2" />
                                                {editingLectureId === lecture._id ? (
                                                    <select
                                                        value={editedData.subject || lecture.subject}
                                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                                        className="border border-gray-300 px-2 py-1 rounded"
                                                    >
                                                        <option value="">Select Subject</option>
                                                        {subjects.map((subject) => (
                                                            <option key={subject} value={subject}>
                                                                {subject}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    lecture.subject
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <FaChalkboardTeacher className="mr-2" />
                                                {editingLectureId === lecture._id ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={teacherInput}
                                                            onChange={(e) => handleInputChange('teacher', e.target.value)}
                                                            className="border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                        {suggestions.length > 0 && (
                                                            <div className="absolute bg-white border border-gray-300 shadow-lg">
                                                                {suggestions.map(suggestion => (
                                                                    <div
                                                                        key={suggestion.email}
                                                                        className="flex items-center p-2 cursor-pointer"
                                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                                    >
                                                                        <img
                                                                            src={suggestion.profileLink}
                                                                            alt="Profile"
                                                                            className="w-10 h-10 rounded-full mr-2"
                                                                        />
                                                                        {suggestion.name}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        {lecture.teacher?.profileLink && (
                                                            <img src={lecture.teacher.profileLink} alt={lecture.teacher.name} className="w-8 h-8 rounded-full mr-2" />
                                                        )}
                                                        {lecture.teacher?.name}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex item-center justify-center">
                                                {editingLectureId === lecture._id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleSaveClick(lecture._id)}
                                                            className="px-4 py-2 rounded-md bg-green-200 text-gray-800 hover:bg-green-500 hover:text-white"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={handleCancelClick}
                                                            className="px-4 py-2 rounded-md bg-red-200 text-gray-800 hover:bg-red-500 hover:text-white"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleEditClick(lecture._id)}
                                                        className="transform hover:text-purple-500 hover:scale-110"
                                                    >
                                                        <FaEdit />
                                                    </motion.button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    );
}

export default TableStudent;
