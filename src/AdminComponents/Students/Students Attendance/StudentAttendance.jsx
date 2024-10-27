import React, { useEffect, useContext, useState } from "react";
import AttendanceStatusGridTile from "./utils/AttendanceStatusGridTile";
import SearchBar from "./utils/SearchBar";
import axios from 'axios';
import Loading from "../../../LoadingScreen/Loading";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Attendence } from "../../../Config";
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';

export default function StudentAttendance() {

    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    // State to control the dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [error, setError] = useState('');

    const [Class, setClass] = useState(localStorage.getItem('Class') || '');
    const handleClassChange = (event) => {
        setClass(event.target.value);
    };

    const [Section, setSection] = useState(localStorage.getItem('Section') || '');
    const handleSectionChange = (event) => {
        setSection(event.target.value);
    };

    const [Month, setMonth] = useState(localStorage.getItem('Month') || '');
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const [bothEventsCalled, setBothEventsCalled] = useState(false);
    const handlebothEventsCalled = (event) => {
        setBothEventsCalled(true);
    };

    useEffect(() => {
        localStorage.setItem('Class', Class);
        localStorage.setItem('Section', Section);
        localStorage.setItem('Month', Month);
    }, [Class, Section, Month]);

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

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="flex flex-col mx-2  min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="flex justify-between items-center  py-4  text-black mb-4 mobile:max-tablet:mb-0"
                variants={itemVariants}
            >
                <h1 className="text-3xl font-semibold mobile:max-tablet:text-lg">
                    Student's Attendance Details
                </h1>
                <motion.button
                    className="p-2 bg-purple-500 rounded-full shadow-md hover:bg-purple-400 transition-colors duration-200 mobile:max-tablet:block hidden"
                    onClick={() => setDropdownVisible(!isDropdownVisible)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaFilter />
                </motion.button>
            </motion.div>

            {isDropdownVisible && (
                <motion.div
                    className="absolute bg-white py-2 rounded-lg shadow-xl right-4 left-4 z-20 mobile:max-tablet:mt-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <SearchBar />
                </motion.div>
            )}

            <motion.div className="w-full mb-4 mobile:max-tablet:hidden
            " variants={itemVariants}>
                <SearchBar
                    Class={Class}
                    Section={Section}
                    Month={Month}
                    handleClassChange={handleClassChange}
                    handleSectionChange={handleSectionChange}
                    handlebothEventsCalled={handlebothEventsCalled}
                    handleMonthChange={handleMonthChange}
                />
            </motion.div>

            <motion.div
                className="flex-grow"
                variants={itemVariants}
            >
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div className=" flex flex-col shadow-lg rounded-lg border-gray-200 mb-4 text-purple-600 text-center pt-3">
                        {error}
                    </div>
                ) : !data ? (
                    <div className=" flex flex-col shadow-lg rounded-lg border-gray-200 mb-4 text-purple-600 text-center pt-3">
                        <div className="mx-4 text-xl px-4 mt-4">
                            No data available
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col rounded-lg border-gray-200 mb-4 mobile:max-tablet:">
                        <div className=" text-xl px-4 mt-4 mobile:max-tablet:text-sm ">                         Attendance Sheet Of Class {Class} {Section}, {year}                     </div>
                        <div className="px-3 mobile:max-tablet:px-0">
                            <AttendanceStatusGridTile data={data} month={Month} />
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}
