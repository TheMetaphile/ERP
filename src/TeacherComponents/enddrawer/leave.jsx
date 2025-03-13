import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL } from "../../Config";
import { FaCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Leave() {
    const { authState, darkMode } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        if (currentMonth > 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }

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
            }
            finally {
                setLoading(false)
            }
        };
        fetchStats();
    }, [authState?.accessToken]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    return (
        <motion.div
            className={`mt-3 p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'
                }`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <motion.div
                    className={`w-full text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                    variants={itemVariants}
                >
                    No notices available
                </motion.div>
            ) : (
                <motion.div className="space-y-3" variants={containerVariants}>
                    {[
                        {
                            color: 'green',
                            label: 'Accepted Leaves',
                            value: details.accepted
                        },
                        {
                            color: 'red',
                            label: 'Rejected Leaves',
                            value: details.rejected
                        },
                        {
                            color: 'yellow',
                            label: 'Pending Leaves',
                            value: details.pending
                        }
                    ].map((item, index) => (
                        <motion.h4
                            key={index}
                            className={`font-medium text-sm overflow-hidden flex items-center gap-2 ${darkMode
                                ? `text-${item.color}-400`
                                : `text-${item.color}-500`
                                }`}
                            variants={itemVariants}
                        >
                            <FaCircle className={`${darkMode
                                ? `text-${item.color}-400`
                                : `text-${item.color}-500`
                                }`} />
                            {item.label}: {item.value}
                        </motion.h4>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}