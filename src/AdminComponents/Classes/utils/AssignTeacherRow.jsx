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
    const [editingRow, setEditingRow] = useState(null);

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
            }, 500);

            return () => {
                clearTimeout(handler);
            }
        } else {
            setShowSuggestions(false);
        }
    }, [temp, authState.accessToken])


    const getNextAsciiValues = (inputString) => {
        setNewSection(String.fromCharCode(inputString.charCodeAt(0) + 1));
        setShowNewRow(true);
    };

    const fetchSections = async () => {
        try {
            if (sectionsDetails.length <= 0) {
                const response = await axios.post('https://class-teacher.onrender.com/classTeacher/fetch/sections', {
                    accessToken: authState.accessToken,
                    class: Class,
                });
                const sectionsdetail = response.data.sections;
                console.log(Class);

                setSections(sectionsdetail);
            }
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
            if (email) {
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
                    setEditingRow(null);
                }
            } else {
                toast.error('Please specify teacher');
            }

        } catch (error) {
            toast.error('Error assigning teacher');
        }
    };

    const handleUpdateClick = (index) => {
        setEditingRow(index);
        setEmail(sectionsDetails[index].name);
    };

    const handleConfirmClick = async (index) => {
        try {
            if (email) {
                const response = await axios.post('https://class-teacher.onrender.com/classTeacher/assign', {
                    accessToken: authState.accessToken,
                    class: Class,
                    section: sectionsDetails[index].section,
                    teacherEmail: email
                });
                if (response.status === 200) {
                    toast.success('Teacher Updated successfully');
                    fetchSections();
                    setEmail('');
                    setEditingRow(null);
                }
            } 
        } catch (error) {
            toast.error('Error updating teacher');
        }
    };

    return (
        <div key={Class} className=" w-full mb-4 rounded-lg mt-2 shadow-md border" >
            <ToastContainer />
            <div className="flex justify-between items-center p-2  hover:cursor-pointer" onClick={handleClick}>
                <div className="w-1/4">
                    <div className="px-4 py-2 ">
                        {Class}
                    </div>
                </div>
                <div className="self-center cursor-pointer" >
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>

            {expanded && (
                <div className='mx-3'>
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
                    {!loading ?
                        sectionsDetails.length > 0 ?
                            (
                                <div>
                                    {sectionsDetails.map((details, index) => (
                                        <div key={index} className={`flex justify-between w-full py-2 pl-2  h-fit border border-black ${index === sectionsDetails.length - 1 && !showNewRow ? "rounded-b-lg" : ""}`}>
                                            <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                                                {details.section}
                                            </h1>
                                            <div className='relative'>
                                                {editingRow === index ? (
                                                    <input
                                                        type="text"
                                                        className="w-36 px-2 border border-black rounded-lg text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap"
                                                        placeholder="Teacher"
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                        required
                                                    />
                                                ) : (
                                                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                        {details.name}
                                                    </h1>
                                                )}
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
                                            <div className='w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap'>
                                                {editingRow === index ? (
                                                    <button className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={() => handleConfirmClick(index)}>Confirm</button>
                                                ) : (
                                                    <button className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md' onClick={() => handleUpdateClick(index)}>Update</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                            :
                            <div className='text-center'>No section added</div>
                        :
                        (
                            <Loading />
                        )}
                    {showNewRow ? (
                        <div className={`flex justify-between w-full py-2 px-4  h-fit border border-black ${sectionsDetails.length > 0 ? "rounded-b-lg" : "rounded-lg"}`}>
                            <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                                {newSection}
                            </h1>
                            <div className='relative'>
                                <input
                                    type="text"
                                    className="w-36 px-2 border border-black rounded-lg text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap"
                                    placeholder="Teacher"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
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
                            <div>
                                <button className=' px-4 text-green-400 hover:text-green-700 ' onClick={handleAddSection}>
                                    Save
                                </button>
                                {" / "}
                                <button className=' px-4  text-red-400 hover:text-red-700' onClick={() => { setShowNewRow(false) }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="flex justify-center w-full px-3 py-1  h-fit ">
                        <button className='mt-2 px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg' onClick={() => getNextAsciiValues(sectionsDetails.length > 0 ? sectionsDetails[sectionsDetails.length - 1].section : '@')}>
                            Add section
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
