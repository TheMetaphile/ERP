import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import AttendenceTable from './utils/AttendenceTable';
import ApplyLeave from './utils/ApplyLeave'
import ProgressCard from '../assignment_report/utils/progressCard';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL } from "../../Config";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "../Attendance/utils/CalendarTile";
import { ToastContainer } from "react-toastify";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function Leave() {
    const { authState, darkMode } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({ approved: 0, pending: 0, rejected: 0 });
    const [additionalData, setAdditionalData] = useState([]);
    const [status, setStatus] = useState('Pending');

    // Dark mode classes
    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-800';
    const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
    const selectClass = darkMode
        ? 'bg-gray-700 text-white border-gray-600 focus:ring-indigo-600'
        : 'bg-white text-black border-gray-300 focus:ring-indigo-500';

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/leave/fetch/stats`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                });
                setDetails(response.data);
            } catch (error) {
                console.error("Error fetching student stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [authState?.accessToken]);

    const handleNewLeave = (newLeave) => {
        setAdditionalData([newLeave]);
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    const chartData = {
        datasets: [{
            data: [details.approved, details.pending, details.rejected],
            backgroundColor: darkMode
                ? ['#2ecc71', '#f39c12', '#e74c3c']  // Darker shades for dark mode
                : ['#4caf50', '#FE8D01', '#ff0000'],
            hoverOffset: 4,
            cutout: "82%",
            borderRadius: 20,
            borderColor: "transparent"
        }]
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col px-3 overflow-y-auto items-start mt-2 ml-2 mr-3 mobile:max-tablet:mx-0 pb-4 no-scrollbar ${bgClass} ${textClass}`}
        >
            <ToastContainer />
            <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>
                Your Leave Dashboard
            </h1>
            {loading ? (
                <Loading />
            ) : (
                <div className='grid grid-cols-4 mobile:max-tablet:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8'>
                    {[
                        {
                            component: <Doughnut data={chartData} options={options} />,
                            title: 'Total Leave Status'
                        },
                        {
                            component: <ProgressCard
                                title='Approved'
                                percent={details.approved}
                                centerText={details.approved}
                                trailColor={darkMode ? '#2ecc71' : '#c8ebc9'}
                                strokeColor={darkMode ? '#27ae60' : '#4caf50'}
                            />,

                        },
                        {
                            component: <ProgressCard
                                title='Pending'
                                percent={details.pending}
                                centerText={details.pending}
                                trailColor={darkMode ? '#f39c12' : '#FFD8B2'}
                                strokeColor={darkMode ? '#d35400' : '#FE8D01'}
                            />,

                        },
                        {
                            component: <ProgressCard
                                title='Rejected'
                                percent={details.rejected}
                                centerText={details.rejected}
                                trailColor={darkMode ? '#e74c3c' : '#ffd6d6'}
                                strokeColor={darkMode ? '#c0392b' : '#ff0000'}
                            />,

                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className={`${cardBgClass} rounded-xl shadow-md p-6 ${borderClass} flex flex-col items-center justify-center`}
                        >
                            <div className='w-40 mobile:max-tablet:w-24 mobile:max-tablet:h-24 h-40 mb-4'>
                                {item.component}
                            </div>
                            <h2 className={`text-lg font-semibold whitespace-nowrap mobile:max-tablet:text-sm ${subTextClass}`}>
                                {item.title}
                            </h2>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="flex w-full mb-8 gap-3 mobile:max-tablet:flex-col">
                <div className="flex-1">
                    <Calendar
                        month={new Date().getMonth() + 1}
                        year={new Date().getFullYear()}
                        darkMode={darkMode}
                    />
                </div>
                <div className="flex-1">
                    <ApplyLeave
                        onNewLeave={handleNewLeave}
                        darkMode={darkMode}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between w-full mb-6">
                <h2 className={`text-xl font-semibold ${subTextClass}`}>Leave History</h2>
                <div className="flex items-center space-x-2">
                    <FaCalendarAlt className={darkMode ? 'text-indigo-400' : 'text-indigo-500'} />
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${selectClass}`}
                    >
                        <option
                            value="Pending"
                            className={darkMode ? 'bg-gray-800' : 'bg-white'}
                        >
                            Pending
                        </option>
                        <option
                            value="Approved"
                            className={darkMode ? 'bg-gray-800' : 'bg-white'}
                        >
                            Approved
                        </option>
                        <option
                            value="Rejected"
                            className={darkMode ? 'bg-gray-800' : 'bg-white'}
                        >
                            Rejected
                        </option>
                    </select>
                </div>
            </div>

            <AttendenceTable
                additionalData={additionalData}
                status={status}
                darkMode={darkMode}
            />
        </motion.div>
    )
}