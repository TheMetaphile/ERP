import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";

export default function TimetableRow({ index, lectureNo, Time, Subject, Teacher, handleSubjectChange, handleTeacherChange, subjects, lunch }) {
    const [teacherInput, setTeacher] = useState(Teacher);
    const [temp, setTemp] = useState(Teacher);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(teacherInput);
        }, 10000);

        return () => {
            clearTimeout(handler);
        }
    }, [teacherInput])

    useEffect(() => {
        if (temp) {
            const searchTeacher = async () => {
                try {
                    const resposne = await axios.post('https://loginapi-y0aa.onrender.com/search/teacher', {
                        accessToken: authState.accessToken,
                        searchString: temp,
                        start: 1,
                        end: 30
                    })
                    console.log(resposne.data)
                }
                catch (error) {
                    console.error("Error searching for teachers:", error);
                }
            }
            searchTeacher();
        }
    }, [temp])

    const handleChange = (event) => {
        handleSubjectChange(index, event.target.value);
    };

    const handleTeacher = (event) => {
        setTeacher(event.target.value);
        handleTeacherChange(index, event.target.value);
    };
    return (
        <div className="bg-white flex w-full justify-between px-4 py-2 " key={index}>
            {lunch ? (
                <div className="w-36 bg-red-300"></div>
            ) : (
                <>
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
                        value={teacherInput}
                        onChange={handleTeacher}
                    />
                </>
            )}
        </div>
    )
}