import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_TeacherLeave } from "../../Config";
import { FaCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Leave() {
    const { authState } = useContext(AuthContext);
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
            console.log(getCurrentSession());
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_TeacherLeave}/teacherleave/fetch/stats?session=${getCurrentSession()}`, {
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
            className="mt-3 p-4 bg-white rounded-lg shadow-md"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <motion.div
                    className="w-full text-center text-gray-500"
                    variants={itemVariants}
                >
                    No notices available
                </motion.div>
            ) : (
                <motion.div className="space-y-3" variants={containerVariants}>
                    <motion.h4
                        className="font-medium text-sm overflow-hidden text-green-500 flex items-center gap-2"
                        variants={itemVariants}
                    >
                        <FaCircle className="text-green-500" /> Accepted Leaves : {details.accepted}
                    </motion.h4>
                    <motion.h4
                        className="font-medium text-sm overflow-hidden text-red-500 flex items-center gap-2"
                        variants={itemVariants}
                    >
                        <FaCircle className="text-red-500" /> Rejected Leaves : {details.rejected}
                    </motion.h4>
                    <motion.h4
                        className="font-medium text-sm overflow-hidden text-yellow-500 flex items-center gap-2"
                        variants={itemVariants}
                    >
                        <FaCircle className="text-yellow-500" /> Pending Leaves : {details.pending}
                    </motion.h4>
                </motion.div>
            )}
        </motion.div>
    );
}