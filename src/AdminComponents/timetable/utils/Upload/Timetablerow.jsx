import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Login, BASE_URL_TimeTable } from "../../../../Config";
import Switch from "./switch";
import OptionalRow from "./OptionalRow";
import { motion } from 'framer-motion';

export default function TimetableRow({
  index,
  lectureNo,
  Time,
  numberOfLeacturesBeforeLunch,
  Subject,
  Teacher,
  handleSubjectChange,
  handleTeacherChange,
  handleSchedule,
  subjects,
  day
}) {

  const [rowState, setRowState] = useState({
    teacherInput: Teacher,
    remark: 'Select Teacher',
    suggestions: [],
    optional: false,
    showSuggestions: false,
    selectedTeacherEmail: "",
    selectedSection: '',
  });
  const [email, setEmail] = useState('');

  const [optionalRows, setOptionalRows] = useState([
    {
      subject: '',
      section: '',
      teacher: '',
    },
  ]);

  const { authState } = useContext(AuthContext);

  const addNewRow = () => {
    setOptionalRows([
      ...optionalRows,
      {
        subject: '',
        section: '',
        teacher: '',
      },
    ]);
  };

  const removeRow = (rowIndex) => {
    setOptionalRows(prevRows => prevRows.filter((_, index) => index !== rowIndex));
  };

  const searchTeacher = useCallback(async (searchString) => {
    if (!searchString) return [];
    try {
      const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
        accessToken: authState.accessToken,
        searchString,
        start: 0,
        end: 30,
      });
      return response.data.Teachers.map((teacher) => ({
        name: teacher.name,
        profileLink: teacher.profileLink,
        email: teacher.email,
      }));
    } catch (error) {
      console.error("Error searching for teachers:", error);
      return [];
    }
  }, [authState.accessToken]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      const suggestions = await searchTeacher(rowState.teacherInput);
      setRowState(prev => ({ ...prev, suggestions }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [rowState.teacherInput, searchTeacher]);

  useEffect(() => {
    fetchRemark(index + 1, rowState.selectedTeacherEmail, day);
  }, [rowState.selectedTeacherEmail, day, index]);

  const handleSuggestionClick = (suggestion) => {
    setRowState(prev => ({
      ...prev,
      teacherInput: suggestion.name,
      selectedTeacherEmail: suggestion.email,
      showSuggestions: false,
    }));
    setEmail(suggestion.email);
    handleTeacherChange(index, suggestion.email);
  };

  const handleChange = (event) => {
    handleSubjectChange(index, event.target.value);
  };

  const fetchRemark = async (lecture, email, day) => {
    if (!lecture || !email || !day) {
      setRowState(prev => ({ ...prev, remark: "Please select all required fields" }));
      return;
    }

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
      setRowState(prev => ({ ...prev, remark: response.data.remark }));
    } catch (error) {
      console.error('Error fetching availability:', error);
      setRowState(prev => ({ ...prev, remark: "Error checking availability" }));
    }
  };

  const handleTeacher = (event) => {
    setRowState(prev => ({
      ...prev,
      teacherInput: event.target.value,
      showSuggestions: true,
    }));
  };

  const handleOptionalRowChange = async (index, field, value) => {
    const updatedRows = [...optionalRows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };

    if (field === 'teacher') {
      updatedRows[index].showSuggestions = true;
      const suggestions = await searchTeacher(value);
      updatedRows[index].suggestions = suggestions;
    }

    setOptionalRows(updatedRows);
  };

  const handleOptionalSuggestionClick = (rowIndex, suggestion) => {
    const updatedRows = optionalRows.map((row, idx) =>
      idx === rowIndex
        ? { ...row, teacher: suggestion.name, showSuggestions: false }
        : row
    );
    setOptionalRows(updatedRows);
  };

  useEffect(() => {
    handleSchedule(prev => {
      const updatedRows = [...prev];
      updatedRows[lectureNo - 1] = {
        subject: !rowState.optional ? Subject : "",
        teacher: !rowState.optional ? email : "",
        lectureNo: lectureNo,
        optional: rowState.optional,
        optionalSubjects: rowState.optional ? optionalRows.map(row => ({
          optionalSubject: row.subject,
          mergeWithSection: row.section,
          teacher: row.teacher,
        })) : []
      }
      return updatedRows;
    }
    );
  }, [Subject, rowState, optionalRows, lectureNo]);

  return (
    <>
    {numberOfLeacturesBeforeLunch === index && (
      <motion.tr
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-purple-200 text-purple-800 font-bold"
      >
        <td colSpan="6" className="h-10 text-xl text-center">LUNCH</td>
      </motion.tr>
    )}
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white hover:bg-purple-50 transition-colors duration-200 ${!rowState.optional ? "border-b border-purple-200" : ""}`}
    >
      <td className="text-center py-3">{lectureNo}</td>
      <td className="text-center py-3">{Time}</td>
      <td className="text-center py-3">
        {!rowState.optional && (
          <select
            className="w-full bg-purple-50 border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="Subject"
            value={Subject}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a subject</option>
            {subjects.map((subject, idx) => (
              <option key={idx} value={subject}>{subject}</option>
            ))}
          </select>
        )}
      </td>
      <td className="flex justify-center py-3 mt-3">
        <motion.div
          whileTap={{ scale: 0.95 }}
        >
          <input
            type="checkbox"
            checked={rowState.optional}
            onChange={(e) => setRowState(prev => ({ ...prev, optional: e.target.checked }))}
            className="form-checkbox h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
          />
        </motion.div>
      </td>
      <td className="relative py-3">
        {!rowState.optional && (
          <>
            <input
              type="text"
              className="border border-purple-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={rowState.teacherInput}
              onChange={handleTeacher}
              required
            />
            {rowState.showSuggestions && rowState.suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto w-full shadow-lg"
              >
                {rowState.suggestions.map((suggestion, indx) => (
                  <motion.li
                    key={indx}
                    whileHover={{ backgroundColor: '#F3E8FF' }}
                    className="flex items-center p-2 cursor-pointer"
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
          </>
        )}
      </td>
      <td className={`text-center py-3 ${rowState.remark.includes("Good") ? "text-green-600" : "text-red-600"}`}>
        {!rowState.optional && <>{rowState.remark}</>}
      </td>
    </motion.tr>
    {rowState.optional && optionalRows.map((data, idx) => (
      <OptionalRow
        key={idx}
        lectureNo={lectureNo}
        addNewRow={addNewRow}
        RemoveNewRow={() => removeRow(idx)}
        data={data}
        handleOptionalRowChange={handleOptionalRowChange}
        handleOptionalSuggestionClick={handleOptionalSuggestionClick}
        optionalRows={optionalRows}
        subjects={subjects}
        idx={idx}
        day={day}
      />
    ))}
  </>
  );
}