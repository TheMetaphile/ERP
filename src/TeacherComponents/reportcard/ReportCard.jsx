import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReportCard() {
    const { authState, darkMode } = useContext(AuthContext);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(1);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const headerBgClass = darkMode
        ? 'bg-gradient-to-r from-gray-800 to-gray-700'
        : 'bg-gradient-to-r from-blue-200 to-blue-100';
    const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50';
    const iconClass = darkMode
        ? { primary: 'text-blue-400', secondary: 'text-blue-500' }
        : { primary: 'text-blue-600', secondary: 'text-blue-600' };


    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start === 0 && students.length === 0 && !allDataFetched && !loading) {
            fetchStudents();
        }
    }, [start, students, allDataFetched, loading]);


    useEffect(() => {
        if (start !== 0) {
            fetchStudents();
        }
    }, [start]);

    const fetchStudents = async () => {
        if (loading || allDataFetched) return;
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/fetchMultiple/student`, {
                accessToken: authState?.accessToken,
                currentClass: authState?.ClassDetails?.class,
                section: authState?.ClassDetails?.section,
                start: start,
                end: end
            });
            if (response.status === 200) {
                const student = response.data.Students.length;
                if (student < end) {
                    toast.success('All data fetched');
                    setAllDataFetched(true);
                }
                setStudents(prevData => [...prevData, ...response.data.Students]);
            }
        } catch (error) {
            console.error("Error fetching student:", error);
            toast.error("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    console.log("Fetching more data...");
                    handleViewMore();

                }
            },
            { root: null, rootMargin: '0px', threshold: 1.0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [allDataFetched, loading]);


    const tableVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            className={`w-full px-4 py-6 ${bgClass}`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />

            <h1 className={`text-3xl mobile:max-tablet:text-lg font-medium ${textClass} mb-6`}>
                Search Report Card
            </h1>

            {loading ? (
                <Loading />
            ) : students.length === 0 ? (
                <div className={`text-center text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    No students found
                </div>
            ) : (
                <motion.div
                    className={`
                    overflow-hidden rounded-lg shadow-lg 
                    ${darkMode ? 'bg-gray-800' : 'bg-white'}
                `}
                    variants={tableVariants}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead>
                                <tr className={headerBgClass}>
                                    <th className={`py-3 px-4 text-left ${darkMode ? 'text-white' : 'text-black'}`}>
                                        Roll No.
                                    </th>
                                    <th className={`py-3 px-4 text-left ${darkMode ? 'text-white' : 'text-black'}`}>
                                        Name
                                    </th>
                                    <th className={`py-3 px-4 text-left ${darkMode ? 'text-white' : 'text-black'}`}>
                                        Class
                                    </th>
                                    <th className={`py-3 px-4 text-left ${darkMode ? 'text-white' : 'text-black'}`}>
                                        Section
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((detail, index) => (
                                    <motion.tr
                                        key={index}
                                        className={`
                                        border-b ${hoverBgClass} 
                                        transition-colors duration-200 
                                        ${darkMode ? 'border-gray-700' : ''}
                                    `}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <td className={`py-3 px-4 ${textClass}`}>
                                            <FaUserGraduate
                                                className={`inline mr-2 ${iconClass.primary}`}
                                            />
                                            {detail.rollNumber}
                                        </td>
                                        <td className={`py-3 px-4 ${textClass}`}>
                                            <Link
                                                to={`/Teacher-Dashboard/class_activity/reportcard/${detail.email}`}
                                                className="flex items-center"
                                            >
                                                <img
                                                    src={detail.profileLink}
                                                    alt="Profile"
                                                    className="w-8 h-8 rounded-full mr-2"
                                                />
                                                <span>{detail.name}</span>
                                            </Link>
                                        </td>
                                        <td className={`py-3 px-4 ${textClass}`}>
                                            <FaChalkboardTeacher
                                                className={`inline mr-2 ${iconClass.primary}`}
                                            />
                                            {authState?.ClassDetails?.class}
                                        </td>
                                        <td className={`py-3 px-4 ${textClass}`}>
                                            <FaBookOpen
                                                className={`inline mr-2 ${iconClass.primary}`}
                                            />
                                            {authState?.ClassDetails?.section}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div ref={sentinelRef} className="h-10">
                        {loading && start > 0 && (
                            <div
                                className={`
                                text-center w-full text-sm 
                                ${darkMode ? 'text-gray-400' : 'text-gray-600'}
                            `}
                            >
                                Loading more...
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default ReportCard;