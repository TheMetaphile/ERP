import React, { useEffect, useState, useContext } from 'react';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDeleteForever } from "react-icons/md";

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
            if (newRow.email) {
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
            }
            else {
                toast.error('Please specify teacher');
            }

        } catch (error) {
            console.error("Error assigning subject:", error);
            toast.error('Please specify subject');

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
            }, 500);

            return () => {
                clearTimeout(handler);
            }
        } else {
            setShowSuggestions(false);
        }
    }, [temp, authState.accessToken])

    const handleDelete = async (index) => {
        const { email, subject } = subjectDetails[index];
        console.log('Deleting ', Class, 'section:', section, 'email:', email, 'subject:', subject , authState.accessToken);

        try {
            const response = await axios.delete('https://assignsubjectapi.onrender.com/delete', {
                data: {
                accessToken: authState.accessToken,
                class: Class,
                section: section,
                subject: subject
            }});

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

    return (
        <div className='px-5 mt-2 mb-2 py-2 overflow-auto w-full border border-gray-300' >
            <ToastContainer />
            <div className="border border-black rounded-lg mobile:max-tablet:w-fit w-full">
            <div className="flex justify-between py-2 pl-2 mobile:max-tablet:w-fit w-full h-fit rounded-t-lg border bg-blue-200">
                <h1 className="w-48 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                    Teacher
                </h1>
                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                    Subject
                </h1>
                <h1 className="w-48 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                    Email
                </h1>
                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                    Action
                </h1>
            </div>
            {!subjectLoading ?
                subjectDetails.length > 0 ?
                    (
                        subjectDetails.map((detail, index) => (
                            <div key={index} className="pl-2 mobile:max-tablet:w-fit w-full flex justify-between  py-2  h-fit border items-center">
                                <div className='flex w-48 whitespace-nowrap items-center'>
                                    <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                    <h1 className="ml-2 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm ">
                                        {detail.name}
                                    </h1>
                                </div>
                                <h1 className="w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                    {detail.subject}
                                </h1>
                                <h1 className="w-48 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                    {detail.email}
                                </h1>
                                <div className='w-36 text-lg  mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap'>
                                   <MdDeleteForever className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(index)}/> 
                                </div>
                                {/* <h1 className=" items-center cursor-pointer w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap text-red-500">
                                    <MdDeleteForever  onClick={() => handleDelete(index)}/>
                                </h1> */}

                            </div>
                        ))
                    )
                    :
                    <div className='text-center'>No subject added</div>
                :
                (
                    <Loading />
                )}
            {showNewRow ? (
                <div className="px-2 flex justify-between  py-2 pl-2 h-fit border  gap-4">
                    <div className='w-full text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap'></div>
                    <input type="text" value={newRow.subject} onChange={(e) => handleChange(e, 'subject')} className='w-full px-2 py-2 border rounded-lg' placeholder="Enter Subject" required />
                    <div className='relative w-full'>
                        <input type="text" value={newRow.email} onChange={handleEmailChange} className='w-full px-2 py-2 border rounded-lg' placeholder="Enter Email" required />
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
                    <div className='flex items-center'>
                        <button className=' px-4 text-green-400 hover:text-green-700 ' onClick={handleAddRow}>
                            Save
                        </button>
                        {" / "}
                        <button className=' px-4 text-red-400 hover:text-red-700 ' onClick={() => { setShowNewRow(false) }}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            </div>
            <div className="flex justify-center w-full px-3 py-1  h-fit ">
                <button className='mt-2 px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg' onClick={() => setShowNewRow(true)}>
                    Add subject
                </button>
            </div>
            {/* {!showNewRow ? (
                <button className='mt-2 px-4 py-2 bg-green-500 text-white rounded-lg ' onClick={() => setShowNewRow(true)}>
                    Add Row
                </button>
            ) : (
                <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg' onClick={handleAddRow}>
                    Save
                </button>
            )} */}
        </div>
    )
}

export default SubjectDetails


