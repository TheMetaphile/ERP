import React, { useEffect, useState, useContext } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import TeacherRowContent from './TeacherRowContent';
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AssignTeacherRow({ Class }) {
    const [expanded, setExpanded] = useState(false);
    const [sectionsDetails, setSections] = useState([]);
    const [newSection, setNewSection] = useState('');
    const [email, setEmail] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [temp, setTemp] = useState();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);

    const handleClick = () => {
        setExpanded(!expanded);
    };
    
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setShowSuggestions(true);
    };
    const handleSuggestionClick = (suggestion) => {
        setEmail(suggestion.email);
        setShowSuggestions(false);
    };

    useEffect(() => {
        if (expanded) {
            setLoading(true);
            fetchSections();
        }
    }, [expanded]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(email);
        }, 1000);

        return () => {
            clearTimeout(handler);
        }
    }, [email])

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
                        profileLink: teacher.profileLink || ''
                    }));
                    setSuggestions(teacherEmails);
                    console.log(teacherEmails, 'j')
                }
                catch (error) {
                    console.error("Error searching for teachers:", error);
                }
            }
            searchTeacher();
        }
    }, [temp, authState.accessToken])

    const fetchSections = async () => {
        try {
            const response = await axios.post('https://class-teacher.onrender.com/classTeacher/fetch/sections', {
                accessToken: authState.accessToken,
                class: Class,
            });
            const sectionsdetail = response.data.sections;
            console.log(Class);

            setSections(sectionsdetail);
        } catch (error) {
            console.error("Error searching for teachers:", error);
        } finally {
            setLoading(false);
        }

    };
    const handleAddSection = async () => {
        console.log('class', Class)
        console.log('section', newSection)
        console.log('teacher', email)
        try {
            const response = await axios.post('https://class-teacher.onrender.com/classTeacher/assign', {
                accessToken: authState.accessToken,
                class: Class,
                section: newSection,
                teacherEmail: email
            });
            if (response.status === 200) {
                toast.success('Teacher Assigned successfully');
            }

        } catch (error) {
            toast.error('Error assigning teacher');
        }
    };

    return (
        <div key={Class} className="w-full mb-4 rounded-lg mt-2 shadow-md border">
            <ToastContainer />
            <div className="flex justify-between items-center p-2" >
                <div className="w-1/4">
                    <div className="px-4 py-2 ">
                        {Class}
                    </div>
                </div>
                <div className="self-center cursor-pointer" onClick={handleClick}>
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>

            {expanded && (
                <div>
                    <div className="flex justify-between w-full py-2 pl-2 bg-bg_blue h-fit rounded-t-lg border border-black">
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Section
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Class Teacher
                        </h1>
                        <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Action
                        </h1>
                    </div>

                    {!loading ? (
                        sectionsDetails.map((details, index) => (
                            <div key={index} className={`flex justify-between w-full py-2 pl-2  h-fit border border-black ${index === sectionsDetails.length - 1 ? "rounded-b-lg" : ""}`}>
                                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                                    {details.section}
                                </h1>
                                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                    {details.name}
                                </h1>
                                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                                    {details.name ? "Assigned" : <button onClick={() => handleUpdateClick(index)}>Update</button>}
                                </h1>
                            </div>
                        ))
                    ) : (
                        <Loading />
                    )}

                    <div className="flex justify-between w-full px-3 py-1  h-fit ">
                        <input
                            type="text"
                            className=" border rounded-md w-40 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm"
                            placeholder="Enter new section"
                            value={newSection}
                            onChange={(e) => setNewSection(e.target.value)}
                        />

                        <input
                            type="email"
                            className="w-56  border px-1 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm rounded-md"
                            placeholder="bhanu68tyagi@gmail.com"
                            list={`teacher-suggestions`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-40 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
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

                        <button
                            className=" bg-green-200 text-gray-800 hover:bg-green-500 hover:text-white rounded-md w-40 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm px-3 py-2"
                            onClick={handleAddSection}
                        >
                            Assign
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
