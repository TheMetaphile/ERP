import React, { useState, useContext, useEffect } from 'react';
import LeactureTile from "./utils/LectureTile";
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios';
import TimeTableHeader from './utils/TimeTableHeader'
import { BASE_URL_TimeTableStructure, BASE_URL_TimeTable } from '../../Config';

export default function TimeTableStudent() {
    const [data, setData] = useState(null);
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
        console.log(authState.ClassDetails.class, authState.ClassDetails.section, day);
        setLoading(true);
        try {

            const response = await axios.post(`${BASE_URL_TimeTable}/timetable/fetch/student`, {
                accessToken: authState.accessToken,
                class: authState.ClassDetails.class,
                section: authState.ClassDetails.section,
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
        <div className=" flex flex-col w-full  items-start  py-3 px-3">
            <div className="flex w-full justify-between ">
                <h1 className="text-2xl mobile:max-tablet:text-lg font-medium">
                    Time Table
                </h1>

            </div>
            <div className="flex justify-between w-full items-center p-3 gap-2">
                <h1 className="text-xl mobile:max-tablet:text-sm whitespace-nowrap font-medium">
                    Day-wise Lectures
                </h1>
                <select
                    type="text"
                    className=" px-4 py-2 border rounded-md mobile:max-tablet:text-sm"
                    placeholder="Day"
                    value={day}
                    onChange={handleDayChange}
                >
                    <option value="">Select Day</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>

                </select>
            </div>
            <div className=' overflow-auto'>
                <div className='w-full rounded-lg border border-gray-400'>
                    <TimeTableHeader />
                    <div className=' w-full '>
                        {loading ? (
                            <Loading />
                        ) : data === null || data.length === 0 ? (
                            <div className=' w-full border border-gray-300 px-4 py-2 text-center'>No data available</div>
                        ) : (
                            <div className='w-full'>
                                {lectureTimes.map((time, index) => {
                                    return (
                                        <LeactureTile
                                            key={index}
                                            index={index}
                                            lectureNo={`${index + 1} `}
                                            Time={`${formatTime(time.start)}-${formatTime(time.end)}`}
                                            numberOfLeacturesBeforeLunch={fetchedTimeTableStructure.numberOfLeacturesBeforeLunch}
                                            data={data}
                                            day={day}
                                        />
                                    )

                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}