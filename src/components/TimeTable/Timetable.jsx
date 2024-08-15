import React, { useState, useContext, useEffect } from 'react';
import LeactureTile from "./utils/LectureTile";
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios';
import TimeTableHeader from './utils/TimeTableHeader'
import { BASE_URL_TimeTableStructure, BASE_URL_TimeTable } from '../../Config';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

export default function TimeTable() {
    const [data, setData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [day, setDay] = useState('tuesday');
    const [fetchedTimeTableStructure, setTimetableStructure] = useState(null);

    const [lectureTimes, setLectureTimes] = useState([]);

    var ClassRange = null;
    const Class = authState.userDetails.currentClass;
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


    const handleDayChange = (event) => {
        const value = event.target.value;
        setDay(value);
    };


    const calculateLectureTimes = () => {
        if (!fetchedTimeTableStructure) {
            return;
        }
        const { firstLectureTiming, durationOfEachLeacture, numberOfLeacturesBeforeLunch, durationOfLunch, numberOfLecture } = fetchedTimeTableStructure;

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
        calculateLectureTimes();
    }, [fetchedTimeTableStructure]);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinutes} ${ampm}`;
    };



    const handleTimeFetch = async () => {
        console.log(authState.accessToken)
        console.log('classaaa', ClassRange)
        try {
            const response = await axios.post(`${BASE_URL_TimeTableStructure}/timeTableStructure/fetch`, {
                accessToken: authState.accessToken,
                classRange: ClassRange,
            });

            if (response.status === 200) {
                console.log('response from fetch', response.data);
                if (response.data) {
                    console.log("here", response.data.numberOfLecture);
                    const scheduleArray = [];
                    for (let i = 0; i < response.data.numberOfLecture; i++) {
                        scheduleArray.push({
                            subject: '',
                            teacher: ''
                        });
                    }
                    setTimetableStructure(response.data);
                    console.log('ressssss', response.data)
                } else {
                    // setShowTimetable(false);
                }
            }
        } catch (err) {
            console.error(err);

        }

    }

    useEffect(() => {
        if (fetchedTimeTableStructure != null) {
            handleFetch();
        }
    }, [fetchedTimeTableStructure, day]);

    const handleFetch = async () => {
        console.log(authState.userDetails.currentClass, authState.userDetails.section, day);
        setLoading(true);
        try {

            const response = await axios.post(`${BASE_URL_TimeTable}/timetable/fetch/student`, {
                accessToken: authState.accessToken,
                class: authState.userDetails.currentClass,
                section: authState.userDetails.section,
                day: day
            });
            if (response.status === 200) {
                console.log('response from fetchh', response.data);
                if (response.data[day].length > 0) {
                    setData(response.data);
                } else {
                    setData([]);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="flex flex-col w-full bg-gray-50 rounded-lg shadow-lg p-6 mobile:max-tablet:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl mobile:max-laptop:text-lg font-bold text-gray-800 mb-4 mobile:max-laptop:mb-0">
                    Time Table
                </h1>
                <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-600 mr-2" />
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        value={day}
                        onChange={handleDayChange}
                    >
                        <option value="">Select Day</option>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                            <option key={d.toLowerCase()} value={d.toLowerCase()}>{d}</option>
                        ))}
                    </select>

                </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow overflow-auto">
                <table className='w-full'>
                    <TimeTableHeader />
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4"><Loading /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan="4" className="px-4 py-8 text-center text-gray-500">No data available</td></tr>
                        ) : (
                            lectureTimes.map((time, index) => (
                                <LeactureTile
                                    key={index}
                                    index={index}
                                    lectureNo={`${index + 1}`}
                                    Time={`${formatTime(time.start)}-${formatTime(time.end)}`}
                                    numberOfLecturesBeforeLunch={fetchedTimeTableStructure.numberOfLecturesBeforeLunch}
                                    data={data}
                                    day={day}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}