import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL_Login } from '../../../Config';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

function SelectionTeacher({ onSearch, onEmailChange, onNameChange, onDayChange }) {
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
        console.log("suggestion:", suggestion);
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
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border rounded-lg shadow-lg w-full flex  p-4 bg-purple-50"
      >
        <div className="container">
          <div className="flex items-center md:flex-row justify-between gap-6">
            <motion.div
              className="w-full "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <FaSearch className="absolute top-3 left-3 text-purple-400" />
                <input
                  type="email"
                  ref={inputRef}
                  className="w-full px-10 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  placeholder="Search by Teacher's name, employee ID or email"
                  list={`teacher-suggestions`}
                  onClick={handleClickInside}
                  value={email}
                  onChange={handleEmailChange}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-10 w-full bg-white border-2 border-purple-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg"
                    ref={suggestionsRef}
                  >
                    {suggestions.map((suggestion, idx) => (
                      <motion.li
                        key={idx}
                        whileHover={{ backgroundColor: '#F3E8FF' }}
                        className="flex items-center p-2 cursor-pointer transition-colors duration-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <img src={suggestion.profileLink} alt="Profile" className='w-8 h-8 rounded-full mr-3 border-2 border-purple-300' />
                        <span className="text-purple-700">{suggestion.email}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.div>
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <FaCalendarAlt className="absolute top-3 left-3 text-purple-400" />
                <select
                  className="w-full px-10 py-2 border-2 border-purple-300 rounded-md appearance-none focus:outline-none focus:border-purple-500 transition-colors duration-300"
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
}

export default SelectionTeacher;
