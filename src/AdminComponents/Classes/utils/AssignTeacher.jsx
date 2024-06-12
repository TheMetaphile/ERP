import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(teacherEmail);
        }, 1000);

        return () => {
            clearTimeout(handler);
        }
    }, [teacherEmail])


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
                    })
                    console.log(response.data)
                    const teacherEmails = response.data.Teachers.map(teacher => ({
                        email: teacher.email,
                        profileLink: teacher.profileLink
                    }));
                    setSuggestions(teacherEmails);
                    console.log(suggestions)

                }
                catch (error) {
                    console.error("Error searching for teachers:", error);
                }
            }
            searchTeacher();
        }
    }, [temp, authState.accessToken])

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

    return (
        <div className="flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <ToastContainer />
            <div className="border rounded-lg shadow-md w-full flex flex-col px-3 mobile:max-tablet:px-0 overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
                <div className="container p-3">
                    <div className="flex justify-between">
                        <div className="w-1/4">
                            <select className="w-full px-4 py-2 border rounded-md" value={selectClass} onChange={handleClassChange}>
                                <option value="">Select Class</option>
                                <option value="Pre-Nursery">Pre-Nursery</option>
                                <option value="Nursery">Nursery</option>
                                <option value="L.K.J">L.K.J</option>
                                <option value="U.K.J">U.K.J</option>
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
                        </div>
                        <div className="w-1/4">
                            <select className="w-full px-4 py-2 border rounded-md" value={selectedSection} onChange={handleSectionChange}>
                                <option value="">Select Section</option>
                                {sections.map((section) => (
                                    <option key={section} value={section}>{section}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/4">
                            <input
                                type="email"
                                placeholder="Teacher's Email"
                                className="w-full px-4 py-2 border rounded-md"
                                list={`teacher-suggestions`}
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
            </div>
        </div>
    );
}

export default AssignTeacher;
