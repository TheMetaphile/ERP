import React, { useState, useContext, useEffect } from 'react'
import Selection from './utils/Selection'
import Table from './utils/Table'
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { BASE_URL_TimeTableStructure, BASE_URL_TimeTable } from '../../Config';
import TableSubstitute from './utils/TableSubstitue';

function TimeTable() {
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [day, setDay] = useState('tuesday');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [selectClass, setClass] = useState(authState.ClassDetails.class);
    const [fetchedTimeTableStructure, setTimetableStructure] = useState(null);
    const [lectureTimes, setLectureTimes] = useState([]);
    const [subsData, setSubsData] = useState([]);

    var ClassRange = null;
    const Class = selectClass;

    console.log(Class)
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

    useEffect(() => {
        calculateLectureTimes();
    }, [fetchedTimeTableStructure]);

    useEffect(() => {
        if (fetchedTimeTableStructure != null) {
            handleSearch();
            fetchSubstitute();
        }
    }, [fetchedTimeTableStructure, day]);



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
        // finally {
        //     setLoading(false);
        // }
    }


    const handleDayChange = (value) => {
        setDay(value);
    };

    const handleSearch = async () => {
        console.log('hhha', authState.userDetails.email, day)
        setLoading(true);

        try {
            const payload = {
                accessToken: authState.accessToken,
                email: authState.userDetails.email,
                day: day
            };

            const response = await axios.post(`${BASE_URL_TimeTable}/timetable/fetch/teacher`, payload);
            if (response.status === 200) {
                console.log('response from fetchhh', response.data);
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
        }

    };

    const date = new Date();
    var month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const session = getCurrentSession();

    const fetchSubstitute = async () => {
        console.log(formattedDate, session)
        setFetchLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_TimeTable}/LectureSubstitute/fetch/checkSubstitute?date=${formattedDate}&session=${session}`,
                {
                    headers: {
                        'Authorization': `Bearer ${authState.accessToken}`
                    }
                });
            if (response.status === 200) {
                console.log('subs response', response.data);
                setSubsData(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setFetchLoading(false);
        }

    };

    return (
        <div className=" flex w-full flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2  mb-3 no-scrollbar ">

            <div className='w-full items-center flex justify-between mobile:max-tablet:px-3 pt-3 mobile:max-tablet:pt-0'>
                <h1 className="text-3xl mobile:max-tablet:text-lg font-bold text-blue-600 mb-2 ">Time Table</h1>


                <Selection onDayChange={handleDayChange} />
            </div>

            <div className='w-full mobile:max-tablet:px-2 mt-4 mobile:max-tablet:mt-2'>
                {loading ? (
                    <Loading />
                ) : !fetchedTimeTableStructure ?
                    (
                        <div className='text-blue-500'>No Data available</div>
                    ) :
                    (
                        <Table
                            data={data}
                            Time={lectureTimes}
                            numberOfLeacturesBeforeLunch={fetchedTimeTableStructure.numberOfLeacturesBeforeLunch}
                        />
                    )}
            </div>

            <div className='w-full mobile:max-tablet:px-2 mt-4'>
                {fetchLoading ? (
                    <Loading />
                ) : !fetchedTimeTableStructure ?
                    (
                        <>No Data available</>
                    ) :
                    (
                        <>

                            <h1 className="text-3xl mobile:max-tablet:text-lg font-bold text-blue-600 mb-3">Today Substitute Time Table</h1>


                            <TableSubstitute
                                data={subsData}
                                Time={lectureTimes}
                                numberOfLeacturesBeforeLunch={fetchedTimeTableStructure.numberOfLeacturesBeforeLunch}
                            />
                        </>
                    )}
            </div>
        </div>

    )
}

function getCurrentSession() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (currentMonth >= 3) {
        return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
        return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
}

export default TimeTable