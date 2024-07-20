import React, { useState, useEffect, useContext, useRef } from "react";
import Profile from '../../assets/Test Account.png';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Attendence } from "../../Config";

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
                const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
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
        <div className="w-full flex flex-col mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mb-3 no-scrollbar" >
            <ToastContainer />
            <div className="container mx-auto py-3 px-2">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-medium">Student Attendance</h1>
                    <div className="">
                        <Link
                            to="/Teacher-Dashboard/class_activity/studentattendence/record"
                            className="text-lg px-2 py-1 mr-2 bg-green-500 text-white rounded-md hover:cursor-pointer"
                        >
                            Previous Record
                        </Link>
                        <button className="px-2 py-1 bg-green-500 text-white rounded-md hover:cursor-pointer" onClick={handleMark}>
                            {markLoading ? <Loading /> : 'Mark Attendance'}
                        </button>
                    </div>
                </div>
                {error}
                <div className="border rounded-lg shadow-md mt-2 overflow-auto h-screen" onScroll={handleScroll} ref={containerRef}>
                    {loading && students.length == 0 ? (
                        <Loading />
                    ) : (
                        <>
                            {studentClone.map((student, index) => (
                                <div key={index} className="p-4 items-center">
                                    <div className="flex w-full items-center">
                                        <span className="mr-2">{student.name[0]}</span>
                                        <div className="bg-gray-300 h-1 w-full"></div>
                                    </div>
                                    <div className="flex w-full justify-between items-center border p-2 rounded-lg">
                                        <div className="flex items-center px-3">
                                            <span className="mr-3 text-xl">{student.rollNumber}</span>
                                            <img src={student.profileLink} alt="User image" className="w-12 h-12 rounded-full"></img>
                                            <span className="ml-2">{student.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button className={`px-2 rounded-full ${student.present ? "bg-green-500 text-white" : "bg-gray-300"}`} onClick={() => handleAttendance(index, "Present")}>
                                                P
                                            </button>
                                            <button className={`px-2 rounded-full ${student.absent ? "bg-red-500 text-white" : "bg-gray-300"}`} onClick={() => handleAttendance(index, "Absent")}>
                                                A
                                            </button>
                                            <button className={`px-2 rounded-full ${student.leave ? "bg-yellow-500 text-white" : "bg-gray-300"}`} onClick={() => handleAttendance(index, "Leave")}>
                                                L
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentAttendance;
