import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";
import { motion } from 'framer-motion';
import { FaGraduationCap, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

function Selection({ setClass, setSection, setSubject, darkMode }) {
    const { authState } = useContext(AuthContext);
    const allSubjects = [...authState.subject, ...authState.Co_scholastic];

    const [selectedClass, setSelectedClass] = useState(allSubjects?.[0]?.class || '');
    const [selectedSection, setSelectedSection] = useState(allSubjects?.[0]?.section || '');
    const [selectedSubject, setSelectedSubject] = useState(allSubjects?.[0]?.subject || '');

    const uniqueClasses = Array.from(new Set(allSubjects.map(subj => subj.class)));
    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);

    useEffect(() => {
        if (selectedClass) {
            const sections = Array.from(new Set(
                allSubjects.filter(subj => subj.class === selectedClass).map(subj => subj.section)
            ));
            setUniqueSections(sections);
        }
    }, [selectedClass]);

    useEffect(() => {
        if (selectedClass && selectedSection) {
            const subjects = Array.from(new Set(
                allSubjects.filter(subj =>
                    subj.section === selectedSection && subj.class === selectedClass
                ).map(subj => subj.subject)
            ));
            setUniqueSubjects(subjects);
        }
    }, [selectedClass, selectedSection]);

    const handleClassChange = (event) => {
        const newClass = event.target.value;
        setSelectedClass(newClass);
        setClass(newClass);
        setSelectedSection('');
        setUniqueSubjects([]);
    };

    const handleSectionChange = (event) => {
        const newSection = event.target.value;
        setSelectedSection(newSection);
        setSection(newSection);
        setUniqueSubjects([]);
    };

    const handleSubjectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSubject(selectedValue);
        const selectedSubj = allSubjects.find(subj => subj.subject === selectedValue);
        setClass(selectedSubj.class);
        setSection(selectedSubj.section);
        setSubject(selectedValue);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const selectVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            className="container p-3 w-fit mobile:max-sm:w-full mobile:max-tablet:p-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex justify-between gap-3 mobile:max-tablet:flex-col mobile:max-tablet:w-full">
                <motion.div
                    className="w-36 mobile:max-tablet:w-full relative"
                    variants={selectVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <FaGraduationCap className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <select
                        id="class"
                        className={`w-full px-2 py-2 pl-8 border-2 focus:outline-none focus:ring-2 focus:border-transparent rounded-md ${darkMode
                            ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'
                            : 'border-blue-300 focus:ring-blue-500'}`}
                        onChange={handleClassChange}
                        value={selectedClass}
                    >
                        <option value="">Class</option>
                        {uniqueClasses.map((classOption, index) => (
                            <option key={index} value={classOption}>{classOption}</option>
                        ))}
                    </select>
                </motion.div>
                <motion.div
                    className="w-36 mobile:max-tablet:w-full relative"
                    variants={selectVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <FaChalkboardTeacher className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <select
                        id="section"
                        className={`w-full px-2 py-2 pl-8 border-2 focus:outline-none focus:ring-2 focus:border-transparent rounded-md ${darkMode
                            ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'
                            : 'border-blue-300 focus:ring-blue-500'}`}
                        onChange={handleSectionChange}
                        value={selectedSection}
                        disabled={!selectedClass}
                    >
                        <option value="">Section</option>
                        {uniqueSections.map((sectionOption, index) => (
                            <option key={index} value={sectionOption}>{sectionOption}</option>
                        ))}
                    </select>
                </motion.div>
                <motion.div
                    className="w-36 mobile:max-tablet:w-full relative"
                    variants={selectVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <FaBook className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <select
                        id="subject"
                        className={`w-full px-2 py-2 pl-8 border-2 focus:outline-none focus:ring-2 focus:border-transparent rounded-md ${darkMode
                            ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-600'
                            : 'border-blue-300 focus:ring-blue-500'}`}
                        onChange={handleSubjectChange}
                        value={selectedSubject}
                        disabled={!selectedSection}
                    >
                        <option value="">Select Subject</option>
                        {uniqueSubjects.map((subjectOption, index) => (
                            <option key={index} value={subjectOption}>
                                {subjectOption}
                            </option>
                        ))}
                    </select>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Selection;