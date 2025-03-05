import React, { useState, useContext, useEffect } from 'react';
import LeactureTile from "./utils/LectureTile";
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios';
import TimeTableHeader from './utils/TimeTableHeader'
import { BASE_URL } from '../../Config';
import { motion } from 'framer-motion';

export default function TimeTable() {
    const [data, setData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [fetchedTimeTableStructure, setTimetableStructure] = useState(null);
    const days = ["monday", 'tuesday', 'wednesday', 'thursday', "friday", 'saturday'];

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
        console.log(authState.accessToken)
        console.log('classaaa', ClassRange)
        try {
            const response = await axios.post(`${BASE_URL}/timeTableStructure/fetch`, {
                classRange: ClassRange,
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
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
                class: authState?.userDetails?.currentClass,
                section: authState?.userDetails?.section,
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    },
                });

            if (response.status === 200) {
                console.log('response from fetchh', response.data);

                setData(response.data);

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
            </div>

            <div className="w-full bg-white rounded-lg shadow overflow-auto">
                <table className='w-full'>
                    <TimeTableHeader fields={fetchedTimeTableStructure?.lectureStructure} numberOfLecturesBeforeLunch={fetchedTimeTableStructure?.numberOfLeacturesBeforeLunch} />
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4"><Loading /></td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan="4" className="px-4 py-8 text-center text-gray-500">No data available</td></tr>
                        ) : (
                            days.map((day, index) => (
                                <LeactureTile
                                    numberOfLeacturesBeforeLunch={fetchedTimeTableStructure.numberOfLeacturesBeforeLunch}
                                    day={day}
                                    data={data}
                                    index={index}
                                    key={index}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}