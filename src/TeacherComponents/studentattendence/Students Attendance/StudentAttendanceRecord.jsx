import React, { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import AttendanceStatusGridTile from "./utils/AttendanceStatusGridTile";
import SearchBar from "./utils/SearchBar";
import Loading from "../../../LoadingScreen/Loading";
import axios from 'axios';
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Attendence } from "../../../Config";

export default function StudentAttendanceRecord() {
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const todayDate = new Date();
    const [month, setMonth] = useState(todayDate.getMonth() + 1);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const month1 = todayDate.getMonth() + 1 < 10 ? `0${todayDate.getMonth() + 1}` : todayDate.getMonth() + 1;
                const formattedDate = `${todayDate.getFullYear()}-${month1}-${todayDate.getDate()}`;
                const response = await axios.get(`${BASE_URL_Attendence}/studentAttendance/fetch/classTeacher?month=${month}&year=${todayDate.getFullYear()}&date=${formattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
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
    }, [authState.accessToken, month]);

    const handleMonthChange = (month) => {
        setMonth(Number(month));
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col h-screen items-start mb-3 bg-gray-50"
        >
            <div className="container mx-auto py-6 px-4">
                <div className="flex justify-between items-center mb-6 flex-wrap">
                    <h1 className="text-3xl font-bold text-gray-800">Student's Attendance Details</h1>
                    <SearchBar handleMonthChange={handleMonthChange} month={month} />
                </div>

                {loading ? (
                    <Loading />
                ) : !data ? (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <p className="text-xl text-gray-600">No data available</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Attendance Sheet of Class {data.output.class} {data.output.section}
                            </h2>
                            <p className="text-lg text-gray-600 mt-2">
                                {monthNames[month - 1]} {todayDate.getFullYear()}
                            </p>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <AttendanceStatusGridTile data={data} month={month} />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}