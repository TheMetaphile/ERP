import React, { useState, useContext } from "react";
import AuthContext from "../../../Context/AuthContext";

function Selection() {
    const { authState } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    }
    const handleSectionChange = (event) => {
        setSelectedSection(event.target.value);
    }
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    }

    const uniqueClasses = Array.from(new Set(authState.subject.map(subj => subj.class)));

    const uniqueSections = Array.from(new Set(authState.subject.map(subj => subj.section)));

    const uniqueSubjects = Array.from(new Set(authState.subject.map(subj => subj.subject)));


    return (
        <div className="border rounded-lg shadow-md w-full flex flex-col px-3 mobile:max-tablet:px-0  overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
            <div className="container p-3  ">

                <div className="flex justify-between">
                    <div className="w-1/4">
                        <select id="class" className="w-full px-4 py-2 border rounded-md" onChange={handleClassChange} >
                            <option value="">Search by Class</option>
                            {uniqueClasses.map((classOption, index) => (
                                <option key={index} value={classOption}>{classOption}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/4">
                        <select id="section" className="w-full px-4 py-2 border rounded-md" onChange={handleSectionChange}>
                            <option value="">Search by Section</option>
                            {uniqueSections.map((sectionOption, index) => (
                                <option key={index} value={sectionOption}>{sectionOption}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/4">
                        <select id="subject" className="w-full px-4 py-2 border rounded-md" onChange={handleSubjectChange}>
                            <option value="">Search by Subject</option>
                            {uniqueSubjects.map((subjectOption, index) => (
                                <option key={index} value={subjectOption}>{subjectOption}</option>
                            ))}
                        </select>
                    </div>

                    <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                        Search
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Selection