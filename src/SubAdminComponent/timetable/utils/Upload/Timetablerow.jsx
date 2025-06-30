import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaPlus,
  FaMinus,
  FaSpinner
} from 'react-icons/fa';
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL } from "../../../../Config";
import { motion } from "framer-motion";
import { refreshAccessToken } from "../../../../RefreshTokenHelper";
import { toast } from "react-toastify";

const RemarkTooltip = ({ children, message, darkMode }) => (
  <div className="group relative inline-block">
    {children}
    {message && (
      <div className={`
        absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 
        mb-2 px-3 py-2 text-xs rounded-md opacity-0 group-hover:opacity-100 
        transition-opacity duration-300
        ${darkMode
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
  fetchTeacherAvailability,
  darkMode,
  isLoading
}) {
  const { authState, updateAccessToken, logout } = useContext(AuthContext);
  const suggestionsRef = useRef(null);

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
    if (rowStateWeek && Object.keys(rowStateWeek).length > 0) {
      setRowState(rowStateWeek);
    } else {
      setRowState(
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
    }
  }, [rowStateWeek]);

  const searchTeachers = useCallback(async (searchText) => {
    if (!searchText) return [];

    try {
      const response = await axios.post(`${BASE_URL}/search/teacher`, {
        accessToken: authState?.accessToken,
        searchString: searchText,
        start: 0,
        end: 30,
      });

      return response.data.Teachers.map(teacher => ({
        _id: teacher._id,
        name: teacher.name,
        profileLink: teacher.profileLink,
        email: teacher.email,
        employmentNumber: teacher.employmentNumber,
      }));
    } catch (error) {
      console.error("Teacher search error:", error);
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await searchTeachers(searchText);
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
      return [];
    }
  }, [authState?.accessToken]);

  const handleOptionalSubjectUpdate = (lectureNo, index, field, value) => {
    handleSchedule(prev => {
      const daySchedule = prev[day] || [];
      return {
        ...prev,
        [day]: daySchedule.map(lec =>
          lec.lectureNo === lectureNo
            ? {
              ...lec,
              optionalSubjects: lec.optionalSubjects.map((opt, i) =>
                i === index
                  ? { ...opt, [field]: value }
                  : opt
              )
            }
            : lec
        )
      };
    });
  };


  useEffect(() => {
    console.log('schedule', schedule)
  }, [schedule]);

  const addOptionalSubject = (lectureNo) => {
    handleSchedule(prev => {
      const daySchedule = prev[day] || [];

      // Check if the lectureNo exists in the schedule
      const lectureExists = daySchedule.some(lec => lec.lectureNo === lectureNo);

      return {
        ...prev,
        [day]: lectureExists
          ? daySchedule.map(lec =>
            lec.lectureNo === lectureNo
              ? {
                ...lec,
                optional: true,
                optionalSubjects: [
                  ...(lec.optionalSubjects || []),
                  { subject: '', teacher: '', mergeWithSection: '' }
                ]
              }
              : lec
          )
          : [
            ...daySchedule,
            {
              lectureNo,
              optional: true,
              optionalSubjects: [{ subject: '', teacher: '', mergeWithSection: '' }]
            }
          ]
      };
    });
  };


  const removeOptionalSubject = (lectureNo, index) => {
    handleSchedule(prev => {
      const daySchedule = prev[day] || [];
      return {
        ...prev,
        [day]: daySchedule.map(lec =>
          lec.lectureNo === lectureNo
            ? {
              ...lec,
              optionalSubjects: lec.optionalSubjects.filter((_, i) => i !== index),
              optional: lec.optionalSubjects.length <= 1 ? false : true
            }
            : lec
        )
      };
    });
  };

  const selectTeacher = async (lectureNo, teacher) => {
    try {
      const remark = await fetchTeacherAvailability(lectureNo, teacher._id, day);

      setRowState(prev => ({
        ...prev,
        [lectureNo]: {
          ...prev[lectureNo],
          teacherInput: teacher.name,
          showSuggestions: false,
          remark,
        }
      }));

      handleSchedule(prev => {
        const daySchedule = prev[day] || [];
        return {
          ...prev,
          [day]: daySchedule.map(lec =>
            lec.lectureNo === lectureNo
              ? { ...lec, teacher: teacher._id }
              : lec
          )
        };
      });
    } catch (error) {
      console.error("Teacher selection error:", error);
    }
  };

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      for (let lecture of lectureStructure) {
        const { teacherInput, showSuggestions, suggestions } = rowState[lecture?.lectureNo];
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
        } else if (!teacherInput.trim()) {
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
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchTeachers, rowState]);

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
      }, 150);
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
      className={`border ${darkMode
        ? 'bg-gray-800 hover:bg-gray-700 border-gray-600'
        : 'bg-white hover:bg-blue-50 border-gray-300'
        } transition-colors duration-200`}
    >

      <td className={`px-3 py-4 flex flex-col gap-2 justify-center font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'
        } items-center capitalize`}>
        <FaCalendarAlt />
        {day}
      </td>

      {lectureStructure.map((lecture, idx) => (
        <React.Fragment key={idx}>
          {numberOfLeacturesBeforeLunch && numberOfLeacturesBeforeLunch === idx + 1 ? (
            <>
              <td className={`p-3 border ${darkMode ? 'border-gray-600' : 'border-gray-300'
                } ${rowState[lecture.lectureNo]?.remark === 'Good to go'
                  ? (darkMode ? 'bg-green-900/30' : 'bg-green-100')
                  : (darkMode ? 'bg-red-900/30' : '')
                }`}>
                <RemarkTooltip message={rowState[lecture.lectureNo]?.remark} darkMode={darkMode}>
                  <LectureCell
                    lecture={lecture}
                    schedule={schedule}
                    subjects={subjects}
                    sections={sections}
                    selectedSection={selectedSection}
                    rowState={rowState}
                    handleSchedule={handleSchedule}
                    day={day}
                    darkMode={darkMode}
                    isLoading={isLoading}
                    addOptionalSubject={addOptionalSubject}
                    handleOptionalSubjectUpdate={handleOptionalSubjectUpdate}
                    removeOptionalSubject={removeOptionalSubject}
                    searchTeachers={searchTeachers}
                    selectTeacher={selectTeacher}
                    setRowState={setRowState}
                  />
                </RemarkTooltip>
              </td>
              <td className={`p-3 border ${darkMode ? 'border-gray-600 bg-yellow-900/30' : 'border-gray-300 bg-yellow-100'
                }`}>
                LUNCH
              </td>
            </>
          ) : (
            <td className={`p-3 border ${darkMode ? 'border-gray-600' : 'border-gray-300'
              } ${rowState[lecture.lectureNo]?.remark === 'Good to go'
                ? (darkMode ? 'bg-green-900/30' : 'bg-green-100')
                : (darkMode ? 'bg-red-900/30' : '')
              }`}>
              <RemarkTooltip message={rowState[lecture.lectureNo]?.remark} darkMode={darkMode}>
                <LectureCell
                  lecture={lecture}
                  schedule={schedule}
                  subjects={subjects}
                  sections={sections}
                  selectedSection={selectedSection}
                  rowState={rowState}
                  handleSchedule={handleSchedule}
                  day={day}
                  darkMode={darkMode}
                  isLoading={isLoading}
                  addOptionalSubject={addOptionalSubject}
                  handleOptionalSubjectUpdate={handleOptionalSubjectUpdate}
                  removeOptionalSubject={removeOptionalSubject}
                  searchTeachers={searchTeachers}
                  selectTeacher={selectTeacher}
                  setRowState={setRowState}
                />
              </RemarkTooltip>
            </td>
          )}
        </React.Fragment>
      ))}
    </motion.tr>
  );
}

const LectureCell = ({
  lecture,
  schedule,
  subjects,
  sections,
  selectedSection,
  rowState,
  handleSchedule,
  day,
  darkMode,
  isLoading,
  addOptionalSubject,
  handleOptionalSubjectUpdate,
  removeOptionalSubject,
  selectTeacher,
  searchTeachers,
  setRowState
}) => {
  const currentLecture = schedule.find(s => s.lectureNo === lecture?.lectureNo) || {};
  const [mainTeacherSuggestions, setMainTeacherSuggestions] = useState([]);
  const [optionalTeacherSuggestions, setOptionalTeacherSuggestions] = useState({});
  const [showMainSuggestions, setShowMainSuggestions] = useState(false);
  const [showOptionalSuggestions, setShowOptionalSuggestions] = useState({});
  const suggestionRef = useRef(null);

  const handleTeacherSearch = async (value, isOptional = false, optionalIndex = null) => {
    if (!value.trim()) {
      if (isOptional) {
        setOptionalTeacherSuggestions(prev => ({
          ...prev,
          [optionalIndex]: []
        }));
        setShowOptionalSuggestions(prev => ({
          ...prev,
          [optionalIndex]: false
        }));
      } else {
        setMainTeacherSuggestions([]);
        setShowMainSuggestions(false);
      }
      return;
    }

    try {
      const suggestions = await searchTeachers(value);
      if (isOptional) {
        setOptionalTeacherSuggestions(prev => ({
          ...prev,
          [optionalIndex]: suggestions
        }));
        setShowOptionalSuggestions(prev => ({
          ...prev,
          [optionalIndex]: true
        }));
      } else {
        setMainTeacherSuggestions(suggestions);
        setShowMainSuggestions(true);
      }
    } catch (error) {
      console.error("Error searching teachers:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setTimeout(() => {
          setShowMainSuggestions(false);
          setShowOptionalSuggestions({});
        }, 100); // Delay closing so that handleTeacherSelect executes first
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // In LectureCell component
  const handleTeacherSelect = async (teacher, isOptional = false, optionalIndex = null) => {
    console.log("teacher", teacher);
    if (isOptional) {
      handleOptionalSubjectUpdate(lecture.lectureNo, optionalIndex, 'teacher', {
        _id: teacher._id,
        name: teacher.name
      });
      setShowOptionalSuggestions(prev => ({
        ...prev,
        [optionalIndex]: false
      }));
      setOptionalTeacherSuggestions(prev => ({
        ...prev,
        [optionalIndex]: []
      }));
    } else {
      await selectTeacher(lecture.lectureNo, teacher);
      // setShowMainSuggestions(false);
      setMainTeacherSuggestions([]);
    }
  };

  // console.log("test",schedule[lecture?.lectureNo]?.['optionalSubjects']?.[0]?.teacher);
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Subject
        </label>
        <select
          className={`rounded-md px-3 py-2 border ${darkMode
            ? 'bg-gray-700 text-gray-200 border-gray-600'
            : 'bg-white text-gray-900 border-gray-300'
            }`}
          value={currentLecture.subject || ""}
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
          disabled={isLoading}
        >
          <option value="">Select Subject</option>
          {subjects.map((subject, i) => (
            <option key={i} value={subject.subject}>{subject.subject}</option>
          ))}
        </select>

        {/* Regular Teacher Field */}
        <div className="relative" ref={suggestionRef}>
          <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Teacher
          </label>
          <input
            type="text"
            value={rowState[lecture?.lectureNo]?.teacherInput || ''}
            onChange={(e) => {
              console.log(e.target.value)
              handleTeacherSearch(e.target.value);
              setRowState(prev => ({
                ...prev,
                [lecture.lectureNo]: {
                  ...prev[lecture.lectureNo],
                  teacherInput: e.target.value,
                }
              }));
            }}
            onFocus={() => {
              if (mainTeacherSuggestions.length > 0) {
                setShowMainSuggestions(true);
              }
            }}
            className={`w-full rounded-md px-3 py-2 border ${darkMode
              ? 'bg-gray-700 text-gray-200 border-gray-600'
              : 'bg-white text-gray-900 border-gray-300'
              }`}
            placeholder="Search teacher..."
            disabled={isLoading}
          />

          {/* Teacher Suggestions Dropdown */}
          {showMainSuggestions && mainTeacherSuggestions.length > 0 && (
            <div className={`absolute z-10 w-full mt-1 max-h-40 overflow-y-auto rounded-md shadow-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
              } border`}>
              {mainTeacherSuggestions.map((teacher, index) => (
                <div
                  key={index}
                  onClick={() => handleTeacherSelect(teacher)}
                  className={`flex items-center p-2 cursor-pointer ${darkMode
                    ? 'hover:bg-gray-600'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  <img
                    src={teacher.profileLink}
                    alt={teacher.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
                      {teacher.name}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {teacher.employmentNumber}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Optional Subjects */}
      {currentLecture.optional && currentLecture.optionalSubjects?.map((optSubject, index) => (
        <div key={index} className={`p-2 rounded-md gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <span className="whitespace-nowrap">
            Optional Subject {index + 1}
          </span>
          <div className="flex flex-col gap-2">
            <select
              type="text"
              value={optSubject.subject}
              onChange={(e) => handleOptionalSubjectUpdate(lecture.lectureNo, index, 'subject', e.target.value)}
              placeholder="Optional Subject"
              className={`flex-1 rounded-md px-3 py-2 border ${darkMode
                ? 'bg-gray-800 text-gray-200 border-gray-600'
                : 'bg-white text-gray-900 border-gray-300'
                }`}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, i) => (
                <option key={i} value={subject}>{subject}</option>
              ))}
            </select>

            {/* Optional Subject Teacher Field */}
            <div className="flex-1 relative" ref={suggestionRef}>
              <input
                type="text"
                value={optSubject?.teacher?.name || ''}
                onChange={(e) => {
                  handleTeacherSearch(e.target.value, true, index);
                  handleOptionalSubjectUpdate(lecture.lectureNo, index, 'teacher', e.target.value);
                }}
                onFocus={() => {
                  if (optionalTeacherSuggestions[index]?.length > 0) {
                    setShowOptionalSuggestions(prev => ({
                      ...prev,
                      [index]: true
                    }));
                  }
                }}
                placeholder="Teacher"
                className={`w-full rounded-md px-3 py-2 border ${darkMode
                  ? 'bg-gray-800 text-gray-200 border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300'
                  }`}
              />

              {/* Optional Teacher Suggestions */}
              {showOptionalSuggestions[index] && optionalTeacherSuggestions[index].length > 0 && (
                <div className={`absolute z-10 w-full mt-1 max-h-40 overflow-y-auto rounded-md shadow-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                  } border`}>
                  {optionalTeacherSuggestions[index].map((teacher, suggIndex) => (
                    <div
                      key={suggIndex}
                      onClick={() => handleTeacherSelect(teacher, true, index)}
                      className={`flex items-center p-2 cursor-pointer ${darkMode
                        ? 'hover:bg-gray-600'
                        : 'hover:bg-gray-100'
                        }`}
                    >
                      <img
                        src={teacher.profileLink}
                        alt={teacher.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
                          {teacher.name}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {teacher.employmentNumber}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select
              value={optSubject?.mergeWithSection || ''}
              onChange={(e) => handleOptionalSubjectUpdate(lecture.lectureNo, index, 'mergeWithSection', e.target.value)}
              className={`flex-1 rounded-md px-3 py-2 border ${darkMode
                ? 'bg-gray-800 text-gray-200 border-gray-600'
                : 'bg-white text-gray-900 border-gray-300'
                }`}
            >
              <option value="">Select Section</option>
              {sections.filter(sec => sec !== selectedSection).map((section) => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>

            <button
              onClick={() => removeOptionalSubject(lecture.lectureNo, index)}
              className={`p-2 rounded-md w-full flex  justify-center text-center ${darkMode
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-red-500 hover:bg-red-600'
                } text-white`}
              type="button"
            >
              <FaMinus />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => addOptionalSubject(lecture.lectureNo)}
        className={`w-full flex items-center justify-center text-left gap-2 px-3 py-2 rounded-md ${darkMode
          ? 'bg-blue-600 hover:bg-blue-700'
          : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        type="button"

        disabled={isLoading}
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
        Add Optional Subject
      </button>
    </div>
  );
};