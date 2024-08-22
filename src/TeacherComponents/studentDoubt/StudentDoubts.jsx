import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { FaFilter, FaChevronDown, FaQuestionCircle, FaCheck } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewDoubt from './utils/NewDoubt';
import Answered from './utils/Answered';

function StudentDoubts() {
    const { authState } = useContext(AuthContext);
    const [Class, setClass] = useState('');
    const [Section, setSection] = useState('');
    const [Subject, setSubject] = useState('');
    const [selectedLink, setSelectedLink] = useState(`/Teacher-Dashboard/studentdoubts/new`);
    const uniqueClasses = Array.from(new Set(authState.subject ? authState.subject.map(subj => subj.class) : []));
    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        setUniqueSections(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.class === Class)
                .map(subj => subj.section) : []
        )));
    }, [Class]);

    useEffect(() => {
        setUniqueSubjects(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.section === Section && subj.class === Class)
                .map(subj => subj.subject) : []
        )));
    }, [Section, Class]);

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    const handleClassChange = (e) => {
        setClass(e.target.value);
    };

    const handleSectionChange = (e) => {
        setSection(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col px-6 h-screen overflow-y-auto items-start mt-4 ml-4 mr-6 mb-6 no-scrollbar bg-indigo-50"
        >
            <ToastContainer />
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between mobile:max-tablet:flex-col w-full items-center mb-4 py-2"
            >
                <h1 className="text-3xl mobile:max-tablet:text-lg font-bold text-indigo-800">Student Doubts</h1>
                <div className="flex justify-between gap-3 mobile:max-tablet: ">
                    <select id="class" value={Class} onChange={handleClassChange} className="shadow-md px-3 py-1  border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg">
                        <option value="">Search by Class</option>
                        {uniqueClasses.map((classOption, index) => (
                            <option key={index} value={classOption}>{classOption}</option>
                        ))}
                    </select>

                    <select id="section" value={Section} onChange={handleSectionChange} className="shadow-md px-3 py-1  border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg">
                        <option value="">Search by Section</option>
                        {uniqueSections.map((sectionOption, index) => (
                            <option key={index} value={sectionOption}>{sectionOption}</option>
                        ))}
                    </select>

                    <select id="subject" value={Subject} onChange={handleSubjectChange} className="shadow-md px-3 py-2  border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg">
                        <option value="">Search by Subject</option>
                        {uniqueSubjects.map((subjectOption, index) => (
                            <option key={index} value={subjectOption}>{subjectOption}</option>
                        ))}
                    </select>
                </div>
            </motion.div>



            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
            >
                <div className="flex mb-4 border-b-2 border-indigo-200">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 flex items-center ${selectedLink === `/Teacher-Dashboard/studentdoubts/new` ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-600"}`}
                        onClick={() => handleLinkSelect(`/Teacher-Dashboard/studentdoubts/new`)}
                    >
                        <FaQuestionCircle className="mr-2" /> New Doubts
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 flex items-center ${selectedLink === `/Teacher-Dashboard/studentdoubts/answered` ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-600"}`}
                        onClick={() => handleLinkSelect(`/Teacher-Dashboard/studentdoubts/answered`)}
                    >
                        <FaCheck className="mr-2" /> Answered Doubts
                    </motion.button>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className=""
                >
                    {selectedLink === '/Teacher-Dashboard/studentdoubts/new' && (
                        <NewDoubt Class={Class} Section={Section} Subject={Subject} />
                    )}
                    {selectedLink === '/Teacher-Dashboard/studentdoubts/answered' && (
                        <Answered Class={Class} Section={Section} Subject={Subject} />
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default StudentDoubts;