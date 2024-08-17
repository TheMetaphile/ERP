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
import { BASE_URL_Student_Leave } from "../../Config";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "../Attendance/utils/CalendarTile";
import { ToastContainer } from "react-toastify";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function Leave() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({ approved: 0, pending: 0, rejected: 0 });
    const [additionalData, setAdditionalData] = useState([]);
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/stats`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                setDetails(response.data);
                console.log('fetch', response.data);
            } catch (error) {
                console.error("Error fetching student stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [authState.accessToken]);

    const handleNewLeave = (newLeave) => {
        console.log('leave.jsx');
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
            backgroundColor: ['#4caf50', '#FE8D01', '#ff0000'],
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
            className="flex flex-col px-3 overflow-y-auto items-start mt-2 ml-2 mr-3 mobile:max-tablet:mx-0 pb-4 no-scrollbar"
        >
            <ToastContainer />
            <h1 className='text-2xl font-bold mb-6 text-indigo-700'>Your Leave Dashboard</h1>
            {loading ? (
                <Loading />
            ) : (
                <div className='grid grid-cols-4 mobile:max-tablet:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8'>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col items-center justify-center'
                    >
                        <div className='w-40 mobile:max-tablet:w-24 mobile:max-tablet:h-24 h-40 mb-4'>
                            <Doughnut data={chartData} options={options} />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap mobile:max-tablet:text-sm">Total Leave Status</h2>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='bg-white rounded-xl shadow-md  p-6 border border-gray-200 flex flex-col items-center justify-center'
                    >
                        <ProgressCard
                            title='Approved'
                            percent={details.approved}
                            centerText={details.approved}
                            trailColor='#c8ebc9'
                            strokeColor='#4caf50'
                        />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col items-center justify-center'
                    >
                        <ProgressCard
                            title='Pending'
                            percent={details.pending}
                            centerText={details.pending}
                            trailColor='#FFD8B2'
                            strokeColor='#FE8D01'
                        /></motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className='bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col items-center justify-center'
                    >
                        <ProgressCard
                            title='Rejected'
                            percent={details.rejected}
                            centerText={details.rejected}
                            trailColor='#ffd6d6'
                            strokeColor='#ff0000'
                        />
                    </motion.div>
                </div>
            )}

            <div className="flex w-full mb-8 gap-3 mobile:max-tablet:flex-col">
                <div className="flex-1">
                    <Calendar month={new Date().getMonth() + 1} year={new Date().getFullYear()} />
                </div>
                <div className="flex-1 ">
                    <ApplyLeave onNewLeave={handleNewLeave} />
                </div>
            </div>

            <div className="flex items-center justify-between w-full mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Leave History</h2>
                <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-indigo-500" />
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <AttendenceTable additionalData={additionalData} status={status} />
        </motion.div>
    )
}