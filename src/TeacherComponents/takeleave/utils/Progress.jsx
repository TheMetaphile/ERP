import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaChartBar, FaSpinner } from "react-icons/fa";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_TeacherLeave } from "../../../Config";
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
        labels: ['Accepted', 'Rejected', 'Pending'],
        datasets: [{
            label: 'Attendance',
            data: [details.accepted, details.rejected, details.pending],
            backgroundColor: ['#4F46E5', '#EF4444', '#FBBF24'],
            bg: ['text-blue-600', 'text-red-600', 'text-yellow-500'],
            hoverOffset: 4,
            cutout: "80%",
            borderRadius: 60,
            borderColor: "transparent",
        }]
    };

    const chartData2 = {
        labels: ['Casual', 'Complimentry', 'Duty', 'Earned', 'Maternity', 'Medical', 'Restricted'],
        datasets: [{
            label: 'Attendance',
            data: [details.casual, details.complimentary, details.duty, details.earned, details.maternity, details.medical, details.restricted],
            backgroundColor: ['#4F46E5', '#10B981', '#FBBF24', '#F97316', '#3B82F6', '#8B5CF6', '#EC4899'],
            bg: ['text-blue-600', 'text-green-600', 'text-yellow-500', 'text-orange-500', 'text-blue-500', 'text-purple-500', 'text-pink-500'],
            hoverOffset: 4,
            cutout: "80%",
            borderRadius: 60,
            borderColor: "transparent",
        }]
    };

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_TeacherLeave}/teacherleave/fetch/stats?session=${getCurrentSession()}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                setDetails(response.data);
            } catch (error) {
                console.error("Error fetching teacher stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [authState.accessToken]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col  mobile:max-tablet:px-0 mobile:max-tablet:mx-0 items-start mb-3 no-scrollbar"
        >
            {loading ? (
                <div className="flex items-center justify-center w-full h-72">
                    <FaSpinner className="animate-spin text-4xl text-blue-600" />
                </div>
            ) : (
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                    className="flex mobile:max-tablet:flex-col items-center gap-6 w-full py-4 mobile:max-laptop:gap-6 justify-start overflow-auto"
                >
                    <div className="tablet:flex-1 h-80 mobile:max-tablet:text-lg mobile:max-tablet:w-full">
                        <DoughnutSecond chartData={chartData} title='Leave Status' />
                    </div>
                    <div className="tablet:flex-1 h-80 mobile:max-tablet:text-lg mobile:max-tablet:h-fit w-full">
                        <DoughnutSecond chartData={chartData2} title='Leave Types' />
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}