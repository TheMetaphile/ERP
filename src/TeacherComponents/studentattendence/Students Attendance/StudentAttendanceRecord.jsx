import React, { useEffect, useContext, useState } from "react";
import AttendanceStatusGridTile from "./utils/AttendanceStatusGridTile";
import SearchBar from "./utils/SearchBar";
import Loading from "../../../LoadingScreen/Loading"
import axios from 'axios'
import AuthContext from "../../../Context/AuthContext"
import { BASE_URL_Attendence } from "../../../Config";

export default function StudentAttendanceRecord() {
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const todayDate = new Date();
    const [month, setMonth] = useState(todayDate.getMonth()+1)


    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Attendence}/studentAttendance/fetch/classTeacher?month=${month}&year=${todayDate.getFullYear()}`, {
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
    }, [authState.accessToken,month]);

    const handleMonthChange = (month)=>{
        setMonth(month);
    }

    return (
        <div className="w-full flex flex-col  mobile:max-tablet:px-0 h-screen  items-start  mb-3">
            <div className="container mx-auto py-3 px-2">
                <div className=" flex justify-between items-center mb-4">
                    <h1 className="text-2xl  font-medium"> Student's Attendance Details</h1>
                    <SearchBar handleMonthChange={handleMonthChange} month={month}/>

                </div>

            </div>


            {loading ? (
                <Loading />
            ) : !data ? (
                <div className="flex flex-col shadow-lg rounded-lg overflow-y-auto border-gray-200 mb-4">
                    <div className="mx-4 text-xl px-4 mt-4">
                        No data available
                    </div>
                </div>
            ) : (
                <div className="flex flex-col w-full shadow-md rounded-lg border border-gray-400 mb-4 ">
                    <div className="mx-2 text-xl px-2 mt-2">
                        Attendance Sheet Of Class {data.output.class} {data.output.section} April, 2024
                    </div>
                    <div className="px-3 w-full overflow-x-auto ">
                        <AttendanceStatusGridTile data={data} />
                    </div>
                </div>
            )}
        </div>
    )
}