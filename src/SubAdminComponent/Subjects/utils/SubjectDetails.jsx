import React, { useEffect, useState, useContext } from 'react';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever, MdAdd, MdSave, MdCancel } from "react-icons/md";
import { BASE_URL } from '../../../Config';
import { refreshAccessToken } from '../../../RefreshTokenHelper';

function SubjectDetails({ Class, section, selectedStream }) {
    const [subjectDetails, setSubjects] = useState([]);
    const [subjectLoading, setSubjectLoading] = useState(false);
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [newRow, setNewRow] = useState({ email: '', subject: '', name: '', profileLink: '', subjectType: '', optional: false });
    const [showNewRow, setShowNewRow] = useState(false);
    const [temp, setTemp] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [optionalSubjects, setOptionalSubjects] = useState([]);
    const { darkMode } = useContext(AuthContext);

    useEffect(() => {
        fetchSubject();
    }, [Class, section]);

    const fetchSubject = async () => {
        setSubjectLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/fetch`, {
                accessToken: authState?.accessToken,
                Class: Class,
                section: section
            });
            const sectionsdetail = response.data.teacher;
            setSubjects(sectionsdetail);
        } catch (error) {
            console.error("Error fetching subjects:", error);
            toast.error("Failed to fetch subjects");
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchSubject();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        } finally {
            setSubjectLoading(false);
        }
    };

    const handleAddRow = async () => {
        try {
            if (!newRow.email || !newRow.subject) {
                toast.error('Please specify teacher and subject');
                return;
            }

            console.log(newRow)
            const response = await axios.post(`${BASE_URL}/assign`, {
                accessToken: authState?.accessToken,
                class: Class,
                section: section,
                email: newRow.email,
                subject: newRow.subject,
                subjectType: newRow.subjectType,
                optional: newRow.optional
            });

            if (response.status === 200) {
                setSubjects([...subjectDetails, { ...newRow }]);
                setNewRow({ email: '', subject: '', name: '', profileLink: '', subjectType: '', optional: false });
                setShowNewRow(false);
                toast.success('Subject Assigned Successfully');
            }
        } catch (error) {
            console.error("Error assigning subject:", error);
            toast.error('Failed to assign subject');
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleAddRow();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    const handleChange = (field, value) => {
        setNewRow((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubjectChange = (e) => {
        const selectedSubject = optionalSubjects.find(item => item.subject === e.target.value || item === e.target.value);
        const subjectType = selectedSubject?.type ? selectedSubject.type : 'core';
        const isOptional = subjectType !== 'core';

        setNewRow((prev) => ({
            ...prev,
            subject: e.target.value,
            subjectType: subjectType,
            optional: isOptional
        }));
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setNewRow((prev) => ({ ...prev, email: '', name: email }));
        setTemp(email);
    };

    const handleSuggestionClick = (suggestion) => {
        setNewRow((prev) => ({ ...prev, email: suggestion.email, name: suggestion.name, profileLink: suggestion.profileLink }));
        setShowSuggestions(false);
    };

    useEffect(() => {
        if (temp) {
            const handler = setTimeout(() => {
                setShowSuggestions(true);
                const searchTeacher = async () => {
                    try {
                        const response = await axios.post(`${BASE_URL}/search/teacher`, {
                            accessToken: authState?.accessToken,
                            searchString: temp,
                            start: 0,
                            end: 30
                        });

                        const teacherEmails = response.data.Teachers.map(teacher => ({
                            email: teacher.email,
                            profileLink: teacher.profileLink,
                            name: teacher.name
                        }));
                        setSuggestions(teacherEmails);
                    } catch (error) {
                        console.error("Error searching for teachers:", error);
                        if (
                            error.response &&
                            error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                        ) {
                            toast.warn('Access denied. Attempting to refresh token...');
                            try {
                                const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                                await searchTeacher();
                            } catch (refreshError) {
                            }
                        } else {
                            toast.error(error.response?.data?.error || "An error occurred");
                        }
                    }
                };
                searchTeacher();
            }, 500);

            return () => {
                clearTimeout(handler);
            };
        } else {
            setShowSuggestions(false);
        }
    }, [temp, authState?.accessToken]);

    const handleDelete = async (index) => {
        const { subject, type } = subjectDetails[index];

        try {
            const response = await axios.delete(`${BASE_URL}/delete`, {
                data: {
                    accessToken: authState?.accessToken,
                    class: Class,
                    section: section,
                    subject: subject,
                    subjectType: type
                }
            });

            if (response.status === 200) {
                const updatedSubjects = subjectDetails.filter((_, i) => i !== index);
                setSubjects(updatedSubjects);
                toast.success('Subject Deleted Successfully');
            }
        } catch (error) {
            console.error("Error deleting subject:", error);
            toast.error('Error deleting subject');
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleDelete(index);
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/subjects/fetch`, {
                Class: Class,
                stream: selectedStream
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });

            const data = response.data;
            if (data.status) {
                setOptionalSubjects([...data.coreSubjects, ...data.optionalSubjects]);
            }
        } catch (error) {
            toast.error('Error connecting to server');
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchSubjects();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    useEffect(() => {
        if (selectedStream && Class) {
            fetchSubjects();
        }
    }, [selectedStream, Class]);

    return (
        <div className={`px-5 mt-2 mb-2 py-2 w-full  ${darkMode ? ' bg-gray-900 text-white' : ' bg-white text-black'}  transition-colors duration-200 mobile:max-tablet:pr-0`}>
            <div className='overflow-auto'>
                <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg mobile:max-laptop:w-fit w-full`}>
                    <div className={`flex justify-between py-2 pl-2 mobile:max-laptop:w-fit w-full h-fit rounded-t-lg border ${darkMode ? 'bg-blue-900 ' : 'bg-blue-200 border-gray-300'}`}>
                        <h1 className="w-48 text-lg font-medium mobile:max-laptop:text-sm">
                            Teacher
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-laptop:text-sm">
                            Subject
                        </h1>
                        <h1 className="w-48 text-lg font-medium mobile:max-laptop:text-sm">
                            Email
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-laptop:text-sm">
                            Action
                        </h1>
                    </div>

                    {!subjectLoading ? (
                        subjectDetails.length > 0 ? (
                            subjectDetails.map((detail, index) => (
                                <div
                                    key={index}
                                    className={`pl-2 mobile:max-laptop:w-fit w-full flex justify-between py-2 h-fit border items-center ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} transition-colors duration-150`}
                                >
                                    <div className='flex w-48 items-center'>
                                        <div className={`w-8 h-8 rounded-full overflow-hidden ${darkMode ? 'border border-gray-600' : 'border border-gray-300'}`}>
                                            <img src={detail.profileLink} alt="Profile" className='w-full h-full object-cover' />
                                        </div>
                                        <h1 className="ml-2 text-lg mobile:max-laptop:text-sm truncate">
                                            {detail.name}
                                        </h1>
                                    </div>
                                    <h1 className="w-36 text-lg mobile:max-laptop:text-sm">
                                        {detail.subject} ({detail.type}) {detail.optional ? "Optional" : ""}
                                    </h1>
                                    <h1 className="w-48 text-lg mobile:max-laptop:text-sm">
                                        {detail.email}
                                    </h1>
                                    <div className='w-36 text-lg mobile:max-laptop:text-sm'>
                                        <button
                                            className={`${darkMode ? 'bg-red-900 hover:bg-red-800' : 'bg-red-400 hover:bg-red-700'} text-white px-3 py-1 rounded-lg shadow-md flex items-center transition-colors duration-150`}
                                            onClick={() => handleDelete(index)}
                                        >
                                            <MdDeleteForever className="mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                No subjects added
                            </div>
                        )
                    ) : (
                        <Loading />
                    )}

                    {showNewRow && (
                        <div className={`px-2 flex justify-between py-2 pl-2 h-fit border gap-4 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
                            <select
                                value={newRow.subject}
                                onChange={handleSubjectChange}
                                className={`w-full px-2 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                                required
                            >
                                <option value="">Select Subject</option>
                                {optionalSubjects.map(item =>
                                    <option key={item.subject || item} value={item.subject || item}>
                                        {item.subject || item} ({item.type || 'Core'})
                                    </option>
                                )}
                            </select>

                            <div className='relative w-full'>
                                <input
                                    type="text"
                                    value={newRow.name}
                                    onChange={handleEmailChange}
                                    className={`w-full px-2 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                                    placeholder="Enter Teacher Name/Email"
                                    required
                                />
                                {showSuggestions && suggestions.length > 0 && (
                                    <ul className={`absolute z-10 w-72 border rounded-md mt-1 max-h-40 overflow-y-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                                        {suggestions.map((suggestion, idx) => (
                                            <li
                                                key={idx}
                                                className={`flex items-center p-2 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors duration-150`}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                            >
                                                <div className={`w-6 h-6 rounded-full overflow-hidden mr-2 ${darkMode ? 'border border-gray-600' : 'border border-gray-300'}`}>
                                                    <img src={suggestion.profileLink} alt="Profile" className='w-full h-full object-cover' />
                                                </div>
                                                <span className={`${darkMode ? 'text-white' : 'text-black'}`}>{suggestion.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className='flex items-center space-x-2'>
                                <button
                                    className={`px-3 py-1 rounded-lg flex items-center ${darkMode ? 'bg-green-800 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'} transition-colors duration-150`}
                                    onClick={handleAddRow}
                                >
                                    <MdSave className="mr-1" /> Save
                                </button>
                                <button
                                    className={`px-3 py-1 rounded-lg flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} transition-colors duration-150`}
                                    onClick={() => {
                                        setShowNewRow(false);
                                        setNewRow({ email: '', subject: '', name: '', profileLink: '', subjectType: '', optional: false });
                                    }}
                                >
                                    <MdCancel className="mr-1" /> Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-center w-full px-3 py-4">
                    <button
                        className={`px-4 py-2 rounded-lg shadow-md flex items-center justify-center ${darkMode ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-150`}
                        onClick={() => setShowNewRow(true)}
                    >
                        <MdAdd className="mr-2" /> Add Subject
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubjectDetails;