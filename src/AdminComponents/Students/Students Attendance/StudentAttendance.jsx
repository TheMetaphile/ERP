import React, { useEffect, useContext, useState } from "react";
import AttendanceStatusGridTile from "./utils/AttendanceStatusGridTile";
import SearchBar from "./utils/SearchBar";
import axios from 'axios';
import Loading from "../../../LoadingScreen/Loading";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Attendence } from "../../../Config";

export default function StudentAttendance() {

    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    // State to control the dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);

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
                console.log('data', response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching student month attendance:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [authState.accessToken]);

    return (
        <div className="flex flex-col mx-2">
            {/* Container for heading and filter button */}
            <div className="flex justify-between items-center px-2 py-2 mobile:max-tablet:border-b border-gray-300 mobile:max-tablet:fixed mobile:max-tablet:top-32 left-0 right-0 bg-white mb-4 mobile:max-tablet:mb-0 mobile:max-tablet:py-4">
                <div className="text-3xl mx-2 px-4 mobile:max-tablet:text-xl mobile:max-tablet:px-2 mobile:max-tablet:">Student's Attendance Details</div>
                <div className="mobile:max-tablet:block hidden">
                    {/* Ensure this is hidden on medium and larger screens */}
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className="absolute bg-white shadow-lg py-2 mobile:max-tablet:my-3 rounded right-1 left-1 z-20 justify-center flex">
                            <SearchBar
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Original SearchBar for non-mobile screens */}
            <div className="w-full desktop:block hidden mobile:max-tablet:mt-14">
                <SearchBar
                />
            </div>

            {loading ? (
                <Loading />
            ) : !data ? (
                <div className=" flex flex-col shadow-lg rounded-lg border-gray-200 mb-4 ">
                    <div className="mx-4 text-xl px-4 mt-4">
                        No data available
                    </div>
                </div>
            ) : (
                <div className="flex flex-col shadow-lg rounded-lg border-gray-200 mb-4 mobile:max-tablet:mt-20">
                    <div className=" text-xl px-4 mt-4 mobile:max-tablet:text-sm ">
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
