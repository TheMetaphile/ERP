import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../Context/AuthContext";

import { BASE_URL_Login, BASE_URL_TimeTable } from "../../../../Config";
import Switch from "./switch";

export default function TimetableRow({
  index,
  lectureNo,
  Time,
  numberOfLeacturesBeforeLunch,
  Subject,
  Teacher,
  handleSubjectChange,
  handleTeacherChange,
  subjects,
  day
}) {
  const [teacherInput, setTeacherInput] = useState(Teacher);
  const [remark, setRemark] = useState('Select Teacher');
  const [temp, setTemp] = useState(Teacher);
  const { authState } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  const [optional, setOptional] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTeacherEmail, setSelectedTeacherEmail] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setTemp(teacherInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [teacherInput]);

  useEffect(() => {
    if (temp) {
      const searchTeacher = async () => {
        try {
          const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
            accessToken: authState.accessToken,
            searchString: temp,
            start: 0,
            end: 30,
          });
          console.log(response.data);
          const teacherNames = response.data.Teachers.map((teacher) => ({
            name: teacher.name,
            profileLink: teacher.profileLink,
            email: teacher.email,
          }));
          setSuggestions(teacherNames);
        } catch (error) {
          console.error("Error searching for teachers:", error);
        }
      };
      searchTeacher();
    }
  }, [temp, authState.accessToken]);

  const handleSuggestionClick = (suggestion) => {
    setTeacherInput(suggestion.name);
    setSelectedTeacherEmail(suggestion.email);
    setShowSuggestions(false);
    handleTeacherChange(index, suggestion.email);

  };
  useEffect(() => {
    fetchRemark(index + 1, selectedTeacherEmail, day)
  }, [selectedTeacherEmail, day]);

  const handleChange = (event) => {
    console.log(index);
    handleSubjectChange(index, event.target.value);
  };

  const fetchRemark = async (lecture, email, day) => {
    try {
      if (!lecture) {
        setRemark("Please select a lecture");
        return;
      }
      if (!email) {
        setRemark("Please select a teacher");
        return;
      }
      if (!day) {
        setRemark("Please select a day");
        return;
      }


      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_TimeTable}/timetable/fetch/checkAvailability`,
        params: {
          lecture,
          day,
          email,
        },
        headers: {
          'Authorization': `Bearer ${authState.accessToken}`,
          'Content-Type': 'application/json',
        }
      };

      const response = await axios(config);
      console.log("Success:", response.data);
      setRemark(response.data.remark);
      return response.data;
    } catch (error) {
      console.error('Error fetching availability:', error);
      throw error;
    }
  };
  const handleTeacher = (event) => {
    setShowSuggestions(true);
    setTeacherInput(event.target.value);
  };

  return (
    <>
      {numberOfLeacturesBeforeLunch === index && (
        <td colSpan="6" className="h-8 bg-secondary text-xl text-center">
          LUNCH
        </td>
      )}

      <tr className={`bg-white  ${!optional ? "border-b border-gray-300" : ""}`}>

        <td className="text-center py-2">{lectureNo}</td>
        <td className="text-center py-2">{Time}</td>
        <td className="text-center py-2">
          {
            !optional && <select className="w-full" name="Subject" value={Subject} onChange={handleChange} required>
              <option value="" disabled>
                Select a subject
              </option>
              {subjects.map((subject, idx) => (
                <option key={idx} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          }
        </td>
        <td className="flex justify-center py-2">
          <Switch checked={optional} changeRole={(optional) => setOptional(optional)} />
        </td>
        <td className="relative py-2">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            list={`teacher-suggestions`}
            value={teacherInput}
            onChange={handleTeacher}
            required
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto w-full">
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
        <td className={`text-center py-2 ${remark.includes("Good") ? "text-green-600" : "text-red-600"}`}>
          {remark}
        </td>
      </tr>

      {optional && (
        <tr className="bg-white border-b border-gray-300">

          <td className="text-center py-2"></td>
          <td className="text-center py-2"></td>
          <td className="text-center py-2">
            <select className="w-full" name="Subject" value={Subject} onChange={handleChange} required>
              <option value="" disabled>
                Select a subject
              </option>
              {subjects.map((subject, idx) => (
                <option key={idx} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </td>
          <td className="flex justify-center py-2">

          </td>
          <td className="relative py-2">

          </td>
          <td className={`text-center py-2 ${remark.includes("Good") ? "text-green-600" : "text-red-600"}`}>

          </td>
        </tr>
      )}
    </>
  );
}
