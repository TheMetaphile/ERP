import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import axios from "axios";
import {
  FaBook,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL } from "../../../../Config";
import { motion } from "framer-motion";

// Remark Tooltip Component
const RemarkTooltip = ({ children, message, isDarkMode }) => (
  <div className="group relative inline-block">
    {children}
    {message && (
      <div className={`
        absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 
        mb-2 px-3 py-2 text-xs rounded-md opacity-0 group-hover:opacity-100 
        transition-opacity duration-300
        ${isDarkMode
          ? 'bg-gray-700 text-white border border-gray-600'
          : 'bg-gray-800 text-white'}
      `}>
        {message}
      </div>
    )}
  </div>
);

export default function TimetableRow({
  lectureStructure = [],
  schedule = [],
  handleSchedule,
  subjects = [],
  sections = [],
  selectedSection,
  numberOfLeacturesBeforeLunch,
  day,
  rowStateWeek,
  fetchTeacherAvailability
}) {
  const { darkMode, authState } = useContext(AuthContext);
  const suggestionsRef = useRef(null);

  // Initialize row state for each lecture
  const [rowState, setRowState] = useState(() =>
    lectureStructure.reduce((acc, lecture) => ({
      ...acc,
      [lecture.lectureNo]: {
        teacherInput: "",
        suggestions: [],
        showSuggestions: false,
        remark: "",
      }
    }), {})
  );

  useEffect(() => {
    if (rowStateWeek) {
      setRowState(rowStateWeek);
    }
  }, [rowStateWeek])
  // Search Teachers Function
  const searchTeachers = useCallback(async (searchText) => {
    if (!searchText) return [];

    try {
      const response = await axios.post(`${BASE_URL}/search/teacher`, {
        accessToken: authState.accessToken,
        searchString: searchText,
        start: 0,
        end: 30,
      });

      return response.data.Teachers.map(teacher => ({
        id: teacher._id,
        name: teacher.name,
        profileLink: teacher.profileLink,
        email: teacher.email,
        employmentNumber: teacher.employmentNumber,
      }));
    } catch (error) {
      console.error("Teacher search error:", error);
      return [];
    }
  }, [authState.accessToken]);

  // Handle Teacher Selection
  const selectTeacher = async (lectureNo, teacher) => {
    try {
      const remark = await fetchTeacherAvailability(lectureNo, teacher.id,day);

      setRowState(prev => ({
        ...prev,
        [lectureNo]: {
          ...prev[lectureNo],
          teacherInput: teacher.name,
          showSuggestions: false,
          remark,
        }
      }));

      // Update schedule
      handleSchedule(prev => {
        const daySchedule = prev[day] || [];
        return {
          ...prev,
          [day]: daySchedule.map(lec =>
            lec.lectureNo === lectureNo
              ? { ...lec, teacher: teacher.id }
              : lec
          )
        };
      });
    } catch (error) {
      console.error("Teacher selection error:", error);
    }
  };

  // Fetch Teacher Availability


  console.log(rowState);
  // Debounced Teacher Search
  useEffect(() => {
    const searchTimer = setTimeout(async () => {

      for (let lecture of lectureStructure) {
        const { teacherInput, showSuggestions, suggestions } = rowState[lecture.lectureNo];
        if (teacherInput && teacherInput.trim() && showSuggestions && suggestions.length === 0) {

          const suggestions = await searchTeachers(teacherInput);

          setRowState(prev => ({
            ...prev,
            [lecture.lectureNo]: {
              ...prev[lecture.lectureNo],
              suggestions,
              showSuggestions: suggestions.length > 0
            }
          }));
        } else {
          console.log("Reset ", teacherInput);

          if (!teacherInput.trim()) {


            setRowState(prev => ({
              ...prev,
              [lecture.lectureNo]: {
                teacherInput: "",
                suggestions: [],
                showSuggestions: false,
                remark: "",
              }
            }));
          }
        }
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchTeachers]);

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setTimeout(() => {
        setRowState((prev) => {
          const newState = { ...prev };
          for (let key in newState) {
            newState[key].showSuggestions = false;
          }
          return newState;
        });
      }, 150);  // Delay to allow suggestion click to register
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={` border border-black/50
        ${darkMode
          ? 'bg-gray-800 hover:bg-gray-700'
          : 'bg-white hover:bg-purple-50'} 
        transition-colors duration-200
      `}
    >
      <td className={`px-3 flex flex-col gap-2  mt-3 justify-center font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} items-center capitalize`}>
        <FaCalendarAlt />

        {day.split("").map((letter, index) => (
          <div key={index}>{letter}</div> // Return each letter inside a <div>
        ))}

      </td>

      {lectureStructure.map((lecture, idx) => (

        numberOfLeacturesBeforeLunch && numberOfLeacturesBeforeLunch === idx + 1 ?
          <>
            <td
              ref={suggestionsRef}

              key={idx}
              className={`p-3 border border-black/50 ${rowState[lecture.lectureNo]?.remark === 'Good to go'
                ? (darkMode ? 'bg-green-900/30' : 'bg-green-100')
                : (darkMode ? 'bg-red-900/30' : '')
                }`}
            >
              <RemarkTooltip
                message={rowState[lecture.lectureNo]?.remark || ''}
              >
                <div className="flex flex-col space-y-4">
                  {/* Subject Selector */}

                  <div className=" gap-4">
                    <div>
                      <label
                        className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Subject
                      </label>
                      <div className="relative">
                        <FaBook className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-purple-500'}`} />
                        <select
                          className={`
                    w-fit pl-10 rounded-md px-3 py-2 border
                    ${darkMode
                              ? 'bg-gray-900 text-gray-200 border-gray-700'
                              : 'bg-purple-50 text-purple-900 border-purple-300'}
                    focus:outline-none focus:ring-2
                  `}
                          value={schedule[lecture.lectureNo - 1]?.subject || ""}
                          onChange={(e) => {
                            handleSchedule(prev => {
                              const daySchedule = prev[day] || [];
                              return {
                                ...prev,
                                [day]: daySchedule.map(lec =>
                                  lec.lectureNo === lecture.lectureNo
                                    ? { ...lec, subject: e.target.value }
                                    : lec
                                )
                              };
                            });
                          }}
                          required
                        >
                          <option value="">Select Subject</option>
                          {subjects.map((subject, i) => (
                            <option key={i} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                    </div>


                    {/* Section Merger */}
                    <div>
                      <label
                        className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Merge with Section
                      </label>
                      <select
                        className={`
                 rounded-md px-3 py-2 border
                  ${darkMode
                            ? 'bg-gray-900 text-gray-200 border-gray-700'
                            : 'bg-purple-50 text-purple-900 border-purple-300'}
                  focus:outline-none focus:ring-2
                `}
                        value={schedule[lecture.lectureNo - 1]?.mergeWithSection || ""}
                        onChange={(e) => {
                          handleSchedule(prev => {
                            const daySchedule = prev[day] || [];
                            return {
                              ...prev,
                              [day]: daySchedule.map(lec =>
                                lec.lectureNo === lecture.lectureNo
                                  ? { ...lec, mergeWithSection: e.target.value, merge: e.target.value != "" }
                                  : lec
                              )
                            };
                          });
                        }}
                      >
                        <option value="">Select Section to Merge</option>
                        {sections.filter(sec => sec !== selectedSection).map((section, i) => (
                          <option key={i} value={section}>{section}</option>
                        ))}
                      </select>
                    </div>

                  </div>


                  <div className="flex gap-4 items-end" >

                    {/* Teacher Search */}
                    <div>
                      <label
                        className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Teacher
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search Teacher"
                          value={rowState[lecture.lectureNo]?.teacherInput || ''}
                          onChange={(e) => {
                            setRowState(prev => ({
                              ...prev,
                              [lecture.lectureNo]: {
                                ...prev[lecture.lectureNo],
                                teacherInput: e.target.value,
                                showSuggestions: true
                              }
                            }));
                          }}
                          required
                          className={`
                    w-full rounded-md px-3 py-2 border
                    ${darkMode
                              ? 'bg-gray-900 text-gray-200 border-gray-700'
                              : 'bg-white text-purple-900 border-purple-300'}
                    focus:outline-none focus:ring-2
                  `}
                        />
                        {rowState[lecture.lectureNo]?.showSuggestions && (
                          <div
                            className={`
                      absolute z-10 w-full mt-1 max-h-40 overflow-y-auto rounded-md
                      ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'}
                      shadow-lg
                    `}
                          >
                            {rowState[lecture.lectureNo].suggestions.map((teacher, index) => (
                              <div
                                key={index}
                                onClick={() => selectTeacher(lecture.lectureNo, teacher)}
                                className={`
                          flex items-center p-2 cursor-pointer 
                          ${darkMode
                                    ? 'hover:bg-gray-600'
                                    : 'hover:bg-purple-100'}
                        `}
                              >
                                <img
                                  src={teacher.profileLink}
                                  alt={teacher.name}
                                  className="w-8 h-8 rounded-full mr-2"
                                />
                                <div>
                                  <div>{teacher.name}</div>
                                  <small>{teacher.employmentNumber}</small>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>



                    {/* Availability Status */}
                    <div className="flex items-center justify-center mb-3">

                      {rowState[lecture.lectureNo]?.remark === 'Good to go' ? (
                        <FaCheckCircle className={`text-xl ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                      ) : (
                        <FaTimesCircle className={`text-xl ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                      )}
                    </div>
                  </div>
                </div>
              </RemarkTooltip>

            </td>
            <td

              key={'l'}
              className={`p-3 border border-black/50 bg-yellow-900/30 `}
            >

            </td>
          </>
          :
          <td
            ref={suggestionsRef}

            key={idx}
            className={`p-3 border border-black/50 ${rowState[lecture.lectureNo]?.remark === 'Good to go'
              ? (darkMode ? 'bg-green-900/30' : 'bg-green-100')
              : (darkMode ? 'bg-red-900/30' : '')
              }`}
          >
            <RemarkTooltip
              message={rowState[lecture.lectureNo]?.remark || ''}
            >
              <div className="flex flex-col space-y-4">
                {/* Subject Selector */}

                <div className=" gap-4">
                  <div>
                    <label
                      className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <FaBook className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-purple-500'}`} />
                      <select
                        className={`
                      w-fit pl-10 rounded-md px-3 py-2 border
                      ${darkMode
                            ? 'bg-gray-900 text-gray-200 border-gray-700'
                            : 'bg-purple-50 text-purple-900 border-purple-300'}
                      focus:outline-none focus:ring-2
                    `}
                        value={schedule[lecture.lectureNo - 1]?.subject || ""}
                        onChange={(e) => {
                          handleSchedule(prev => {
                            const daySchedule = prev[day] || [];
                            return {
                              ...prev,
                              [day]: daySchedule.map(lec =>
                                lec.lectureNo === lecture.lectureNo
                                  ? { ...lec, subject: e.target.value }
                                  : lec
                              )
                            };
                          });
                        }}
                        required
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((subject, i) => (
                          <option key={i} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>


                  {/* Section Merger */}
                  <div>
                    <label
                      className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Merge with Section
                    </label>
                    <select
                      className={`
                   rounded-md px-3 py-2 border
                    ${darkMode
                          ? 'bg-gray-900 text-gray-200 border-gray-700'
                          : 'bg-purple-50 text-purple-900 border-purple-300'}
                    focus:outline-none focus:ring-2
                  `}
                      value={schedule[lecture.lectureNo - 1]?.mergeWithSection || ""}
                      onChange={(e) => {
                        handleSchedule(prev => {
                          const daySchedule = prev[day] || [];
                          return {
                            ...prev,
                            [day]: daySchedule.map(lec =>
                              lec.lectureNo === lecture.lectureNo
                                ? { ...lec, mergeWithSection: e.target.value, merge: e.target.value != "" }
                                : lec
                            )
                          };
                        });
                      }}
                    >
                      <option value="">Select Section to Merge</option>
                      {sections.filter(sec => sec !== selectedSection).map((section, i) => (
                        <option key={i} value={section}>{section}</option>
                      ))}
                    </select>
                  </div>

                </div>


                <div className="flex gap-4 items-end" >

                  {/* Teacher Search */}
                  <div>
                    <label
                      className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Teacher
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search Teacher"
                        value={rowState[lecture.lectureNo]?.teacherInput || ''}
                        onChange={(e) => {
                          setRowState(prev => ({
                            ...prev,
                            [lecture.lectureNo]: {
                              ...prev[lecture.lectureNo],
                              teacherInput: e.target.value,
                              showSuggestions: true
                            }
                          }));
                        }}
                        required
                        className={`
                      w-full rounded-md px-3 py-2 border
                      ${darkMode
                            ? 'bg-gray-900 text-gray-200 border-gray-700'
                            : 'bg-white text-purple-900 border-purple-300'}
                      focus:outline-none focus:ring-2
                    `}
                      />
                      {rowState[lecture.lectureNo]?.showSuggestions && (
                        <div
                          className={`
                        absolute z-10 w-full mt-1 max-h-40 overflow-y-auto rounded-md
                        ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'}
                        shadow-lg
                      `}
                        >
                          {rowState[lecture.lectureNo].suggestions.map((teacher, index) => (
                            <div
                              key={index}
                              onClick={() => selectTeacher(lecture.lectureNo, teacher)}
                              className={`
                            flex items-center p-2 cursor-pointer 
                            ${darkMode
                                  ? 'hover:bg-gray-600'
                                  : 'hover:bg-purple-100'}
                          `}
                            >
                              <img
                                src={teacher.profileLink}
                                alt={teacher.name}
                                className="w-8 h-8 rounded-full mr-2"
                              />
                              <div>
                                <div>{teacher.name}</div>
                                <small>{teacher.employmentNumber}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>



                  {/* Availability Status */}
                  <div className="flex items-center justify-center mb-3">

                    {rowState[lecture.lectureNo]?.remark === 'Good to go' ? (
                      <FaCheckCircle className={`text-xl ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    ) : (
                      <FaTimesCircle className={`text-xl ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    )}
                  </div>
                </div>
              </div>
            </RemarkTooltip>

          </td>)

      )}
    </motion.tr>
  );
}