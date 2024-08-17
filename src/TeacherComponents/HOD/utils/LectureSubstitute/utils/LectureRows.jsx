import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../../../Config";
import { FaTimes } from "react-icons/fa";
import { MdCheck, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

export default function LectureRow({ Teacher, date, index, session, data, substitutionDetail }) {
    const { authState } = useContext(AuthContext);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const [email, setEmail] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [temp, setTemp] = useState();
    const [originalSubstitute, setSubstitute] = useState(substitutionDetail);
    const [editingRow, setEditingRow] = useState(originalSubstitute ? false : true);
    const [Remark, setRemark] = useState(originalSubstitute ? "Good to go" : 'Please search and select Teacher');

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setShowSuggestions(true);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target) && suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        console.log(originalSubstitute, "original")
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickInside = () => {
        console.log("Clicked inside the input field");
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion, lectureNo) => {
        fetchRemark(suggestion.email, lectureNo)
        setSubstitute(suggestion);
        setShowSuggestions(false);
    };

    const SubstituteTeacher = (classTeacherEmail, subject, lectureNo, classs, section) => {
        let data = JSON.stringify({
            "Class": classs,
            "section": section,
            "LectureTeacherEmail": Teacher.email,
            "substituteEmail": classTeacherEmail.email,
            "date": date,
            "session": session,
            "subject": subject,
            "lecture": lectureNo
        });

        console.log(data);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/LectureSubstitute/create`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authState.accessToken}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("here")
                console.log(JSON.stringify(response.data));
                toast.success("Lecture Teacher substituted successfully");
                setSubstitute(classTeacherEmail);
                handleSendNotice(Teacher.email, classTeacherEmail.email, classs, section, subject, lectureNo);
                setEditingRow(false);
            })
            .catch((error) => {
                console.log(error.response.data.error, "...............................error");
                toast.error(error.response.data.error);
            });
    }

    const handleSendNotice = async (currentTeacher, SubstituteEmail, classs, sectionn, subject, lecture) => {
        console.log('in send notice')
        const payload = {
            title: 'Substitute Subject Teacher',
            type: 'Particular Teachers',
            description: `You have be assigned class ${classs} ${sectionn} as a substitute subject teacher for today for subject ${subject} and it's lecture no. is ${lecture}`,
            session: session,
            date: date,
            emailIds: SubstituteEmail
        };

        console.log('payload', payload);

        try {
            const response = await axios.post(`${BASE_URL_Login}/notice/upload/teacher`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Notice send to substitute teacher');
                console.log('fetch', response.data);
            }
        } catch (error) {
            toast.error(error.message);
            console.error("Error in posting notice:", error);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(email);
        }, 500);

        return () => {
            clearTimeout(handler);
        }
    }, [email])

    useEffect(() => {
        if (temp) {
            const searchTeacher = async () => {
                try {
                    const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
                        accessToken: authState.accessToken,
                        searchString: temp,
                        start: 0,
                        end: 30
                    })
                    console.log(response.data)
                    const teacherEmails = response.data.Teachers.map(teacher => ({
                        email: teacher.email,
                        profileLink: teacher.profileLink,
                        employeeId: teacher.employeeId,
                        name: teacher.name,
                    }));
                    setSuggestions(teacherEmails);
                }
                catch (error) {
                    console.error("Error searching for teachers:", error);
                }
            }
            searchTeacher();
        }
    }, [temp, authState.accessToken]);

    const handleUpdateClick = () => {
        setSubstitute();
        setEditingRow(true);
    }

    const handleConfirmClick = () => {
        SubstituteTeacher(originalSubstitute, data.subject, data.lectureNo, data.class, data.section);
    }

    const handleCancelClick = () => {
        setSubstitute(substitutionDetail)
        setEditingRow(substitutionDetail ? false : true);
    }

    const fetchRemark = (email, lecture) => {
        const day = days[new Date(date).getDay()];
        console.log(day);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/timetable/fetch/checkAvailability?lecture=${lecture}&day=${day}&email=${email}`,
            headers: {
                'Authorization': `Bearer ${authState.accessToken}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                setRemark(response.data.remark);
            })
            .catch((error) => {
                toast.error(error.response.data.error);
                setRemark(error.response.data.error);
            });
    }

    return (
        <tr key={index} className="border-b border-gray-200 last:border-none">

            <td className="py-1 px-3 text-center whitespace-nowrap">{data.lectureNo}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{date}</td>
            <td className="py-1 px-3 text-center whitespace-nowrap">{data.class}</td>
            <td className="flex py-3 px-6 items-center gap-2 text-center w-60">
                <div className="flex justify-start gap-2 items-center">
                    <img src={Teacher.profileLink} alt="img" className="rounded-full h-12 w-12" />
                    <div className="text-start ml-2">
                        <p>{Teacher.name}</p>
                        {Teacher.employeeId}
                    </div>
                </div>
            </td>

            <td className="py-1 px-3 text-center whitespace-nowrap">{data.section}</td>
            <td className="py-1 px-3 text-center whitespace-nowrap">{data.subject}</td>
            <td className="py-3 px-6 text-center items-center  w-60">
                {originalSubstitute ? (
                    <div className="flex justify-start gap-2 items-center">
                        <img src={originalSubstitute.profileLink} alt="img" className="rounded-full h-12 w-12" />
                        <div className="text-start ml-2">
                            <p>{originalSubstitute.name}</p>
                            {originalSubstitute.employeeId}
                        </div>
                    </div>
                ) : editingRow ? (
                    <div className="relative">
                        <input
                            type="email"
                            ref={inputRef}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Search Teacher"
                            onClick={handleClickInside}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto" ref={suggestionsRef}>
                                {suggestions.map((suggestion, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion, data.lectureNo)}
                                    >
                                        <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <>N/A</>
                )}
            </td>
            <td className={`py-1 px-3 text-center w-60 ${Remark === 'Good to go' ? "text-green-500" : "text-red-500"} whitespace-normal break-words`}>{Remark}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">
                {editingRow ? (
                    <div className='flex gap-1 justify-center'>
                        <button
                            className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                            onClick={handleConfirmClick}
                        >
                            <MdCheck />
                        </button>
                        <button
                            className='bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                            onClick={handleCancelClick}
                        >
                            <FaTimes />
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center gap-1">
                        <button
                            className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'
                            onClick={handleUpdateClick}
                        >
                            <MdEdit />
                        </button>
                    </div>
                )}
            </td>
        </tr>
    )

}

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
