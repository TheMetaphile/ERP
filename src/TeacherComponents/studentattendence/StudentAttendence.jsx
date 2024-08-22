import React, { useState, useEffect, useContext, useRef } from "react";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Attendence } from "../../Config";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { Link } from "react-router-dom";

function StudentAttendance() {
  const [students, setStudents] = useState([]);
  const containerRef = useRef(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8);
  const [error, setError] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [studentClone, setStudentClone] = useState([]);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        console.log(start, "-", end);
        const today = new Date();
        var month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
        const formattedDate = `${today.getFullYear()}-${month}-${today.getDate()}`;
        const response = await axios.get(`${BASE_URL_Attendence}/studentAttendance/fetch/student/list?date=${formattedDate}&start=${start}&end=${end}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        const studentsList = response.data.studentsList.map(student => ({
          ...student,
          present: false,
          absent: false,
          leave: student.leave
        }));

        setStudents(prevStudents => [...prevStudents, ...studentsList]);
        setStudentClone(prevStudents => [...prevStudents, ...studentsList]);
        console.log('fetch', studentsList);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Error fetching student attendance:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [authState.accessToken, start]);


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
      accessToken: authState.accessToken,
      date: formattedDate,
      studentAttendance
    };
    console.log(requestData);
    setMarkLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_Attendence}/studentAttendance/mark`, requestData);
      if (response.status === 200) {
        console.log('Attendance marked:', response.data);
        toast.success('Attendance marked');
        const resetStudents = studentClone.map(student => ({
          ...student,
          present: false,
          absent: false,
          leave: false
        }));
        setStudentClone(resetStudents);
        setMarkLoading(false);

      }
    } catch (error) {
      toast.error('Error', error);
      setMarkLoading(false);
      console.error("Error marking attendance:", error);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}

      className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 mobile:max-tablet:p-2"

    >
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8 mobile:max-tablet:flex-col mobile:max-tablet:justify-start"
        >

          <h1 className="text-4xl mobile:max-tablet:text-lg font-extrabold text-blue-500 tracking-tight">Student Attendance</h1>
          <div className="flex space-x-4 mobile:max-tablet:text-sm mobile:max-tablet:flex-col mobile:max-tablet:gap-1 mobile:max-tablet:space-x-0">

            <Link
              to="/Teacher-Dashboard/class_activity/studentattendence/record"
              className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              <IoMdRefresh className="mr-2" />
              Previous Record
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 shadow-lg"
              onClick={handleMark}
            >
              {markLoading ? <Loading /> : 'Mark Attendance'}
            </motion.button>
          </div>
        </motion.div>

        {error && <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 bg-blue-500 text-white flex justify-between items-center">
            <div className="flex items-center">
              <FaUserGraduate className="text-3xl mr-3" />
              <span className="text-xl mobile:max-tablet:text-lg font-semibold">Class Roster</span>
            </div>
            <FaCalendarAlt className="text-2xl" />
          </div>
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto" onScroll={handleScroll} ref={containerRef}>
            {loading && students.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <Loading />
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {studentClone.map((student, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center justify-between mobile:max-tablet:flex-col mobile:max-tablet:items-start mobile:max-tablet:gap-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-12 w-12 rounded-full object-cover border-2 border-blue-500" src={student.profileLink} alt={student.name} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">Roll: {student.rollNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AttendanceButton
                          active={student.present}
                          onClick={() => handleAttendance(index, "Present")}
                          icon={<FaCheckCircle />}
                          activeColor="bg-green-500"
                          inactiveColor="bg-gray-200"
                        />
                        <AttendanceButton
                          active={student.absent}
                          onClick={() => handleAttendance(index, "Absent")}
                          icon={<FaTimesCircle />}
                          activeColor="bg-red-500"
                          inactiveColor="bg-gray-200"
                        />
                        <AttendanceButton
                          active={student.leave}
                          onClick={() => handleAttendance(index, "Leave")}
                          icon={<FaCalendarAlt />}
                          activeColor="bg-yellow-500"
                          inactiveColor="bg-gray-200"
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
const AttendanceButton = ({ active, onClick, icon, activeColor, inactiveColor }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`p-2 rounded-full text-white ${active ? activeColor : inactiveColor}`}
    onClick={onClick}
  >
    {icon}
  </motion.button>
);

export default StudentAttendance;
