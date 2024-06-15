import React, { useEffect, useState, useContext } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubjectDetails from './SubjectDetails';

export default function AssignSubjectRow({ Class }) {
    const [expanded, setExpanded] = useState(false);
    const [sectionsDetails, setSections] = useState([]);
    const [email, setEmail] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [temp, setTemp] = useState();
    const [loading, setLoading] = useState(false);
    const { authState } = useContext(AuthContext);
    const [subjectExpande, setSubjectExpande] = useState(false);
    const [subjectLoading, setSubjectLoading] = useState(false);

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

    return (
        <div key={Class} className="w-full mt-3 mb-4 rounded-lg shadow-md border ">
        <ToastContainer />
        <div className="flex justify-between items-center p-2">
            <div className="w-1/4">
                <div className="px-4 py-2">
                    {Class}
                </div>
            </div>
            <div className="self-center cursor-pointer" onClick={handleClick}>
                {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </div>
        </div>

        {expanded && (
            <div className='  px-5'>
                <div className="flex justify-between py-2 pl-2  h-fit rounded-t-lg border bg-secondary">
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Section
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                        Class Teacher
                    </h1>
                    <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm"></h1>
                </div>

                {!loading ? (
                    sectionsDetails.map((details, index) => (
                        <div key={index}>
                            <div className="px-2 flex justify-between  py-2 pl-2 h-fit border">
                                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                                    {details.section}
                                </h1>
                                <h1 className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                    {details.name}
                                </h1>
                                <div className="self-center cursor-pointer" onClick={() => handleSectionClick(index)}>
                                    {details.expanded ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </div>
                            {details.expanded && (
                                <SubjectDetails key={index} Class={Class} section={details.section} />
                            )}
                        </div>
                    ))
                ) : (
                    <Loading />
                )}
            </div>
        )}
    </div>
    );
}
