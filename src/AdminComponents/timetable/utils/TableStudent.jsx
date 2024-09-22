import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_TimeTable } from '../../../Config';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaUtensils, FaBookOpen, FaChalkboardTeacher, FaClock } from 'react-icons/fa';

function TableStudent({ data, selectClass, selectedSection, dayStudent, numberOfLeacturesBeforeLunch, Time }) {
    const timetableData = data || {};
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const { authState } = useContext(AuthContext);

    const handleEditClick = () => {
        setEditMode(true);
        // Initialize editedData with current data
        const initialEditedData = {};
        lectures.forEach(lecture => {
            initialEditedData[lecture._id] = {
                subject: lecture.subject,
                teacher: lecture.teacher?.name || ''
            };
        });
        setEditedData(initialEditedData);
    };

    const handleCancelClick = () => {
        setEditMode(false);
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

    const handleSaveClick = async () => {
        try {
            const url = `${BASE_URL_TimeTable}/timetable/update`;
            const updates = Object.entries(editedData).map(([periodId, data]) => ({
                periodId,
                ...data
            }));
            
            const payload = {
                accessToken: authState.accessToken,
                class: selectClass,
                section: selectedSection,
                day: dayStudent,
                update: updates
            };
            
            const response = await axios.post(url, payload);
            if (response.status === 200) {
                toast.success('Updated Successfully');
                console.log('Update response:', response.data);
                setEditMode(false);
                setEditedData({});
            }
        } catch (error) {
            toast.error(error.message || 'Error updating data');
            console.error('Error updating data:', error);
        }
    };

    const handleInputChange = (lectureId, field, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [lectureId]: {
                ...prevData[lectureId],
                [field]: value
            }
        }));
    };

    const lectures = timetableData[dayStudent] || [];

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
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
                {editMode ? (
                    <>
                        <button
                            onClick={handleSaveClick}
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
                    <button
                        onClick={handleEditClick}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                    >
                        Edit
                    </button>
                )}
            </div>
            <div className="container mx-auto p-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={tableVariants}
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
                            {lectures.map((lecture, idx) => (
                                <React.Fragment key={lecture._id}>
                                    {numberOfLeacturesBeforeLunch === lecture.lectureNo - 1 && (
                                        <motion.tr variants={rowVariants} className="border-b border-gray-200 hover:bg-yellow-100">
                                            <td colSpan="5" className="py-3 px-6 text-center font-medium">
                                                <FaUtensils className="inline mr-2" /> LUNCH
                                            </td>
                                        </motion.tr>
                                    )}
                                    <motion.tr variants={rowVariants} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-medium">{lecture.lectureNo}</span>
                                            </div>
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
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        value={editedData[lecture._id]?.subject || lecture.subject}
                                                        onChange={(e) => handleInputChange(lecture._id, 'subject', e.target.value)}
                                                        className="border border-gray-300 px-2 py-1 rounded"
                                                    />
                                                ) : (
                                                    lecture.subject
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <FaChalkboardTeacher className="mr-2" />
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        value={editedData[lecture._id]?.teacher || lecture.teacher?.name || ''}
                                                        onChange={(e) => handleInputChange(lecture._id, 'teacher', e.target.value)}
                                                        className="border border-gray-300 px-2 py-1 rounded"
                                                    />
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
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setEditMode(!editMode)}
                                                    className="transform hover:text-purple-500 hover:scale-110"
                                                >
                                                    {editMode ? <FaSave size="18" /> : <FaEdit size="18" />}
                                                </motion.button>
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