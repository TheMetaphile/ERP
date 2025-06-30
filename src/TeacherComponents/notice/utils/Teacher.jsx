import React, { useState, useEffect, useContext, useRef } from "react";
import TeacherTile from './TeacherTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL } from "../../../Config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { refreshAccessToken } from "../../../RefreshTokenHelper";

export default function Teacher() {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

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

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchNotice();
        }
    }, [start]);

    useEffect(() => {
        if (start === 0 && details.length === 0 && !allDataFetched && !loading) {
            fetchNotice();
        }
    }, [start, details, allDataFetched, loading]);

    const fetchNotice = async () => {
        if (loading || allDataFetched) return;
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/notice/fetch/teacher?start=${start}&limit=${end}&session=${getCurrentSession()}&type=${'for'}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`,
                }
            });

            const notice = response.data.notices;
            setDetails(prevData => [...prevData, ...response.data.notices]);
            if (notice.length < end) {
                toast.success('All data fetched');
                setAllDataFetched(true);
            }

        } catch (error) {
            console.error("Error fetching notice:", error);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchNotice();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
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

    return (
        <div className={`mx-3 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {loading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="flex justify-center items-center h-40"
                >
                    <FaSpinner className={`text-4xl ${darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                </motion.div>
            ) : details.length === 0 ? (
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className={`w-full text-center font-semibold py-10 ${darkMode ? 'text-blue-400' : 'text-blue-800'
                        }`}
                >
                    No data available
                </motion.div>
            ) : (
                <>
                    <TeacherTile details={details} darkMode={darkMode} />
                    <div ref={sentinelRef} className="h-10">
                        {loading && start > 0 && (
                            <div className={`text-center w-full text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                Loading more...
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}