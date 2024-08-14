import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../../../Context/AuthContext";

function Selection({ setClass, setSection, setSubject }) {
    const { authState } = useContext(AuthContext);
    const co_ordinator_wing = authState.userDetails.co_ordinator_wing;
    const wingClasses = wingMap[co_ordinator_wing] || [];

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

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

    const uniqueClasses = Array.from(new Set(authState.subject.map(subj => subj.class)));

    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);
    useEffect(() => {
        setUniqueSections(Array.from(new Set(
            authState.subject
                .filter(subj => subj.class === selectedClass)
                .map(subj => subj.section)
        )));
    }, [selectedClass]);


    useEffect(() => {
        setUniqueSubjects(Array.from(new Set(
            authState.subject
                .filter(subj => subj.section === selectedSection && subj.class === selectedClass)
                .map(subj => subj.subject)
        )));
    }, [selectedSection, selectedClass]);



    return (
        <div className="container p-3 w-fit mobile:max-tablet:w-full mobile:max-tablet:p-0">

            <div className="flex justify-between gap-3 mobile:max-tablet:flex-col mobile:max-tablet:w-full">
                <div className="w-36 mobile:max-tablet:w-full">
                <select id="class" className="w-full px-2 py-2 border rounded-md" value={selectedClass} onChange={handleClassChange}>
                        <option value="">Select Class</option>
                        {wingClasses.map((classOption, index) => (
                            <option key={index} value={classOption}>{classOption}</option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select id="section" className="w-full px-2 py-2 border rounded-md" onChange={handleSectionChange}>
                        <option value="">Select Section</option>
                        {uniqueSections.map((sectionOption, index) => (
                            <option key={index} value={sectionOption}>{sectionOption}</option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select id="subject" className="w-full px-2 py-2 border rounded-md" onChange={handleSubjectChange}>
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
const wingMap = {
    'Pre- Nursery-U.K.G': ['Pre-Nursery', 'L.K.G', 'U.K.G'],
    '1st-2nd': ['1st', '2nd'],
    '3rd-5th': ['3rd', '4th', '5th'],
    '6th-8th': ['6th', '7th', '8th'],
    '9th-12th': ['9th', '10th', '11th', '12th'],
}
export default Selection