import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";
import { motion } from 'framer-motion';
import { FaGraduationCap, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

function Selection({ setClass, setSection, setSubject }) {
    const { authState } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState(authState.subject ? authState.subject[0].class : '');
    const [selectedSection, setSelectedSection] = useState(authState.subject ? authState.subject[0].section : "");

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        setClass(event.target.value);
    }
    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
        setSection(event.target.value);
    }
    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    }

    const uniqueClasses =  Array.from(new Set(authState.subject ? authState.subject.map(subj => subj.class) : []));

    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);
    useEffect(() => {
        setUniqueSections(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.class === selectedClass)
                .map(subj => subj.section) : []
        )));
    }, [selectedClass]);


    useEffect(() => {
        setUniqueSubjects(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.section === selectedSection && subj.class === selectedClass)
                .map(subj => subj.subject) : []
        )));
    }, [selectedSection, selectedClass]);


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
          className="container p-3 w-fit mobile:max-tablet:w-full mobile:max-tablet:p-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between gap-3 mobile:max-tablet:flex-col mobile:max-tablet:w-full">
            <motion.div
              className="w-36 mobile:max-tablet:w-full relative "
              variants={selectVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaGraduationCap className="absolute left-2 top-1/2  transform -translate-y-1/2 text-indigo-500" />
              <select
                id="class"
                className="w-full px-2 py-2 pl-8 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-md"
                onChange={handleClassChange}
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
              <FaChalkboardTeacher className="absolute left-2 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <select
                id="section"
                className="w-full px-2 py-2 pl-8 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-md"
                onChange={handleSectionChange}
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
              <FaBook className="absolute left-2 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <select
                id="subject"
                className="w-full px-2 py-2 pl-8 border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-md"
                onChange={handleSubjectChange}
              >
                <option value="">Subject</option>
                {uniqueSubjects.map((subjectOption, index) => (
                  <option key={index} value={subjectOption}>{subjectOption}</option>
                ))}
              </select>
            </motion.div>
          </div>
        </motion.div>
      );
}

export default Selection