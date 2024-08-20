import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../Config";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

export default function Notices() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);

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
        const fetchNotice = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/teacher?start=${start}&limit=${end}&session=${getCurrentSession()}&type=${'for'}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                setDetails(response.data.notices);
                console.log('fetch', response.data);
            } catch (error) {
                console.error("Error fetching notice:", error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchNotice();
    }, [authState.accessToken]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="mt-3 mb-30 space-y-4"
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
                <>
                    {details.map((detail, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md"
                            variants={itemVariants}
                        >
                            <h4 className="flex w-full justify-start font-medium text-lg mb-2 items-start gap-2">
                                {detail.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed line-clamp-4">
                                {detail.description}
                            </p>
                            <div className="flex justify-end items-center text-gray-500 text-xs mt-2">
                                <FaCalendarAlt className="mr-1" />
                                Date: {detail.date}
                            </div>
                        </motion.div>
                    ))}
                </>
            )}
        </motion.div>
    );
}