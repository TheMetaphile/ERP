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
    const { authState, darkMode } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [fetchedTimeTableStructure, setTimetableStructure] = useState(null);
    const days = ["monday", 'tuesday', 'wednesday', 'thursday', "friday", 'saturday'];

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
    const textClass = darkMode ? 'text-white' : 'text-gray-800';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-500';
    const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

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
                if (response.data) {
                    setTimetableStructure(response.data);
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
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/timetable/fetch/student`, {
                class: authState?.userDetails?.currentClass,
                section: authState?.userDetails?.section,
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    },
                });

            if (response.status === 200) {
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
            className={`flex flex-col w-full ${bgClass} rounded-lg shadow-lg p-6 mobile:max-tablet:px-2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-3xl mobile:max-laptop:text-lg font-bold ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-800'} mb-4 mobile:max-laptop:mb-0`}>
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
                                <td colSpan="4" className={`px-4 py-8 text-center ${subTextClass}`}>
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            days.map((day, index) => (
                                <LeactureTile
                                    numberOfLeacturesBeforeLunch={fetchedTimeTableStructure.numberOfLeacturesBeforeLunch}
                                    day={day}
                                    data={data}
                                    index={index}
                                    key={index}
                                    subjects={authState?.subjects}
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