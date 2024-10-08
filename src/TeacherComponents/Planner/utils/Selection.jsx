import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";

function Selection({ setClass, setSection, setSubject }) {
    const { authState } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState(authState.subject ? authState.subject[0].class : "");
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

    const uniqueClasses = Array.from(new Set(authState.subject ? authState.subject.map(subj => subj.class) : []));

    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);
    useEffect(() => {
        setUniqueSections(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.class === selectedClass)
                .map(subj => subj.section)
                : []
        )));
    }, [selectedClass]);


    useEffect(() => {
        setUniqueSubjects(Array.from(new Set(
            authState.subject ? authState.subject
                .filter(subj => subj.section === selectedSection && subj.class === selectedClass)
                .map(subj => subj.subject) : []
        )));
    }, [selectedSection, selectedClass]);



    return (
        <div className="container p-3 w-fit mobile:max-tablet:w-full  ">

            <div className="flex justify-between w-full gap-3 mobile:max-tablet:flex-col">
                <div className="w-36 mobile:max-tablet:w-full">
                    <select id="class" className="w-full px-2 py-2  border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleClassChange} >
                        <option value="">Select Class</option>
                        {uniqueClasses.map((classOption, index) => (
                            <option key={index} value={classOption}>{classOption}</option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select id="section" className="w-full px-2 py-2  border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleSectionChange}>
                        <option value="">Select Section</option>
                        {uniqueSections.map((sectionOption, index) => (
                            <option key={index} value={sectionOption}>{sectionOption}</option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select id="subject" className="w-full px-2 py-2  border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleSubjectChange}>
                        <option value="">Select Subject</option>
                        {uniqueSubjects.map((subjectOption, index) => (
                            <option key={index} value={subjectOption}>{subjectOption}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Selection