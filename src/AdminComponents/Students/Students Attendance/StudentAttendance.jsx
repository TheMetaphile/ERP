import React, { useEffect, useContext, useState } from "react";
import AttendanceStatusGridTile from "./utils/AttendanceStatusGridTile";
import SearchBar from "./utils/SearchBar";
import axios from 'axios'
import Loading from "../../../LoadingScreen/Loading";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Attendence } from "../../../Config";

export default function StudentAttendance() {

    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const today = new Date();
                const month = parseInt(today.getMonth() + 1, 10);
                const year = today.getFullYear();
                const response = await axios.get(`${BASE_URL_Attendence}/studentAttendance/fetch/classTeacher?month=${month}&year=${year}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                console.log('data', response.data)
                setData(response.data)
            } catch (error) {
                console.error("Error fetching student month attendance:", error);
            }
            finally {
                setLoading(false)
            }
        };

        fetchStudents();
    }, [authState.accessToken]);


    return (
        <div className="flex flex-col mx-2 mt-4">
            <div className="text-3xl mx-2 px-4">Student's Attendance Details</div>
            <div className="mx-2 mt-4">
                <SearchBar />
            </div>
            {loading ? (
                <Loading />
            ) : !data ? (
                <div className="flex flex-col shadow-lg rounded-lg border-gray-200 mb-4">
                    <div className="mx-4 text-xl px-4 mt-4">
                        No data available
                    </div>
                </div>
            ) : (
                <div className="flex flex-col shadow-lg rounded-lg border-gray-200 mb-4">
                    <div className="mx-4 text-xl px-4 mt-4">
                        Attendance Sheet Of Class {data.output.class} {data.output.section} April, 2024
                    </div>
                    <div className="px-3">
                        <AttendanceStatusGridTile data={data} />
                    </div>
                </div>
            )}
        </div>
    )
}