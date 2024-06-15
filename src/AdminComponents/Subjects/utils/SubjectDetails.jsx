import React, { useEffect, useState, useContext } from 'react';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SubjectDetails({ Class, section }) {
    const [subjectDetails, setSubjects] = useState([]);
    const [subjectLoading, setSubjectLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const [newRow, setNewRow] = useState({ email: '', subject: '' });
    const [showNewRow, setShowNewRow] = useState(false);
    const [temp, setTemp] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (section != null && section != null) {
            setSubjectLoading(true);
            fetchSubject();
        }
    }, [Class, section]);

    const fetchSubject = async () => {
        console.log('class', Class, 'section', section)
        try {
            const response = await axios.post('https://assignsubjectapi.onrender.com/fetch', {
                accessToken: authState.accessToken,
                class: Class,
                section: section
            });
            const sectionsdetail = response.data.teacher;
            console.log(sectionsdetail);
            setSubjects(sectionsdetail);
        } catch (error) {
            console.error("Error searching for teachers:", error);
        } finally {
            setSubjectLoading(false);
        }
    };

    const handleAddRow = async () => {
        console.log('class', Class, 'section', section, 'email', newRow.email, 'subject', newRow.subject)

        try {
            const response = await axios.post('https://assignsubjectapi.onrender.com/assign', {
                accessToken: authState.accessToken,
                class: Class,
                section: section,
                email: newRow.email,
                subject: newRow.subject
            });
            if (response.status === 200) {
                setSubjects([...subjectDetails, { ...newRow, name: 'New Teacher', profileLink: '' }]);
                setNewRow({ email: '', subject: '' });
                setShowNewRow(false);
                console.log('suucccc', response.data)
                toast.success('Subject Assigned Successfully');
            }
        } catch (error) {
            console.error("Error assigning subject:", error);
            toast.error('error');
        }
    }

    const handleChange = (e, field) => {
        setNewRow({ ...newRow, [field]: e.target.value })
    }

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setNewRow({ ...newRow, email });
        setTemp(email);
    }

    const handleSuggestionClick = (suggestion) => {
        setNewRow({ ...newRow, email: suggestion.email });
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

    return (
        <div className='px-5 mt-2 mb-2'>
            <ToastContainer />
            <div className="flex justify-between py-2 pl-2  h-fit rounded-t-lg border bg-blue-200">
                <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                    Teacher
                </h1>
                <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                    Subject
                </h1>
                <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                    Email
                </h1>
            </div>
            {subjectLoading ? (
                <Loading />
            ) : (
                subjectDetails.map((detail, index) => (
                    <div key={index} className="px-2 flex justify-between  py-2 pl-2 h-fit border">
                        <div className='flex w-full whitespace-nowrap items-center'>
                            <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                            <h1 className="ml-2 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm ">
                                {detail.name}
                            </h1>
                        </div>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                            {detail.subject}
                        </h1>
                        <h1 className="w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                            {detail.email}
                        </h1>
                    </div>
                ))
            )}
            {showNewRow && (
                <div className="px-2 flex justify-between  py-2 pl-2 h-fit border  gap-4">
                    <div className='w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap'></div>
                    <input type="text" value={newRow.subject} onChange={(e) => handleChange(e, 'subject')} className='w-full px-2 py-2 border rounded-lg' placeholder="Enter Subject" />
                    <div className='relative w-full'>
                        <input type="text" value={newRow.email} onChange={handleEmailChange} className='w-full px-2 py-2 border rounded-lg' placeholder="Enter Email" />
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
                </div>
            )}
            {!showNewRow ? (
                <button className='mt-2 px-4 py-2 bg-green-500 text-white rounded-lg ' onClick={() => setShowNewRow(true)}>
                    Add Row
                </button>
            ) : (
                <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg' onClick={handleAddRow}>
                    Save
                </button>
            )}
        </div>
    )
}

export default SubjectDetails


