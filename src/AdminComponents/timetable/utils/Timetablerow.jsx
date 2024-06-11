import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";

export default function TimetableRow({ index, lectureNo, Time, numberOfLeacturesBeforeLunch, Subject, Teacher, handleSubjectChange, handleTeacherChange, subjects }) {
    const [teacherInput, setTeacher] = useState(Teacher);
    const [temp, setTemp] = useState(Teacher);
    const { authState } = useContext(AuthContext);
    const [suggestions, setSuggestions] = useState([]);

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
                    const teacherNames = response.data.Teachers.map(teacher => teacher.name);
                    setSuggestions(teacherNames);
                    console.log(suggestions)

                }
                catch (error) {
                    console.error("Error searching for teachers:", error);
                }
            }
            searchTeacher();
        }
    }, [temp, authState.accessToken])

    const handleChange = (event) => {
        handleSubjectChange(index, event.target.value);
    };

    const handleTeacher = (event) => {
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
                <input
                    type="text"
                    className="w-36 border"
                    list={`teacher-suggestions-${index}`}
                    value={teacherInput}
                    onChange={handleTeacher}
                />
                <datalist id={`teacher-suggestions-${index}`}>
                    {suggestions.map((suggestion, idx) => (
                        <option key={idx} value={suggestion} />
                    ))}
                </datalist>
            </div>
        </div>
    )
}