import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Login, BASE_URL_TimeTable } from "../../../../Config";
import Switch from "./switch";
import OptionalRow from "./OptionalRow";

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
        <tr>
          <td colSpan="6" className="h-8 bg-secondary text-xl text-center">
            LUNCH
          </td>
        </tr>
      )}

      <tr className={`bg-white ${!rowState.optional ? "border-b border-gray-300" : ""}`}>
        <td className="text-center py-2">{lectureNo}</td>
        <td className="text-center py-2">{Time}</td>
        <td className="text-center py-2">
          {!rowState.optional && (
            <select
              className="w-full"
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
        <td className="flex justify-center py-2">
          <Switch
            checked={rowState.optional}
            changeRole={(optional) => setRowState(prev => ({ ...prev, optional }))}
          />
        </td>
        <td className="relative py-2">
          {!rowState.optional && (
            <>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                value={rowState.teacherInput}
                onChange={handleTeacher}
                required
              />
              {rowState.showSuggestions && rowState.suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto w-full">
                  {rowState.suggestions.map((suggestion, indx) => (
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
            </>
          )}
        </td>
        <td className={`text-center py-2 ${rowState.remark.includes("Good") ? "text-green-600" : "text-red-600"}`}>
          {!rowState.optional && (
            <>{rowState.remark}</>
          )}

        </td>
      </tr>

      {rowState.optional && optionalRows.map((data, idx) => (
        <OptionalRow
          lectureNo={lectureNo}
          addNewRow={addNewRow}
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