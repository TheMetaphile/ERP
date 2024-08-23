import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import axios from "axios";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Login, BASE_URL_TimeTable } from "../../../../Config";
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function OptionalRow({
    lectureNo,
    data,
    optionalRows,
    addNewRow,
    RemoveNewRow,
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
        <motion.tr
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-b border-purple-200 hover:bg-purple-50 transition-colors duration-200"
        >
            <td className="text-center py-3"></td>
            <td className="text-center py-3">
                <div className="flex items-center justify-center gap-2">
                    {idx === optionalRows.length - 1 && (
                        <>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-green-400 hover:bg-green-500 text-white rounded-md flex items-center gap-1 transition-colors duration-200"
                                onClick={addNewRow}
                            >
                                <FaPlus size={12} />
                                Add
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-red-400 hover:bg-red-500 text-white rounded-md flex items-center gap-1 transition-colors duration-200"
                                onClick={RemoveNewRow}
                            >
                                <FaMinus size={12} />
                                Remove
                            </motion.button>
                        </>
                    )}
                </div>
            </td>
            <td className="text-center py-3">
                <select
                    className="w-full bg-purple-50 border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
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
            <td className="py-3">
                <select
                    className="w-full bg-purple-50 border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                    value={data.section}
                    onChange={(e) => handleOptionalRowChange(idx, 'section', e.target.value)}
                >
                    <option value="">Select Section</option>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(section => (
                        <option key={section} value={section}>{section}</option>
                    ))}
                </select>
            </td>
            <td className="relative py-3">
                <input
                    type="text"
                    ref={inputRef}
                    className="w-full bg-purple-50 border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                    value={teacherInput}
                    onClick={handleClickInside}
                    onChange={(e) => setTeacherInput(e.target.value)}
                    required
                />
                {showSuggestions && suggestions.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 bg-white border border-purple-200 rounded-md mt-1 max-h-40 overflow-y-auto w-full shadow-lg"
                        ref={suggestionsRef}
                    >
                        {suggestions.map((suggestion, indx) => (
                            <motion.li
                                key={indx}
                                whileHover={{ backgroundColor: '#F3E8FF' }}
                                className="flex items-center p-2 cursor-pointer transition-colors duration-200"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <img
                                    src={suggestion.profileLink}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full mr-2"
                                />
                                <span className="text-purple-800">{suggestion.name}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </td>
            <td className={`text-center py-3 ${remark.includes("Good") ? "text-green-600" : "text-red-600"}`}>
                {remark}
            </td>
        </motion.tr>
    );
}