import React, { useState, useContext, useEffect } from 'react'
import Table from './../Table'
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import SelectionTeacher from './../SelectionTeacher';
import Loading from '../../../../LoadingScreen/Loading'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaEnvelope, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_TimeTableStructure, BASE_URL_TimeTable } from '../../../../Config';
import { useTimetableContext } from '../TimetableContext';

function TeachersTimeTable() {
    const { structureDetails, dayTeacher, setDayTeacher } = useTimetableContext();

    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [teacherEmail, setTeacherEmail] = useState('bhanu68tyagi@gmail.com');
    const [Teacher, setTeacher] = useState({ employeeId: "1234", name: 'Bhuvneshwar Tyagi', profileLink: "data:image/jpeg;base64,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" });
    const [loading, setLoading] = useState(false);
    const [lectureTimes, setLectureTimes] = useState([]);

    const calculateLectureTimes = () => {
        if (!structureDetails) {
            return;
        }
        const { firstLectureTiming, durationOfEachLeacture, numberOfLeacturesBeforeLunch, durationOfLunch, numberOfLecture } = structureDetails;

        const times = [];
        let currentTime = convertToDate(firstLectureTiming);
        const lectureDuration = parseInt(durationOfEachLeacture.split(' ')[0], 10);
        const lunchDuration = parseInt(durationOfLunch.split(' ')[0], 10);

        for (let i = 1; i <= numberOfLecture; i++) {
            const endTime = new Date(currentTime.getTime() + lectureDuration * 60000);
            times.push({ start: new Date(currentTime), end: new Date(endTime) });

            currentTime = endTime;
            if (i === numberOfLeacturesBeforeLunch) {
                currentTime = new Date(currentTime.getTime() + lunchDuration * 60000);
            }
        }
        setLectureTimes(times);
        setLoading(false)

    };

    const convertToDate = (timeString) => {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '0';
        }
        if (modifier === 'pm') {
            hours = parseInt(hours, 10) + 12;
        }
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);

        return date;
    };


    useEffect(() => {
        if (structureDetails) {
            calculateLectureTimes();
        }
    }, [structureDetails]);



    useEffect(() => {
        if (structureDetails) {
            handleSearch();
        }
    }, [structureDetails, dayTeacher, teacherEmail]);

    const handleEmailChange = (value) => setTeacherEmail(value);
    const handleName = (value) => setTeacher(value);
    const handleTeacherDayChange = (value) => setDayTeacher(value);

    const handleSearch = async () => {
        if (teacherEmail && dayTeacher) {
            setLoading(true);
            console.log(teacherEmail, dayTeacher)
            try {
                const url = `${BASE_URL_TimeTable}/timetable/fetch/teacher`;
                const payload = {
                    accessToken: authState.accessToken,
                    email: teacherEmail,
                    day: dayTeacher
                };

                const response = await axios.post(url, payload);
                if (response.status === 200) {
                    console.log('response from fetchh', response.data);
                    setData(response.data);
                }
            } catch (error) {
                toast.error(error)
                console.error('Error fetching dataaaa:', error);
            } finally {
                setLoading(false);
            }

        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar bg-purple-50"
        >
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full mt-4 mobile:max-tablet:hidden"
            >
                <SelectionTeacher
                    onSearch={handleSearch}
                    onEmailChange={handleEmailChange}
                    onNameChange={handleName}
                    onDayChange={handleTeacherDayChange}
                />
            </motion.div>

            <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-3 w-full"
            >
                {!loading ? (
                    structureDetails ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center bg-purple-200 p-4 rounded-lg shadow-md">
                                <span className="px-2 text-xl font-semibold text-purple-800">
                                    Showing Timetable for Teacher:
                                </span>
                                <img
                                    src={Teacher.profileLink}
                                    alt="profilepic"
                                    className="ml-2 w-12 h-12 rounded-full mr-2 border-2 border-purple-500"
                                />
                                <div className="flex-1 mobile:max-tablet:text-sm">
                                    <span className="text-lg font-medium text-purple-700">
                                        {Teacher.name}
                                    </span>
                                    <div className="text-sm text-purple-600">{Teacher.employeeId}</div>
                                </div>
                            </div>

                            <Table
                                data={data}
                                teacherEmail={teacherEmail}
                                Time={lectureTimes}
                                numberOfLeacturesBeforeLunch={structureDetails.numberOfLeacturesBeforeLunch}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="py-4 text-center bg-purple-100 rounded-lg shadow-md"
                        >
                            <p className="text-purple-700 mb-3">No Timetable found. Please upload one.</p>
                            <Link
                                to="/Admin-Dashboard/timetable/upload"
                                className="px-6 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 shadow-md"
                            >
                                Upload Timetable
                            </Link>
                        </motion.div>
                    )
                ) : (
                    <Loading />
                )}
            </motion.div>
        </motion.div>

    )
}

export default TeachersTimeTable