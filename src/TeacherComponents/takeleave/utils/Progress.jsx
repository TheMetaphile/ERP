import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaChartBar, FaSpinner } from "react-icons/fa";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL } from "../../../Config";
import DoughnutSecond from "./DoughnutSecond";
import { refreshAccessToken } from "../../../RefreshTokenHelper";
import { toast } from "react-toastify";

export default function Progress({ darkMode }) {
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const spinnerClass = darkMode ? 'text-blue-400' : 'text-blue-600';

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
            backgroundColor: darkMode
                ? ['#4338ca', '#b91c1c', '#d97706']  // Darker shades for dark mode
                : ['#4F46E5', '#EF4444', '#FBBF24'],
            bg: darkMode
                ? ['text-indigo-600', 'text-red-600', 'text-yellow-500']
                : ['text-blue-600', 'text-red-600', 'text-yellow-500'],
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
            data: [
                details.casual,
                details.complimentary,
                details.duty,
                details.earned,
                details.maternity,
                details.medical,
                details.restricted
            ],
            backgroundColor: darkMode
                ? ['#4338ca', '#047857', '#d97706', '#c2410c', '#1d4ed8', '#7c3aed', '#be185d']  // Darker shades
                : ['#4F46E5', '#10B981', '#FBBF24', '#F97316', '#3B82F6', '#8B5CF6', '#EC4899'],
            bg: darkMode
                ? ['text-indigo-600', 'text-green-600', 'text-yellow-500', 'text-orange-500', 'text-blue-500', 'text-purple-500', 'text-pink-500']
                : ['text-blue-600', 'text-green-600', 'text-yellow-500', 'text-orange-500', 'text-blue-500', 'text-blue-500', 'text-pink-500'],
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
                const response = await axios.get(`${BASE_URL}/teacherleave/fetch/stats?session=${getCurrentSession()}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                });
                setDetails(response.data);
            } catch (error) {
                console.error("Error fetching teacher stats:", error);
                if (
                    error.response &&
                    error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                ) {
                    toast.warn('Access denied. Attempting to refresh token...');
                    try {
                        const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                        await fetchStats();
                    } catch (refreshError) {
                    }
                } else {
                    toast.error(error.response?.data?.error || "An error occurred");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [authState?.accessToken]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`
                flex flex-col mobile:max-tablet:px-0 
                mobile:max-tablet:mx-0 items-start 
                mb-3 no-scrollbar ${bgClass}
            `}
        >
            {loading ? (
                <div className="flex items-center justify-center w-full h-72">
                    <FaSpinner className={`animate-spin text-4xl ${spinnerClass}`} />
                </div>
            ) : (
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                    className="flex mobile:max-tablet:flex-col items-center gap-6 w-full py-4 mobile:max-laptop:gap-6 justify-start overflow-auto"
                >
                    <div className="tablet:flex-1 h-80 mobile:max-tablet:text-lg mobile:max-tablet:w-full">
                        <DoughnutSecond
                            chartData={chartData}
                            title='Leave Status'
                            darkMode={darkMode}
                        />
                    </div>
                    <div className="tablet:flex-1 h-80 mobile:max-tablet:text-lg mobile:max-tablet:h-fit w-full">
                        <DoughnutSecond
                            chartData={chartData2}
                            title='Leave Types'
                            darkMode={darkMode}
                        />
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}