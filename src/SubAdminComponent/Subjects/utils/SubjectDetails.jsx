import React, { useEffect, useState, useContext } from 'react';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever, MdAdd, MdSave, MdCancel } from "react-icons/md";
import { BASE_URL } from '../../../Config';
import Switch from './switch';

function SubjectDetails({ Class, section, selectedStream }) {
    const [subjectDetails, setSubjects] = useState([]);
    const [subjectLoading, setSubjectLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const [newRow, setNewRow] = useState({ email: '', subject: '', name: '', profileLink: '' });
    const [showNewRow, setShowNewRow] = useState(false);
    const [temp, setTemp] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [scholastic, setScholastic] = useState(false);
    const [additionalLink, setAdditionalLink] = useState("");
    const [optionalSubjects, setOptionalSubjects] = useState([]);
    const { darkMode } = useContext(AuthContext);

    const handleRoleChange = (event) => {
        setScholastic(event);
    };

    useEffect(() => {
        if (scholastic) {
            setAdditionalLink("/coScholastic");
        } else {
            setAdditionalLink("");
        }
    }, [scholastic]);

    useEffect(() => {
        setSubjects([]);
        fetchSubject();
    }, [additionalLink]);
    
    useEffect(() => {
        if (section != null && Class != null) {
            setSubjectLoading(true);
            fetchSubject();
        }
    }, [Class, section]);

    const fetchSubject = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/fetch${additionalLink}`, {
                accessToken: authState.accessToken,
                class: Class,
                section: section
            });
            const sectionsdetail = response.data.teacher;
            setSubjects(sectionsdetail);
        } catch (error) {
            console.error("Error searching for teachers:", error);
            toast.error("Failed to fetch subjects");
        } finally {
            setSubjectLoading(false);
        }
    };

    const handleAddRow = async () => {
        try {
            if (!newRow.email) {
                toast.error('Please specify teacher');
                return;
            }
            if (!newRow.subject) {
                toast.error('Please specify subject');
                return;
            }

            const response = await axios.post(`${BASE_URL}/assign${additionalLink}`, {
                accessToken: authState.accessToken,
                class: Class,
                section: section,
                email: newRow.email,
                subject: newRow.subject
            });
            
            if (response.status === 200) {
                setSubjects([...subjectDetails, { ...newRow }]);
                setNewRow({ email: '', subject: '', name: '', profileLink: '' });
                setShowNewRow(false);
                toast.success('Subject Assigned Successfully');
            }
        } catch (error) {
            console.error("Error assigning subject:", error);
            toast.error('Failed to assign subject');
        }
    };

    const handleChange = (e, field) => {
        setNewRow({ ...newRow, [field]: e.target.value });
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setNewRow({ ...newRow, email: '', name: email });
        setTemp(email);
    };

    const handleSuggestionClick = (suggestion) => {
        setNewRow({ ...newRow, email: suggestion.email, name: suggestion.name, profileLink: suggestion.profileLink });
        setShowSuggestions(false);
    };

    useEffect(() => {
        if (temp) {
            const handler = setTimeout(() => {
                setShowSuggestions(true);
                const searchTeacher = async () => {
                    try {
                        const response = await axios.post(`${BASE_URL}/search/teacher`, {
                            accessToken: authState.accessToken,
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
    }, [temp, authState.accessToken]);

    const handleDelete = async (index) => {
        const { email, subject } = subjectDetails[index];

        try {
            const response = await axios.delete(`${BASE_URL}/delete${additionalLink}`, {
                data: {
                    accessToken: authState.accessToken,
                    class: Class,
                    section: section,
                    subject: subject
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
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            const data = response.data;
            if (data.status) {
                setOptionalSubjects([...data.coreSubjects, ...data.optionalSubjects] || []);
            }
        } catch (error) {
            toast.error('Error connecting to server');
        }
    };

    useEffect(() => {
        if (selectedStream && Class) {
            fetchSubjects();
        }
    }, [selectedStream, Class]);

    return (
        <div className={`px-5 mt-2 mb-2 py-2 w-full border ${darkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg shadow-md transition-colors duration-200 mobile:max-tablet:pr-0`}>
            <div className="flex gap-4 px-3 py-2 mt-2 text-lg justify-end items-center mobile:max-tablet:pl-0">
                <label className={`text-base font-normal text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Scholastic
                </label>
                <Switch checked={scholastic} changeRole={handleRoleChange} darkMode={darkMode} />
                <label className={`text-base font-normal text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Co-Scholastic
                </label>
            </div>
            
            <div className='overflow-auto'>
                <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg mobile:max-laptop:w-fit w-full`}>
                    <div className={`flex justify-between py-2 pl-2 mobile:max-laptop:w-fit w-full h-fit rounded-t-lg border ${darkMode ? 'bg-blue-900 border-gray-700' : 'bg-blue-200 border-gray-300'}`}>
                        <h1 className="w-48 text-lg font-medium mobile:max-laptop:text-sm">
                            Teacher
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-laptop:text-sm whitespace-nowrap">
                            Subject
                        </h1>
                        <h1 className="w-48 text-lg font-medium mobile:max-laptop:text-sm whitespace-nowrap">
                            Email
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-laptop:text-sm whitespace-nowrap">
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
                                    <div className='flex w-48 whitespace-nowrap items-center'>
                                        <div className={`w-8 h-8 rounded-full overflow-hidden ${darkMode ? 'border border-gray-600' : 'border border-gray-300'}`}>
                                            <img src={detail.profileLink} alt="Profile" className='w-full h-full object-cover' />
                                        </div>
                                        <h1 className="ml-2 text-lg mobile:max-laptop:text-sm truncate">
                                            {detail.name}
                                        </h1>
                                    </div>
                                    <h1 className="w-36 text-lg mobile:max-laptop:text-sm whitespace-nowrap truncate">
                                        {detail.subject}
                                    </h1>
                                    <h1 className="w-48 text-lg mobile:max-laptop:text-sm whitespace-nowrap truncate">
                                        {detail.email}
                                    </h1>
                                    <div className='w-36 text-lg mobile:max-laptop:text-sm whitespace-nowrap'>
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
                            <div className='w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap'></div>
                            
                            {!scholastic ? (
                                <select
                                    value={newRow.subject}
                                    onChange={(e) => handleChange(e, 'subject')}
                                    className={`w-full px-2 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                                    placeholder="Enter Subject"
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    {optionalSubjects.map((subject) => (
                                        <option 
                                            key={subject} 
                                            value={subject} 
                                            className='capitalize'
                                        >
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={newRow.subject}
                                    onChange={(e) => handleChange(e, 'subject')}
                                    className={`w-full px-2 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                                    placeholder="Enter Subject"
                                    required
                                />
                            )}
                            
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
                                    onClick={() => { setShowNewRow(false); setNewRow({ email: '', subject: '', name: '', profileLink: '' }); }}
                                >
                                    <MdCancel className="mr-1" /> Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="flex justify-center w-full px-3 py-4 h-fit">
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