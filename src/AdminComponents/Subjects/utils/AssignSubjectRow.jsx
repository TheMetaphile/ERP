import React, { useEffect, useState, useContext } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubjectDetails from './SubjectDetails';
import { BASE_URL_Login, BASE_URL_ClassTeacher } from '../../../Config';

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
        }, 500);

        return () => {
            clearTimeout(handler);
        }
    }, [email])

    useEffect(() => {
        if (temp) {
            const searchTeacher = async () => {
                try {
                    const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
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
            const response = await axios.post(`${BASE_URL_ClassTeacher}/classTeacher/fetch/sections`, {
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
        <div key={Class} className="w-full mt-3 mb-4 rounded-lg shadow-md border overflow-auto">
            <ToastContainer />
            <div className="flex justify-between items-center p-2 " onClick={handleClick}>
                <div className="w-1/4">
                    <div className="px-4 py-2 whitespace-nowrap">
                        {Class}
                    </div>
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
                                    <div key={index} className="mb-3 rounded-lg shadow-md">
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
                            </div>
                        ) : (
                            <div className="text-center">No section added. Please assign Class Teacher First then assign subjects of that class to other teachers</div>
                        )
                    ) : (
                        <Loading />
                    )}
                </div>
            )}

        </div>
    );
}
