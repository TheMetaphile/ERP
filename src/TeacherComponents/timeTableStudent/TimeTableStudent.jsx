import React, { useState, useContext, useEffect } from 'react';
import LeactureTile from "./utils/LectureTile";
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios';
import TimeTableHeader from './utils/TimeTableHeader'
import { BASE_URL } from '../../Config';
import { motion } from 'framer-motion';
import { refreshAccessToken } from '../../RefreshTokenHelper';
import { toast } from 'react-toastify';

export default function TimeTableStudent() {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchedTimeTableStructure, setTimetableStructure] = useState(null);
    const days = ["monday", 'tuesday', 'wednesday', 'thursday', "friday", 'saturday'];

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
    const textClass = darkMode ? 'text-white' : 'text-gray-800';
    const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';

    var ClassRange = null;
    const Class = authState?.userDetails?.currentClass;
    useEffect(() => {
        if (Class === 'Pre-Nursery' || Class === 'L.K.G' || Class === 'U.K.G' || Class === 'U.K.J') {
            ClassRange = 'Pre-Nursery - U.K.J'
        } else {
            ClassRange = '1st-12th'
        }
    }, [Class]);

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            handleTimeFetch();
        }
    }, [ClassRange]);

    const handleTimeFetch = async () => {
        console.log(authState?.accessToken)
        console.log('classaaa', ClassRange)
        try {
            const response = await axios.post(`${BASE_URL}/timeTableStructure/fetch`, {
                classRange: ClassRange,
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    },
                });

            if (response.status === 200) {
                console.log('response from fetch', response.data);
                if (response.data) {
                    setTimetableStructure(response.data);
                    console.log('ressssss', response.data)
                } else {
                    // setShowTimetable(false);
                }
            }
        } catch (err) {
            console.error(err);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleTimeFetch();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        }

    }

    useEffect(() => {
        if (fetchedTimeTableStructure != null) {
            handleFetch();
        }
    }, [fetchedTimeTableStructure]);

    const handleFetch = async () => {
        console.log(authState?.userDetails?.currentClass, authState?.userDetails?.section);
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/timetable/fetch/student`, {
                class: authState?.ClassDetails?.class,
                section: authState?.ClassDetails?.section,
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
            console.error('Error fetching data:', error);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleFetch();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className={`flex flex-col w-full ${bgClass} rounded-lg shadow-lg p-6 mobile:max-tablet:px-2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-3xl mobile:max-laptop:text-lg font-bold ${textClass} mb-4 mobile:max-laptop:mb-0`}>
                    Time Table
                </h1>
            </div>

            <div className={`w-full ${cardBgClass} rounded-lg shadow overflow-auto ${borderClass}`}>
                <table className='w-full'>
                    <TimeTableHeader
                        fields={fetchedTimeTableStructure?.lectureStructure}
                        numberOfLecturesBeforeLunch={fetchedTimeTableStructure?.numberOfLeacturesBeforeLunch}
                        darkMode={darkMode}
                    />
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4"><Loading /></td></tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className={`px-4 py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            days.map((day, index) => (
                                <LeactureTile
                                    fetchedTimeTableStructure={fetchedTimeTableStructure}
                                    day={day}
                                    data={data}
                                    index={index}
                                    key={index}
                                    darkMode={darkMode}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}