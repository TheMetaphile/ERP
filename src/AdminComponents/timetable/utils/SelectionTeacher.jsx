import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL_Login } from '../../../Config';

function SelectionTeacher({ onSearch, onEmailChange,onNameChange, onDayChange }) {
    const { authState } = useContext(AuthContext);
    const [temp, setTemp] = useState();
    const [email, setEmail] = useState('');
    const [day, setDay] = useState('tuesday');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target) && suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
          setShowSuggestions(false);
        }
      };
      const handleClickInside = () => {
        console.log("Clicked inside the input field");
        // Execute your function for inside click here
        setShowSuggestions(true);
      };
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        onEmailChange(value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        console.log("suggestion:" ,suggestion);
        setEmail(suggestion.email);
        onEmailChange(suggestion.email);
        setShowSuggestions(false);
        onNameChange(suggestion);
    };

    const handleDayChange = (event) => {
        const value = event.target.value;
        setDay(value);
        onDayChange(value);
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
    }, [temp, authState.accessToken])

    return (
        <div className="border rounded-lg shadow-md w-full flex flex-col px-3 mobile:max-tablet:px-0 overflow-y-auto items-start mt-2 mb-3 no-scrollbar">
            <div className="container p-3">
                <div className="flex justify-between">

                    <div className="w-96">
                        <input
                            type="email"
                            ref={inputRef}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Search by Teacher's name, employee id or email"
                            list={`teacher-suggestions`}
                            onClick={handleClickInside}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-72 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto" ref={suggestionsRef}>
                                {suggestions.map((suggestion, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <img src={suggestion.profileLink} alt="Profile" className='w-6 h-6 rounded-full mr-2' />
                                        {suggestion.email}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="w-1/4">
                        <select
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Day"
                            value={day}
                            onChange={handleDayChange}
                        >
                            <option value="">Select Day</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>

                        </select>
                    </div>
                    {/* <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={onSearch}>
                        Search
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default SelectionTeacher;
