import React, { useState, useEffect, useContext } from "react";
import ProgressCard from "../../../components/assignment_report/utils/progressCard"
import axios from "axios"
import AuthContext from "../../../Context/AuthContext"
import Loading from "../../../LoadingScreen/Loading"
import { BASE_URL_TeacherLeave } from "../../../Config"
import Doughnut from "../../../components/Home/utils/AttendanceCard/PieChart";
import DoughnutSecond from "./DoughnutSecond";

export default function Progress() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth >= 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }

    const chartData = {
        labels: [
            'Accepted',
            'Rejected',
            'Pending'
        ],
        datasets: [{
            label: 'Attendance',
            data: [details.accepted, details.rejected, details.pending],
            backgroundColor: [
                '#EB3232',
                '#7BD850',
                '#F8EE00'
            ],
            bg: ['text-red-600', 'text-green-600', 'text-yellow-400'],
            hoverOffset: 4,
            cutout: "80%",
            borderRadius: 60,
            borderColor: "transparent",
        }]
    };

    const chartData2 = {
        labels: [
            'Casual',
            'Complimentry',
            'Duty',
            'Earned',
            'Maternity',
            'Medical',
            'Restricted'
        ],
        datasets: [{
            label: 'Attendance',
            data: [details.casual, details.complimentary, details.duty, details.earned, details.maternity, details.medical, details.restricted],
            backgroundColor: [
                '#EB3232',
                '#7BD850',
                '#F8EE00',
                '#ffce8a',
                '#76c6f5',
                '#de98fa',
                '#fc8beb'
            ],
            bg: ['text-red-600', 'text-green-600', 'text-yellow-400', 'text-orange-300', 'text-blue-400','text-purple-400', 'text-pink-400'],
            hoverOffset: 4,
            cutout: "80%",
            borderRadius: 60,
            borderColor: "transparent",
        }]
    };

    useEffect(() => {
        const fetchStats = async () => {
            console.log(getCurrentSession());
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_TeacherLeave}/leave/fetch/stats?session=${getCurrentSession()}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                setDetails(response.data);
                console.log('fetch', response.data)
            } catch (error) {
                console.error("Error fetching teacher stats:", error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchStats();
    }, [authState.accessToken]);

    return (
        <div className=" flex flex-col px-3  overflow-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            {loading ? (
                <Loading />
            ) : (
                <div className=" flex flex-col tablet:flex-row items-center gap-3 w-full py-2 overflow-auto justify-start">
                    <div className="tablet:w-1/3 h-72  mobile:max-tablet:w-full ">
                        <DoughnutSecond chartData={chartData} title='Leave Status' />
                    </div>

                    <div className="tablet:w-1/3 h-72  w-full ">
                        <DoughnutSecond chartData={chartData2} title='Leave Status' />
                    </div>


                    {/* <ProgressCard
                        title={`Leave Balance`}
                        percent='40'
                        centerText='05'
                        trailColor='#c8ccc9'
                        strokeColor='#7dc5f5'
                    />
                    <ProgressCard
                        title={`Casual Leave`}
                        percent='60'
                        centerText='2'
                        trailColor='#c8ccc9'
                        strokeColor='#2196F3'
                    />
                    <ProgressCard
                        title={`Medical Leave`}
                        percent='70'
                        centerText='4'
                        trailColor='#c8ccc9'
                        strokeColor='#fa70fa'
                    />
                    <ProgressCard
                        title={`Annual Leave`}
                        percent='70'
                        centerText='7'
                        trailColor='#c8ccc9'
                        strokeColor='#ffb259'
                    />
                    <ProgressCard
                        title={`Unpaid Leave`}
                        percent='70'
                        centerText='0'
                        trailColor='#c8ccc9'
                        strokeColor='#9100ec'
                    /> */}

                </div>
            )}


        </div>

    )
}