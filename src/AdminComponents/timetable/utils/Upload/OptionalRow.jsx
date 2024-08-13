import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import axios from "axios";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Login, BASE_URL_TimeTable } from "../../../../Config";

export default function OptionalRow({
    lectureNo,
    data,
    optionalRows,
    addNewRow,
    handleOptionalRowChange,
    subjects,
    day,
    idx
}) {
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const [teacherInput, setTeacherInput] = useState('');
    const [remark, setRemark] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { authState } = useContext(AuthContext);
    const [temp, setTemp] = useState();

    useEffect(() => {
        const handler = setTimeout(async () => {
            setTemp(teacherInput);

        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [teacherInput]);

    useEffect(() => {
        if (temp) {
            searchTeacher(teacherInput);
            setShowSuggestions(true);
        }
    }, [temp, authState.accessToken]);

    useEffect(() => {
        if (data.teacher != '') {
            fetchRemark(lectureNo, data.teacher, day);

        }
    }, [day])

    const searchTeacher = useCallback(async (searchString) => {
        if (!searchString) return [];
        try {
            const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
                accessToken: authState.accessToken,
                searchString,
                start: 0,
                end: 30,
            });
            setSuggestions(response.data.Teachers.map((teacher) => ({
                name: teacher.name,
                profileLink: teacher.profileLink,
                email: teacher.email,
            })));
        } catch (error) {
            console.error("Error searching for teachers:", error);
            return [];
        }
    }, [authState.accessToken]);

    const handleSuggestionClick = (suggestion) => {
        console.log(suggestion);

        handleOptionalRowChange(idx, 'teacher', suggestion.email);
        fetchRemark(lectureNo, suggestion.email, day,);
        setTemp('');
        setShowSuggestions(false);
        setTeacherInput(suggestion.name);
    };

    const fetchRemark = async (lecture, email, day) => {

        try {
            const config = {
                method: 'get',
                url: `${BASE_URL_TimeTable}/timetable/fetch/checkAvailability`,
                params: { lecture, day, email },
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`,
                    'Content-Type': 'application/json',
                }
            };

            const response = await axios(config);
            setRemark(response.data.remark);
        } catch (error) {
            console.error('Error fetching availability:', error);
            setRowState(prev => ({ ...prev, remark: "Error checking availability" }));
        }
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target) && suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickInside = () => {
        console.log("Clicked inside the input field");
        // Execute your function for inside click here
        setShowSuggestions(true);
    };


    return (
        <tr key={idx} className="bg-white border-b border-gray-300">
            <td className="text-center py-2"></td>
            <td className="text-center py-2">
                {idx === optionalRows.length - 1 && (
                    <div
                        className='px-3 bg-green-300 hover:bg-green-400 w-fit rounded-lg cursor-pointer'
                        onClick={addNewRow}
                    >
                        Add
                    </div>
                )}
            </td>
            <td className="text-center py-2">
                <select
                    className="w-full"
                    name="Subject"
                    value={data.subject}
                    onChange={(e) => handleOptionalRowChange(idx, 'subject', e.target.value)}
                    required
                >
                    <option value="" disabled>Select a subject</option>
                    {subjects.map((subject, subIdx) => (
                        <option key={subIdx} value={subject}>{subject}</option>
                    ))}
                </select>
            </td>

            <td className="flex justify-center py-2">
                <select
                    className="w-full px-4 py-2 border rounded-md"
                    value={data.section}
                    onChange={(e) => handleOptionalRowChange(idx, 'section', e.target.value)}
                >
                    <option value="">Select Section</option>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(section => (
                        <option key={section} value={section}>{section}</option>
                    ))}
                </select>
            </td>

            <td className="relative py-2">
                <input
                    type="text"
                    ref={inputRef}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    value={teacherInput}
                    onClick={handleClickInside}
                    onChange={(e) => setTeacherInput(e.target.value)}
                    required
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto w-full" ref={suggestionsRef}>
                        {suggestions.map((suggestion, indx) => (
                            <li
                                key={indx}
                                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <img
                                    src={suggestion.profileLink}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full mr-2"
                                />
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </td>
            <td className="text-justify py-2 ">{remark}</td>
        </tr>
    );
}