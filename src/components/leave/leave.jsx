import React, { useState, useEffect, useContext } from "react";
import AttendenceTable from './utils/AttendenceTable';
import ApplyLeave from './utils/ApplyLeave'
import ProgressCard from '../assignment_report/utils/progressCard';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Student_Leave } from "../../Config";
ChartJS.register(Tooltip, Legend, ArcElement);

export default function leave() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
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
                console.log('fetch', response.data)
            } catch (error) {
                console.error("Error fetching student stats:", error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchStats();
    }, [authState.accessToken]);


    const handleNewLeave = (newLeave) => {
        console.log('leave.jsx')
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
            backgroundColor: [
                '#4caf50',
                '#FE8D01',
                '#ff0000'
            ],
            bg: ['text-red-600', 'text-green-600', 'text-yellow-400'],
            hoverOffset: 4,
            cutout: "80%",
            borderRadius: 30,
            borderColor: "transparent"
        }]
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className=" flex flex-col px-3 overflow-y-auto items-start mt-2 ml-2 mr-3 pb-4 no-scrollbar">
            <h1 className='text-xl font-medium'>Your Leave</h1>
            {loading ? (
                <Loading />
            ) : (
                <div className='flex mobile:max-tablet:flex-col border  border-gray-300 items-center gap-3 mb-4 h-fit px-5 py-3 w-full rounded-lg'>
                    <div className='flex  flex-col w-44  border border-gray-300 mobile:max-tablet:w-full h-60  rounded-lg shadow-lg  text-center font-medium text-lg '>
                        <div className='mx-2  '>
                            <Doughnut data={chartData} options={options} className='w-44 h-44' />
                        </div>
                        <h1>Total Leave Status</h1>
                    </div>
                    <ProgressCard
                        title='Approved'
                        percent={details.approved}
                        centerText={details.approved}
                        trailColor='#c8ebc9'
                        strokeColor='#4caf50'

                    />
                    <ProgressCard
                        title='Pending'
                        percent={details.pending}
                        centerText={details.pending}
                        trailColor='#FFD8B2'
                        strokeColor='#FE8D01'

                    />
                    <ProgressCard
                        title='Rejected'
                        percent={details.rejected}
                        centerText={details.rejected}
                        trailColor='#ffd6d6'
                        strokeColor='#ff0000'

                    />
                </div>
            )}

            <div className="gap-2 overflow-x-auto flex w-full tablet:justify-evenly my-4 mobile:max-tablet:flex-col items-center">
                <div className=" tablet:w-fit  py-3 mobile:max-tablet:w-full flex-grow">
                    <ApplyLeave onNewLeave={handleNewLeave} />
                </div>
            </div>
            <div className="flex items-center justify-between w-full">
                <h1 className="text-xl font-medium">Old Leave</h1>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="border border-gray-300 rounded-lg px-2 py-1"
                >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <AttendenceTable additionalData={additionalData} status={status} />

        </div>
    )
}

