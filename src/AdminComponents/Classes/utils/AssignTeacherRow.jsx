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
    const [temp, setTemp] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const [showNewRow, setShowNewRow] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (expanded) {
            setLoading(true);
            fetchSections();
        }
    }, [expanded]);

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        setTemp(email);
    }

    const handleSuggestionClick = (suggestion) => {
        setEmail(suggestion.email);
        setShowSuggestions(false);
    }

    useEffect(() => {
        if (temp) {
            const handler = setTimeout(() => {
                setShowSuggestions(true);
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

                    }
                    catch (error) {
                        console.error("Error searching for teachers:", error);
                    }
                }
                searchTeacher();
            }, 1000);

            return () => {
                clearTimeout(handler);
            }
        } else {
            setShowSuggestions(false);
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
                fetchSections();
                setNewSection('');
                setEmail('');
                setShowNewRow(false);
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
                        {showNewRow ? (
                            <>
                                <input
                                    type="text"
                                    className="border rounded-md w-40 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm"
                                    placeholder="Enter new section"
                                    value={newSection}
                                    onChange={(e) => setNewSection(e.target.value)}
                                />
                                <div className='relative'>
                                    <input
                                        type="text"
                                        className="w-56 border px-3 py-2 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm rounded-md"
                                        placeholder="bhanu68tyagi@gmail.com"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {showSuggestions && suggestions.length > 0 && (
                                        <ul className="absolute z-10 w-72 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                                            {suggestions.map((suggest, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                                    onClick={() => handleSuggestionClick(suggest)}
                                                >
                                                    <img src={suggest.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                                    {suggest.email}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg' onClick={handleAddSection}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <button className='mt-2 px-4 py-2 bg-green-500 text-white rounded-lg' onClick={() => setShowNewRow(true)}>
                                Add Row
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
