import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL_Login } from "../../../Config";

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
  }, [selectedTeacherEmail,day]);

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
        url: `${BASE_URL_TimeTbale}/timetable/fetch/checkAvailability`,
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
    <div className="bg-white flex-1 w-full justify-between items-center px-4 py-2" key={index}>
      {numberOfLeacturesBeforeLunch === index ? (
        <div className="w-full h-8 bg-secondary text-xl text-center">LUNCH</div>
      ) : (
        <></>
      )}
      <div className="flex w-full text-center items-center justify-between  py-2">
        <h1 className="w-40 ">{lectureNo}</h1>
        <h1 className="w-40">{Time}</h1>
        <select className="w-40" type="text" name="Subject" value={Subject} onChange={handleChange} required>
        <option value="" disabled>
          Select a subject
        </option>
          {subjects.map((subject, idx) => (
            <option key={idx} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <div className="relative w-48">
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
        </div>
        <h1 className={` w-48 ${remark.includes("Good") ? "text-green-600" : "text-red-600"}`}>{remark}</h1>
      </div>
    </div>
  );
}
