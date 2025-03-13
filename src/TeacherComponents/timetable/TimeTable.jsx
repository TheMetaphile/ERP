import React, { useState, useContext, useEffect } from 'react'
import Selection from './utils/Selection'
import Table from './utils/Table'
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { BASE_URL } from '../../Config';
import TableSubstitute from './utils/TableSubstitue';
import TimeTableHeader from './utils/TimeTableHeader';

function TimeTable() {
    const [data, setData] = useState([]);
    const { authState, darkMode } = useContext(AuthContext);
    const [day, setDay] = useState('tuesday');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [selectClass, setClass] = useState(authState?.ClassDetails?.class);
    const [fetchedTimeTableStructure, setTimetableStructure] = useState(null);
    const [lectureTimes, setLectureTimes] = useState([]);
    const [subsData, setSubsData] = useState([]);
    const days = ["monday", 'tuesday', 'wednesday', 'thursday', "friday", 'saturday'];

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
        if (fetchedTimeTableStructure != null) {
            handleSearch();
            fetchSubstitute();
        }
    }, [fetchedTimeTableStructure]);



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
                setTimetableStructure(response.data);
                console.log('ressssss', response.data)
            }


        } catch (err) {
            console.error(err);

        }

    }

    const handleSearch = async () => {
        console.log('hhha', authState?.userDetails?.email, day)
        setLoading(true);

        try {

            const response = await axios.post(`${BASE_URL}/timetable/fetch/teacher`, {

            },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    },
                });

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
            const response = await axios.get(`${BASE_URL}/LectureSubstitute/fetch/checkSubstitute?date=${formattedDate}&session=${session}`,
                {
                    headers: {
                        'Authorization': `Bearer ${authState?.accessToken}`
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
        <div className={`flex w-full flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
            }`}>
            <div className='w-full items-center flex justify-between mobile:max-tablet:px-3 pt-3 mobile:max-tablet:pt-0'>
                <h1 className={`text-3xl mobile:max-tablet:text-lg font-medium ${darkMode ? 'text-white' : 'text-black'
                    } mb-2`}>
                    Time Table
                </h1>
            </div>

            <div className='w-full mobile:max-tablet:px-2 mt-4 mobile:max-tablet:mt-2'>
                {loading ? (
                    <Loading />
                ) : !fetchedTimeTableStructure ? (
                    <div className={`${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                        No Data available
                    </div>
                ) : (
                    <table className='w-full'>
                        <TimeTableHeader
                            fields={fetchedTimeTableStructure?.lectureStructure}
                            numberOfLecturesBeforeLunch={fetchedTimeTableStructure?.numberOfLeacturesBeforeLunch}
                            darkMode={darkMode}
                        />
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4">
                                        <Loading />
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className={`px-4 py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}
                                    >
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                days.map((day, index) => (
                                    <Table
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
                )}
            </div>

            <div className='w-full mobile:max-tablet:px-2 mt-4'>
                {fetchLoading ? (
                    <Loading />
                ) : !fetchedTimeTableStructure ? (
                    <div className={`${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                        No Data available
                    </div>
                ) : (
                    <>
                        <h1 className={`text-3xl mobile:max-tablet:text-lg font-medium ${darkMode ? 'text-white' : 'text-black'
                            } mb-3`}>
                            Today Substitute Time Table
                        </h1>

                        <TableSubstitute
                            data={subsData}
                            Time={lectureTimes}
                            numberOfLeacturesBeforeLunch={fetchedTimeTableStructure.numberOfLeacturesBeforeLunch}
                            darkMode={darkMode}
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