import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";

export default function TimetableRow({ index, lectureNo, Time, numberOfLeacturesBeforeLunch, Subject, Teacher, handleSubjectChange, handleTeacherChange, subjects }) {
    const [teacherInput, setTeacher] = useState(Teacher);
    const [temp, setTemp] = useState(Teacher);
    const { authState } = useContext(AuthContext);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);


    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(teacherInput);
        }, 1000);

        return () => {
            clearTimeout(handler);
        }
    }, [teacherInput])

    useEffect(() => {
        if (temp) {
            const searchTeacher = async () => {
                try {
                    const response = await axios.post('https://loginapi-y0aa.onrender.com/search/teacher', {
                        accessToken: authState.accessToken,
                        searchString: temp,
                        start: 0,
                        end: 30
                    })
                    console.log(response.data)
                    const teacherNames = response.data.Teachers.map(teacher => ({
                        name: teacher.name,
                        profileLink: teacher.profileLink
                    }));
                    setSuggestions(teacherNames);

                }
                catch (error) {
                    console.error("Error searching for teachers:", error);
                }
            }
            searchTeacher();
        }
    }, [temp, authState.accessToken])

    const handleSuggestionClick = (suggestion) => {
        setTeacher(suggestion.name);
        setShowSuggestions(false);
    };

    const handleChange = (event) => {
        handleSubjectChange(index, event.target.value);
    };

    const handleTeacher = (event) => {
        setShowSuggestions(true);
        setTeacher(event.target.value);
        handleTeacherChange(index, event.target.value);
    };
    return (
        <div className="bg-white flex-1 w-full justify-between px-4 py-2 " key={index}>
            {numberOfLeacturesBeforeLunch === index ? (
                <div className="w-full h-8 bg-secondary text-xl text-center">LUNCH</div>
            ) : (
                <>
                </>
            )}
            <div className="flex w-full justify-between px-4 py-2">
                <h1 className="w-36">{lectureNo}</h1>
                <h1 className="w-36">{Time}</h1>
                <select className="w-36" value={Subject} onChange={handleChange}>
                    {subjects.map((subject, idx) => (
                        <option key={idx} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
                <div>
                    <input
                        type="text"
                        className="w-36 border"
                        list={`teacher-suggestions`}
                        value={teacherInput}
                        onChange={handleTeacher}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-10  bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                            {suggestions.map((suggestion, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}