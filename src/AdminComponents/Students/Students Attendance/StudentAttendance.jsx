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
    const [error, setError] = useState('');

    const [Class, setClass] = useState('');
    const handleClassChange = (event) => {
        setClass(event.target.value);
    };

    const [Section, setSection] = useState('');
    const handleSectionChange = (event) => {
        setSection(event.target.value);
    };

    const [Month, setMonth] = useState('');
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const [bothEventsCalled, setBothEventsCalled] = useState(false);
    const handlebothEventsCalled = (event) => {
        setBothEventsCalled(true);
    };

    useEffect(() => {
        if (bothEventsCalled) {
            console.log(Class);
            console.log(Section);
            setBothEventsCalled(false);
        }
    }, [Class, Section, bothEventsCalled]);

    const today = new Date();
    const month = parseInt(today.getMonth() + 1, 10);
    const year = today.getFullYear();

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            setError('')
            try {

                console.log(Class, Section, Month, year)

                const response = await axios.get(`${BASE_URL_Attendence}/studentAttendance/fetch/admin?month=${month}&year=${year}&class=${Class}&section=${Section}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                if (response.status === 200) {
                    console.log('data', response.data);
                    setData(response.data);
                }

            } catch (error) {
                console.error("Error fetching student month attendance:", error);
                setError(error.response.data.error)
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [authState.accessToken, Class, Section, Month]);

    return (
        <div className="flex flex-col mx-2">
            {/* Container for heading and filter button */}
            <div className="flex justify-between items-center px-2 py-2 mobile:max-tablet:border-b border-gray-300 mobile:max-tablet:fixed mobile:max-tablet:top-32 left-0 right-0 bg-white mb-4 mobile:max-tablet:mb-0 mobile:max-tablet:py-4">
                <div className="text-2xl mobile:max-tablet:text-xl mobile:max-tablet:px-2 mobile:max-tablet:">Student's Attendance Details</div>
                <div className="mobile:max-tablet:block hidden">
                    {/* Ensure this is hidden on medium and larger screens */}
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className="absolute bg-white  py-2 mobile:max-tablet:my-3 rounded right-1 left-1 z-20 justify-center flex">
                            <SearchBar
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Original SearchBar for non-mobile screens */}
            <div className="w-full desktop:block hidden mobile:max-tablet:mt-14">
                <SearchBar
                    Class={Class}
                    Section={Section}
                    Month={Month}
                    handleClassChange={handleClassChange}
                    handleSectionChange={handleSectionChange}
                    handlebothEventsCalled={handlebothEventsCalled}
                    handleMonthChange={handleMonthChange}
                />
            </div>

            {loading ? (
                <Loading />
            ) : error ? (
                <div className=" flex flex-col shadow-lg rounded-lg border-gray-200 mb-4 ">
                    {error}
                </div>
            ) : !data ? (
                <div className=" flex flex-col shadow-lg rounded-lg border-gray-200 mb-4 ">
                    <div className="mx-4 text-xl px-4 mt-4">
                        No data available
                    </div>
                </div>
            ) : (
                <div className="flex flex-col shadow-lg rounded-lg border-gray-200 mb-4 mobile:max-tablet:mt-20">
                    <div className=" text-xl px-4 mt-4 mobile:max-tablet:text-sm ">
                        Attendance Sheet Of Class {Class} {Section}, {year}
                    </div>
                    <div className="px-3">
                        <AttendanceStatusGridTile data={data} month={Month}/>
                    </div>
                </div>
            )}
        </div>
    )
}
