import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./../../../Context/AuthContext";
import { BASE_URL_ClassTeacher } from "../../../Config";
import axios from "axios";

function Selection({ setClass, setSection, setSubject }) {
    const { authState } = useContext(AuthContext);
    const wingClasses = [
        'Pre-Nursery', 'L.K.G', 'U.K.G',
        '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'
    ];

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);

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

    useEffect(() => {
        if (selectedClass) {
            fetchSections();
        }
    }, [selectedClass]);

    useEffect(() => {
        if(selectedClass && selectedSection){
            fetchSubjects();
        }
    }, [selectedSection, selectedClass]);

    const fetchSections = async () => {
        let data = JSON.stringify({
            "accessToken": authState.accessToken,
            "class": selectedClass
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL_ClassTeacher}/classTeacher/fetch/sections`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                setUniqueSections(response.data.sections.map(sectionObj => sectionObj.section));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const fetchSubjects = async () => {

        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_ClassTeacher}/fetch/subjects?section=${selectedSection}&class=${selectedClass}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setUniqueSubjects(response.data.subjects);
            })
            .catch((error) => {
                console.log(error);
            });

    }



    return (
        <div className="container p-3 w-fit mobile:max-tablet:w-full">

            <div className="flex justify-between gap-3 mobile:max-tablet:flex-col">
                <div className="w-36 mobile:max-tablet:w-full">
                    <select id="class" className="w-full px-2 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 rounded-md" value={selectedClass} onChange={handleClassChange}>
                        <option value="">Select Class</option>
                        {wingClasses.map((classOption, index) => (
                            <option key={index} value={classOption}>{classOption}</option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select id="section" className="w-full px-2 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 rounded-md" value={selectedSection} onChange={handleSectionChange}>
                        <option value="">Select Section</option>
                        {uniqueSections.map((sectionOption, index) => (
                            <option key={index} value={sectionOption}>{sectionOption}</option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select id="subject" className="w-full px-2 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 rounded-md" onChange={handleSubjectChange}>
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

export default Selection;
