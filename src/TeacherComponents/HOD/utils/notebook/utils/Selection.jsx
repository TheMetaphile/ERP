import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../../../Context/AuthContext";
import { BASE_URL } from "../../../../../Config";
import axios from "axios";
import { Rect } from "face-api.js";

function Selection({ setClass, setSection, setSubject }) {
    const { authState, darkMode } = useContext(AuthContext);
    const co_ordinator_wing = authState?.userDetails?.co_ordinator_wing;
    const wingClasses = wingMap[co_ordinator_wing] || [];

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const streams = ['PCM', 'PCMB', "PCB", 'Commerce', 'Arts', 'General'];
    const [selectedStream, setSelectedStream] = useState('');
    const [subjects, setAllSubjects] = useState([]);

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

    const handleStreamChange = (event) => {
        setSelectedStream(event.target.value)
    }

    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSubjects, setUniqueSubjects] = useState([]);
    useEffect(() => {
        if (selectedClass) {
            fetchSections();
        }
    }, [selectedClass]);

    useEffect(() => {
        if (selectedClass && selectedStream) {
            fetchSubjects();
        }
    }, [selectedSection, selectedStream]);

    const fetchSections = async () => {
        let data = JSON.stringify({
            "accessToken": authState?.accessToken,
            "class": selectedClass
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/classTeacher/fetch/sections`,
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
        try {
            // In a real application, you would add your API base URL
            const response = await axios.post(`${BASE_URL}/subjects/fetch`, {
                Class: selectedClass,
                stream: selectedStream
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });

            console.log(response.data)
            const data = response.data;

            setAllSubjects([
                ...(data?.coreSubjects || []).map(s =>
                    typeof s === 'string' ? { subject: s } : s
                ),
                ...(data?.optionalSubjects || []).map(s =>
                    typeof s === 'string' ? { subject: s } : s
                ),
            ]);
        } catch (error) {
            toast.error({ text: 'Error connecting to server', type: 'error' });
        }
    };



    return (
        <div className={`container p-3 w-fit mobile:max-tablet:w-full mobile:max-tablet:p-0 
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <div className="flex justify-between gap-3 mobile:max-tablet:flex-col mobile:max-tablet:w-full">
                <div className="w-36 mobile:max-tablet:w-full">
                    <select
                        id="class"
                        className={`w-full px-2 py-2 border-2 focus:outline-none focus:ring-2 focus:border-transparent rounded-md 
                        ${darkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                                : 'border-blue-300 focus:ring-blue-500'}`}
                        value={selectedClass}
                        onChange={handleClassChange}
                    >
                        <option value="">Select Class</option>
                        {wingClasses.map((classOption, index) => (
                            <option
                                key={index}
                                value={classOption}
                                className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
                            >
                                {classOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select
                        id="stream"
                        className={`w-full px-2 py-2 border-2 focus:outline-none focus:ring-2 focus:border-transparent rounded-md 
                        ${darkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                                : 'border-blue-300 focus:ring-blue-500'}`}
                        value={selectedStream}
                        onChange={handleStreamChange}
                    >
                        <option value="">Select Stream</option>
                        {streams.map((stream) => (
                            <option
                                key={stream}
                                value={stream}
                                className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
                            >
                                {stream}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select
                        id="section"
                        className={`w-full px-2 py-2 border-2 focus:outline-none focus:ring-2 focus:border-transparent rounded-md 
                        ${darkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                                : 'border-blue-300 focus:ring-blue-500'}`}
                        onChange={handleSectionChange}
                    >
                        <option value="">Select Section</option>
                        {uniqueSections.map((sectionOption, index) => (
                            <option
                                key={index}
                                value={sectionOption}
                                className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
                            >
                                {sectionOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-36 mobile:max-tablet:w-full">
                    <select
                        id="subject"
                        className={`w-full px-2 py-2 border-2 focus:outline-none focus:ring-2 focus:border-transparent rounded-md 
                        ${darkMode
                                ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                                : 'border-blue-300 focus:ring-blue-500'}`}
                        onChange={handleSubjectChange}
                    >
                        <option value="">Select Subject</option>
                        {subjects.map((subjectOption, index) => (
                            <option
                                key={index}
                                value={subjectOption.subject}
                                className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
                            >
                                {subjectOption.subject}
                            </option>
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
export default React.memo(Selection)