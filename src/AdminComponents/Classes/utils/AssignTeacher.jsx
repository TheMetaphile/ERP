import React, { useContext, useState, useEffect, useRef } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssignTeacherRow from './AssignTeacherRow';

function AssignTeacher() {
    const { authState } = useContext(AuthContext);
    const [selectClass, setSelectClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [sections, setSections] = useState([]);
    const [isClassTeacherAssigned, setIsClassTeacherAssigned] = useState(null);
    const [temp, setTemp] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    const content = [
        { class: 'Pre-Nursery' },
        { class: 'L.K.J' },
        { class: 'U.K.J' },
        { class: '1st' },
        { class: '2nd' },
        { class: '3rd' },
        { class: '4th' },
        { class: '5th' },
        { class: '6th' },
        { class: '7th' },
        { class: '8th' },
        { class: '9th' },
        { class: '10th' },
        { class: '11th' },
        { class: '12th' },
    ];

    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(teacherEmail);
        }, 1000);

        return () => {
            clearTimeout(handler);
        }
    }, [teacherEmail]);

    useEffect(() => {
        if (selectClass) {
            fetchSections();
        } else {
            setSections([]);
        }
    }, [selectClass]);

    useEffect(() => {
        if (temp) {
            const searchTeacher = async () => {
                try {
                    const response = await axios.post('https://loginapi-y0aa.onrender.com/search/teacher', {
                        accessToken: authState.accessToken,
                        searchString: temp,
                        start: 0,
                        end: 30
                    });
                    const teacherEmails = response.data.Teachers.map(teacher => ({
                        email: teacher.email,
                        profileLink: teacher.profileLink
                    }));
                    setSuggestions(teacherEmails);
                } catch (error) {
                    console.error("Error searching for teachers:", error);
                }
            };
            searchTeacher();
        }
    }, [temp, authState.accessToken]);

    const handleSuggestionClick = (suggestion) => {
        setTeacherEmail(suggestion.email);
        setShowSuggestions(false);
    };

    const fetchSections = () => {
        const predefinedSections = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        setSections(predefinedSections);
    };

    const handleClassChange = (event) => {
        setSelectClass(event.target.value);
        setSelectedSection('');
        setIsClassTeacherAssigned(null);
        setTeacherEmail('');
    };

    const handleSectionChange = async (event) => {
        const section = event.target.value;
        setSelectedSection(section);

        if (selectClass && section) {
            try {
                const response = await axios.post('https://class-teacher.onrender.com/classTeacher/fetch/single', {
                    accessToken: authState.accessToken,
                    class: selectClass,
                    section: section
                });
                if (response.data) {
                    setIsClassTeacherAssigned(true);
                    setTeacherEmail(response.data.email);
                } else {
                    setIsClassTeacherAssigned(false);
                    setTeacherEmail('');
                }
            } catch (error) {
                console.error('Error fetching class teacher:', error);
                toast.error('Failed to fetch class teacher. Please try again.');
            }
        }
    };

    const handleEmailChange = (event) => {
        setShowSuggestions(true);
        setTeacherEmail(event.target.value);
    };

    const handleAssign = async () => {
        if (selectClass && selectedSection && teacherEmail) {
            try {
                const response = await axios.post('https://class-teacher.onrender.com/classTeacher/assign', {
                    accessToken: authState.accessToken,
                    class: selectClass,
                    section: selectedSection,
                    teacherEmail: teacherEmail
                });

                if (response.status === 200) {
                    toast.success('Teacher assigned successfully!');
                    setIsClassTeacherAssigned(true);
                }
            } catch (error) {
                console.error('Error assigning teacher:', error);
                toast.error('Failed to assign teacher. Please try again.');
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-red-300 flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <ToastContainer />
            {/* <div className="border rounded-lg shadow-md w-full flex flex-col px-3 mobile:max-tablet:px-0 overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
                <div className="container p-3">
                    <div className="flex justify-between">
                        <div className="w-1/4">
                            <select className="w-full px-4 py-2 border rounded-md" value={selectClass} onChange={handleClassChange}>
                                <option value="">Select Class</option>
                                {content.map((con, index) => (
                                    <option key={index} value={con.class}>{con.class}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/4">
                            <select className="w-full px-4 py-2 border rounded-md" value={selectedSection} onChange={handleSectionChange}>
                                <option value="">Select Section</option>
                                {sections.map((section) => (
                                    <option key={section} value={section}>{section}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/4" ref={inputRef}>
                            <input
                                type="email"
                                placeholder="Teacher's Email"
                                className="w-full px-4 py-2 border rounded-md"
                                list="teacher-suggestions"
                                value={teacherEmail}
                                onChange={handleEmailChange}
                                disabled={isClassTeacherAssigned === true}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-10 w-72 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                                    {suggestions.map((suggestion, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                            {suggestion.email}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleAssign} disabled={isClassTeacherAssigned === true}>
                            {isClassTeacherAssigned === true ? 'Assigned' : 'Assign'}
                        </button>
                    </div>
                </div>
            </div> */}

            <div className="border rounded-lg shadow-md w-full flex flex-col px-3 mobile:max-tablet:px-0 overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
                {content.map((con, index) => (
                    <AssignTeacherRow
                        key={index}
                        classs={con.class}
                        teacherEmail={teacherEmail}
                        isClassTeacherAssigned={isClassTeacherAssigned}
                        suggestions={suggestions}
                        showSuggestions={showSuggestions}
                        handleEmailChange={handleEmailChange}
                        handleAssign={handleAssign}
                        handleSuggestionClick={handleSuggestionClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default AssignTeacher;
