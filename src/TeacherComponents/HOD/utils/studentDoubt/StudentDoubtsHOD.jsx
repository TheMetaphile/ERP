import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../../Context/AuthContext';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaCheck } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewDoubt from './utils/NewDoubt';
import Answered from './utils/Answered';
import axios from 'axios';
import { BASE_URL_Login } from '../../../../Config';

function StudentDoubtsHOD() {
    const { authState } = useContext(AuthContext);
    const [Class, setClass] = useState('');
    const [Section, setSection] = useState('');
    const [Subject, setSubject] = useState('');
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedLink, setSelectedLink] = useState(`/Teacher-Dashboard/HOD/studentDoubts/new`);

    const wingClasses = {
        'Pre-Nursery-U.K.G': ['Pre-Nursery', 'Nursery', 'L.K.G', 'U.K.G'],
        '1st-2nd': ['1st', '2nd'],
        '3rd-5th': ['3rd', '4th', '5th'],
        '6th-8th': ['6th', '7th', '8th'],
        '9th-12th': ['9th', '10th', '11th', '12th']
    };

    const availableClasses = wingClasses[authState?.userDetails?.co_ordinator_wing] || [];



    const fetchSections = async (selectedClass) => {
        try {
            const response = await axios.post(`${BASE_URL_Login}/classTeacher/fetch/sections`, {
                accessToken: authState.accessToken,
                class: selectedClass
            });
            const sectionsDetail = response.data.sections.map((sectionObj) => sectionObj.section);
            setSections(sectionsDetail);
            console.log(sectionsDetail);
        } catch (error) {
            console.error('Error while fetching section:', error);
        }
    };

    const fetchSubject = async () => {
        console.log(Class, Section)
        try {
            const response = await axios.post(`${BASE_URL_Login}/fetch`, {
                accessToken: authState.accessToken,
                class: Class,
                section: Section
            });
            const subjectsDetail = [...new Set(response.data.teacher.map((teacher) => teacher.subject))];
            setSubjects(subjectsDetail);
        } catch (error) {
            console.error('Error while fetching subjects:', error);
        }
    };

    const handleClassChange = (e) => {
        const selectedClass = e.target.value;
        setClass(selectedClass);
        setSection('');
        setSubject('');
        fetchSections(selectedClass);
    };

    const handleSectionChange = (e) => {
        const selectedSection = e.target.value;
        setSection(selectedSection);
    };

    useEffect(() => {
        if (Section) {
            fetchSubject();
        }
    }, [Section]);

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col px-2 w-full h-screen overflow-y-auto items-start mt-4 ml-4 mr-6 mb-6 no-scrollbar"
        >
            <ToastContainer />
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between mobile:max-tablet:flex-col w-full mobile:max-tablet:items-start items-center mb-4 py-2"
            >
                <div className='w-full flex'>

                    <h1 className="text-3xl mobile:max-tablet:text-xl font-medium text-black mobile:max-tablet:text-left w-full">Student Doubts</h1>
                    <div className="flex justify-around mobile:max-tablet:overflow-auto w-full">
                        <select
                            id="class"
                            value={Class}
                            onChange={handleClassChange}
                            className="shadow-md px-3 py-1 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        >
                            <option value="">Search by Class</option>
                            {availableClasses.map((classOption, index) => (
                                <option key={index} value={classOption}>
                                    {classOption}
                                </option>
                            ))}
                        </select>

                        <select
                            id="section"
                            value={Section}
                            onChange={handleSectionChange}
                            className="shadow-md px-3 py-1 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        >
                            <option value="">Search by Section</option>
                            {sections.map((sectionOption, index) => (
                                <option key={index} value={sectionOption}>
                                    {sectionOption}
                                </option>
                            ))}
                        </select>

                        <select
                            id="subject"
                            value={Subject}
                            onChange={handleSubjectChange}
                            className="shadow-md px-3 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        >
                            <option value="">Search by Subject</option>
                            {subjects.map((subjectOption, index) => (
                                <option key={index} value={subjectOption}>
                                    {subjectOption}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
            >
                <div className="flex mb-4 border-b-2 border-blue-200">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 flex items-center ${selectedLink === `/Teacher-Dashboard/HOD/studentDoubts/new` ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                            }`}
                        onClick={() => handleLinkSelect(`/Teacher-Dashboard/HOD/studentDoubts/new`)}
                    >
                        <FaQuestionCircle className="mr-2" /> New Doubts
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 flex items-center ${selectedLink === `/Teacher-Dashboard/HOD/studentDoubts/answered` ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                            }`}
                        onClick={() => handleLinkSelect(`/Teacher-Dashboard/HOD/studentDoubts/answered`)}
                    >
                        <FaCheck className="mr-2" /> Answered Doubts
                    </motion.button>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {selectedLink === '/Teacher-Dashboard/HOD/studentDoubts/new' && (
                        <NewDoubt Class={Class} Section={Section} Subject={Subject} />
                    )}
                    {selectedLink === '/Teacher-Dashboard/HOD/studentDoubts/answered' && (
                        <Answered Class={Class} Section={Section} Subject={Subject} />
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default StudentDoubtsHOD;
