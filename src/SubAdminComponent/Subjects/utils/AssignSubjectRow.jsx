import React, { useEffect, useState, useContext } from 'react';
import { FaChevronUp, FaChevronDown, FaUserGraduate } from "react-icons/fa6";
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubjectDetails from './SubjectDetails';
import { BASE_URL } from '../../../Config';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssignSubjectRow({ Class, selectedStream }) {
    const [expanded, setExpanded] = useState(false);
    const [sectionsDetails, setSections] = useState([]);
    const [email, setEmail] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [temp, setTemp] = useState();
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const [subjectExpande, setSubjectExpande] = useState(false);
    const [subjectLoading, setSubjectLoading] = useState(false);
    const [optionalSubjects, setOptionalSubjects] = useState([]);

    const handleSubjectClick = () => {
        setSubjectExpande(!subjectExpande);
    };

    const handleClick = () => {
        setExpanded(!expanded);
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
        }, 500);

        return () => {
            clearTimeout(handler);
        }
    }, [email])

    const handleSuggestionClick = (index, suggestion) => {
        setEmail(prev => ({
            ...prev,
            [index]: suggestion.email
        }));
        setShowSuggestions(false);
    };


    useEffect(() => {
        if (temp) {
            const searchTeacher = async () => {
                setShowSuggestions(true);
                try {
                    const response = await axios.post(`${BASE_URL}/search/teacher`, {
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
        } else {
            setShowSuggestions(false);
        }
    }, [temp, authState.accessToken])

    const fetchSections = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                accessToken: authState.accessToken,
                class: Class,
            });
            const sectionsdetail = response.data.sections;
            console.log(Class);

            setSections(sectionsdetail.map(section => ({
                ...section,
                expanded: false,
            })));
        } catch (error) {
            console.error("Error searching for teachers:", error);
        } finally {
            setLoading(false);
        }

    };


    const handleSectionClick = (index) => {
        setSections(sectionsDetails.map((section, i) =>
            i === index ? { ...section, expanded: !section.expanded } : section
        ));
    };

    const handleEmailChange = (index, event) => {
        setEmail(prev => ({
            ...prev,
            [index]: event.target.value
        }));
    };


    useEffect(() => {
        if (Class && selectedStream && expanded) {
            console.log(Class, selectedStream, expanded)
            fetchSubjects();
        }
    }, [Class, selectedStream, expanded]);

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
                setOptionalSubjects(data.optionalSubjects || []);
            }
        } catch (error) {
            toast.error({ text: 'Error connecting to server', type: 'error' });
        }
    };

    return (
        <motion.div
            key={Class}
            className="w-full mt-3 mb-4 rounded-lg shadow-md border overflow-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
        >

            <ToastContainer />
            <div className="flex justify-between items-center p-2 " onClick={handleClick}>
                <div className="flex items-center py-2">
                    <FaUserGraduate className="text-secondary-600 mr-2" />
                    <div className="text-lg font-semibold text-secondary-800">{Class}</div>
                </div>
                <div className="self-center cursor-pointer" >
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>

            {expanded && (
                <div className="px-5">
                    {!loading ? (
                        sectionsDetails.length > 0 ? (
                            <div>
                                {sectionsDetails.map((details, index) => (
                                    <div key={index} className="mb-3 rounded-lg border shadow-md">
                                        <div className="px-2 flex justify-between py-2 pl-2 h-fit border border-gray-300" onClick={() => handleSectionClick(index)}>
                                            <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                                                {details.section}
                                            </h1>
                                            <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                {details.name}
                                            </h1>
                                            <div
                                                className="self-center cursor-pointer"
                                                onClick={() => handleSectionClick(index)}
                                            >
                                                {details.expanded ? <FaChevronUp /> : <FaChevronDown />}
                                            </div>
                                        </div>
                                        {details.expanded && (
                                            <SubjectDetails key={index} Class={Class} section={details.section} />
                                        )}
                                    </div>
                                ))}


                                {optionalSubjects.length > 0 && (
                                    <div className=' overflow-auto'>
                                        <div className="text-lg font-semibold text-purple-500">Optional Subjects</div>
                                        <div className="mt-3 border border-black rounded-lg mobile:max-laptop:w-fit w-full">
                                            <div className="flex justify-between py-2 pl-2 mobile:max-laptop:w-fit w-full h-fit rounded-t-lg border bg-purple-200">
                                                <h1 className="w-36 text-lg font-medium mobile:max-laptop:text-sm mobile:max-laptop:font-sm whitespace-nowrap">
                                                    Subject
                                                </h1>
                                                <h1 className="w-48 text-lg font-medium mobile:max-laptop:text-sm mobile:max-laptop:font-sm">
                                                    Teacher
                                                </h1>
                                                <h1 className="w-48 text-lg font-medium mobile:max-laptop:text-sm mobile:max-laptop:font-sm whitespace-nowrap">
                                                    Email
                                                </h1>
                                                <h1 className="w-36 text-lg font-medium mobile:max-laptop:text-sm mobile:max-laptop:font-sm whitespace-nowrap">
                                                    Action
                                                </h1>
                                            </div>
                                            {optionalSubjects.map((detail, index) => (
                                                <div key={index} className="pl-2 mobile:max-laptop:w-fit w-full flex justify-between  py-2  h-fit border items-center">

                                                    <h1 className="w-36 text-lg  mobile:max-laptop:text-sm mobile:max-laptop:font-sm whitespace-nowrap">
                                                        {detail}
                                                    </h1>
                                                    <div className='flex w-48 whitespace-nowrap items-center'>
                                                        <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                                        <h1 className="ml-2 text-lg  mobile:max-laptop:text-sm mobile:max-laptop:font-sm ">
                                                            {detail.name}
                                                        </h1>
                                                    </div>
                                                    <h1 className="w-48 text-lg  mobile:max-laptop:text-sm mobile:max-laptop:font-sm whitespace-nowrap">
                                                        <div className='relative w-full'>
                                                            <input
                                                                type="text"
                                                                value={email[index] || ''}
                                                                onChange={(event) => handleEmailChange(index, event)}
                                                                className='w-full px-2 py-2 border rounded-lg'
                                                                placeholder="Enter Email"
                                                                required
                                                            />
                                                            {showSuggestions && suggestions.length > 0 && (
                                                                <ul className="absolute z-10 w-72 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                                                                    {suggestions.map((suggestion, idx) => (
                                                                        <li
                                                                        key={idx}
                                                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                                                        onClick={() => handleSuggestionClick(index, suggestion)}
                                                                    >
                                                                        <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                                                        {suggestion.email}
                                                                    </li>
                                                                    
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </h1>
                                                    <div className='w-36 text-lg  mobile:max-laptop:text-sm mobile:max-laptop:font-sm whitespace-nowrap'>
                                                        <div className='flex items-center'>
                                                            <button className=' px-4 text-green-400 hover:text-green-700 '
                                                            // onClick={handleAddRow}
                                                            >
                                                                Save
                                                            </button>
                                                            {" / "}
                                                            <button className=' px-4 text-red-400 hover:text-red-700 '
                                                            // onClick={() => { setShowNewRow(false) }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            )

                                            )}
                                        </div>

                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center">No section added. Please assign Class Teacher First then assign subjects of that class to other teachers</div>
                        )
                    ) : (
                        <Loading />
                    )}
                </div>
            )}

        </motion.div>

    );
}
