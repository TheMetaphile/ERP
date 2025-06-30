import React, { useState, useContext, useEffect } from 'react'
import Table from './../Table'
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import SelectionTeacher from './../SelectionTeacher';
import Loading from '../../../../LoadingScreen/Loading'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../../Config';
import { useTimetableContext } from '../TimetableContext';
import TimeTableHeader from './TimeTableHeader';
import { refreshAccessToken } from '../../../../RefreshTokenHelper';

function TeachersTimeTableSubAdmin() {
    const { structureDetails, dayTeacher } = useTimetableContext();

    const [data, setData] = useState(null);
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [teacherEmail, setTeacherEmail] = useState('');
    const [Teacher, setTeacher] = useState({});
    const [loading, setLoading] = useState(false);
    const days = ["monday", 'tuesday', 'wednesday', 'thursday', "friday", 'saturday'];



    useEffect(() => {
        if (structureDetails) {
            handleSearch();
        }
    }, [structureDetails, dayTeacher, teacherEmail]);

    const handleEmailChange = (value) => setTeacherEmail(value);
    const handleName = (value) => setTeacher(value);


    const handleSearch = async () => {
        if (teacherEmail && dayTeacher) {
            setLoading(true);
            console.log(teacherEmail, dayTeacher)
            try {
                const response = await axios.post(`${BASE_URL}/timetable/fetch/teacher`, {
                    id: teacherEmail,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${authState?.accessToken}`,
                        },
                    });
                if (response.status === 200) {
                    console.log('response from fetchh', response.data);
                    setData(response.data);
                }
            } catch (error) {
                toast.error(error)
                console.error('Error fetching dataaaa:', error);
                if (
                    error.response &&
                    error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                ) {
                    toast.warn('Access denied. Attempting to refresh token...');
                    try {
                        const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                        await handleSearch();
                    } catch (refreshError) {
                    }
                } else {
                    toast.error(error.response?.data?.error || "An error occurred");
                }
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
            className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar"
        >
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full mt-4"
            >
                <SelectionTeacher
                    onSearch={handleSearch}
                    onEmailChange={handleEmailChange}
                    onNameChange={handleName}
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
                            <div className="flex items-center mobile:max-tablet:flex-col  mobile:max-tablet:px-0 bg-blue-200 p-4 rounded-lg shadow-md">
                                <span className="px-2 text-xl mobile:max-tablet:text-sm whitespace-nowrap font-semibold text-blue-800">
                                    Showing Timetable for Teacher:
                                </span>
                                <div className="flex-1 flex-wrap flex items-center gap-2 mobile:max-tablet:text-sm">
                                    <img
                                        src={Teacher.profileLink}
                                        alt="profilepic"
                                        className="ml-2 w-12 h-12 rounded-full mr-2 border-2 border-blue-500"
                                    />

                                    <span className="text-lg mobile:max-tablet:text-sm whitespace-nowrap font-medium text-blue-700">
                                        {Teacher.name}
                                    </span>

                                    <div className="text-sm text-blue-600">{Teacher.employeeId}</div>
                                </div>
                            </div>

                            <table className='w-full'>
                                <TimeTableHeader fields={structureDetails?.lectureStructure} numberOfLecturesBeforeLunch={structureDetails?.numberOfLeacturesBeforeLunch} />
                                <tbody>
                                    {days.map((day, index) => (
                                        <Table
                                            fetchedTimeTableStructure={structureDetails}
                                            day={day}
                                            data={data}
                                            index={index}
                                            key={index}
                                        />
                                    ))
                                    }
                                </tbody>
                            </table>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="py-4 text-center bg-blue-100 rounded-lg shadow-md"
                        >
                            <p className="text-blue-700 mb-3">No Timetable found. Please upload one.</p>
                            <Link
                                to="/Admin-Dashboard/timetable/upload"
                                className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md"
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

export default TeachersTimeTableSubAdmin