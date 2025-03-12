import React, { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import AttendanceStatusGridTile from "./utils/AttendanceStatusGridTile";
import SearchBar from "./utils/SearchBar";
import Loading from "../../../LoadingScreen/Loading";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL } from "../../../Config";

export default function StudentAttendanceRecord() {
    const { authState, darkMode } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const todayDate = new Date();
    const [month, setMonth] = useState(todayDate.getMonth() + 1);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
    const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-gray-800';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const month1 = todayDate.getMonth() + 1 < 10 ? `0${todayDate.getMonth() + 1}` : todayDate.getMonth() + 1;
                const formattedDate = `${todayDate.getFullYear()}-${month1}-${todayDate.getDate()}`;
                const response = await axios.get(`${BASE_URL}/studentAttendance/fetch/classTeacher?month=${month}&year=${todayDate.getFullYear()}&date=${formattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching student month attendance:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [authState?.accessToken, month]);

    const handleMonthChange = (month) => {
        setMonth(Number(month));
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full flex flex-col h-screen items-start mb-3 ${bgClass}`}
        >
            <div className="container mx-auto py-6 px-4">
                <div className="flex justify-between items-center mb-6 flex-wrap">
                    <h1 className={`text-3xl font-bold ${textClass}`}>
                        Student's Attendance Details
                    </h1>
                    <SearchBar
                        handleMonthChange={handleMonthChange}
                        month={month}
                    />
                </div>

                {loading ? (
                    <Loading />
                ) : !data ? (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`${cardBgClass} p-6 rounded-lg shadow-md`}
                    >
                        <p className={`text-xl ${subTextClass}`}>
                            No data available
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`
                            ${cardBgClass} rounded-lg 
                            shadow-md ${borderClass} 
                            overflow-hidden
                        `}
                    >
                        <div
                            className={`
                                p-6 border-b 
                                ${borderClass}
                            `}
                        >
                            <h2 className={`text-2xl font-semibold ${textClass}`}>
                                Attendance Sheet of Class {data.output.class} {data.output.section}
                            </h2>
                            <p className={`text-lg ${subTextClass} mt-2`}>
                                {monthNames[month - 1]} {todayDate.getFullYear()}
                            </p>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <AttendanceStatusGridTile
                                data={data}
                                month={month}
                                darkMode={darkMode}
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}