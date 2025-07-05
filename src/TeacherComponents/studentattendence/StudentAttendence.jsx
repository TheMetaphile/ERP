import React, { useState, useEffect, useContext, useRef } from "react";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../Config";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { Link } from "react-router-dom";
import { refreshAccessToken } from "../../RefreshTokenHelper";

function StudentAttendance() {
  const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const containerRef = useRef(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8);
  const [error, setError] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [studentClone, setStudentClone] = useState([]);
  const [loading, setLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-500';
  const headerBgClass = darkMode
    ? 'bg-gradient-to-r from-gray-800 to-gray-700'
    : 'bg-gradient-to-r from-blue-100 to-blue-50';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        console.log(start, "-", end);
        const today = new Date();
        const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
        const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
        const formattedDate = `${today.getFullYear()}-${month}-${day}`;
        const response = await axios.get(`${BASE_URL}/studentAttendance/fetch/student/list?date=${formattedDate}&start=${start}&end=${end}`, {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
          },
        });

        const studentsList = response.data.studentsList.map(student => {
          const present = student.attendanceStatus === "Present";
          const absent = student.attendanceStatus === "Absent";
          const leave = student.attendanceStatus === "Leave";

          return {
            ...student,
            present,
            absent,
            leave,
          };
        });

        setStudents(prevStudents => [...prevStudents, ...studentsList]);
        setStudentClone(prevStudents => [...prevStudents, ...studentsList]);
        console.log('fetch', studentsList);
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
        console.error("Error fetching student attendance:", error);
        if (
          error.response &&
          error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
        ) {
          toast.warn('Access denied. Attempting to refresh token...');
          try {
            const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
            await fetchStudents();
          } catch (refreshError) {
          }
        } else {
          toast.error(error.response?.data?.error || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [authState?.accessToken, start]);



  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollHeight - container.scrollTop <= container.clientHeight) {
      console.log("fetching");
      setLoadMore(true);
      if (students.length === end + start || students.length == 0) {
        setStart(end + start);
        setEnd(5);
      }
    }
    console.log('iiiiii')
  };


  const handleAttendance = (index, type) => {
    const updatedStudents = [...studentClone];
    const student = updatedStudents[index];

    switch (type) {
      case "Present":
        student.present = !student.present;
        if (student.present) {
          student.absent = false;
          student.leave = false;
        }
        break;
      case "Absent":
        student.absent = !student.absent;
        if (student.absent) {
          student.present = false;
          student.leave = false;
        }
        break;
      case "Leave":
        student.leave = !student.leave;
        if (student.leave) {
          student.present = false;
          student.absent = false;
        }
        break;
      default:
        break;
    }

    setStudentClone(updatedStudents);
  };

  const handleMark = async () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const studentAttendance = studentClone.map(student => ({
      email: student.email,
      status: student.present ? "Present" : student.absent ? "Absent" : student.leave ? "Leave" : "Absent"
    }));

    const requestData = {
      accessToken: authState?.accessToken,
      date: formattedDate,
      studentAttendance
    };
    console.log(requestData);
    setMarkLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/studentAttendance/mark`, requestData);
      if (response.status === 200) {
        console.log('Attendance marked:', response.data);
        toast.success('Attendance marked');
        const resetStudents = studentClone.map(student => ({
          ...student,
          present: false,
          absent: false,
          leave: false
        }));
        // setStudentClone(resetStudents);
        setMarkLoading(false);

      }
    } catch (error) {
      toast.error('Error', error);
      setMarkLoading(false);
      console.error("Error marking attendance:", error);
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleMark();
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full min-h-screen p-6 mobile:max-tablet:p-2 ${bgClass}`}
    >
      <ToastContainer theme={darkMode ? 'dark' : 'light'} />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8 mobile:max-tablet:flex-col mobile:max-tablet:justify-start"
        >
          <h1 className={`text-4xl mobile:max-tablet:text-lg font-medium ${textClass} tracking-tight`}>
            Student Attendance
          </h1>
          <div className="flex space-x-4 mobile:max-tablet:text-sm mobile:max-tablet:flex-col mobile:max-tablet:gap-1 mobile:max-tablet:space-x-0">
            <Link
              to="/Teacher-Dashboard/class_activity/studentattendence/record"
              className={`
              flex items-center px-6 py-3 rounded-full 
              hover:opacity-90 transition duration-300 shadow-lg
              ${darkMode
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-500 text-white'}
            `}
            >
              <IoMdRefresh className="mr-2" />
              Previous Record
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
              flex items-center px-6 py-3 rounded-full 
              hover:opacity-90 transition duration-300 shadow-lg
              ${darkMode
                  ? 'bg-green-700 text-white'
                  : 'bg-green-500 text-white'}
            `}
              onClick={handleMark}
            >
              {markLoading ? <Loading /> : 'Mark Attendance'}
            </motion.button>
          </div>
        </motion.div>

        {error && (
          <div
            className={`
            mb-4 text-center font-semibold 
            ${darkMode ? 'text-red-400' : 'text-red-500'}
          `}
          >
            {error}
          </div>
        )}

        <div
          className={`
          rounded-2xl shadow-xl overflow-hidden 
          ${cardBgClass}
        `}
        >
          <div
            className={`
            p-6 ${headerBgClass} 
            ${darkMode ? 'text-white' : 'text-black'} 
            flex justify-between items-center
          `}
          >
            <div className="flex items-center">
              <FaUserGraduate className="text-3xl mr-3" />
              <span className="text-xl mobile:max-tablet:text-lg font-semibold">
                Class Roster
              </span>
            </div>
            <FaCalendarAlt className="text-2xl" />
          </div>
          <div
            className="max-h-[calc(100vh-250px)] overflow-y-auto"
            onScroll={handleScroll}
            ref={containerRef}
          >
            {loading && students.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <Loading />
              </div>
            ) : (
              <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {studentClone.map((student, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 ${hoverBgClass} transition duration-150 ease-in-out`}
                  >
                    <div className="flex items-center justify-between mobile:max-tablet:flex-col mobile:max-tablet:items-start mobile:max-tablet:gap-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className={`
                            h-12 w-12 rounded-full object-cover 
                            border-2 
                            ${darkMode
                                ? 'border-blue-700'
                                : 'border-blue-500'}
                          `}
                            src={student.profileLink}
                            alt={student.name}
                          />
                        </div>
                        <Link to={`/Teacher-Dashboard/class_activity/details/${student.email}`}>
                          <div>
                            <p className={`text-sm font-medium ${textClass}`}>
                              {student.name}
                            </p>
                            <p className={`text-sm ${subTextClass}`}>
                              Roll: {student.rollNumber}
                            </p>
                          </div>
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AttendanceButton
                          active={student.present}
                          onClick={() => handleAttendance(index, "Present")}
                          icon={<FaCheckCircle />}
                          activeColor={darkMode ? "bg-green-700" : "bg-green-500"}
                          inactiveColor={darkMode ? "bg-gray-700" : "bg-gray-200"}
                          darkMode={darkMode}
                        />
                        <AttendanceButton
                          active={student.absent}
                          onClick={() => handleAttendance(index, "Absent")}
                          icon={<FaTimesCircle />}
                          activeColor={darkMode ? "bg-red-700" : "bg-red-500"}
                          inactiveColor={darkMode ? "bg-gray-700" : "bg-gray-200"}
                          darkMode={darkMode}
                        />
                        <AttendanceButton
                          active={student.leave}
                          onClick={() => handleAttendance(index, "Leave")}
                          icon={<FaCalendarAlt />}
                          activeColor={darkMode ? "bg-yellow-700" : "bg-yellow-500"}
                          inactiveColor={darkMode ? "bg-gray-700" : "bg-gray-200"}
                          darkMode={darkMode}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// AttendanceButton component
const AttendanceButton = ({
  active,
  onClick,
  icon,
  activeColor,
  inactiveColor,
  darkMode
}) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`
      p-2 rounded-full text-white 
      ${active ? activeColor : inactiveColor}
      ${darkMode ? 'text-white' : 'text-white'}
    `}
    onClick={onClick}
  >
    {icon}
  </motion.button>
);

export default StudentAttendance;

