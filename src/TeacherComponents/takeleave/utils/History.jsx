import React, { useState, useContext, useEffect, useRef } from 'react';
import { BASE_URL } from './../../../Config';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading'
import { toast } from 'react-toastify';
import HistoryTile from './HistoryTile';
import { motion } from 'framer-motion';
import { FaHistory } from 'react-icons/fa';
import { refreshAccessToken } from '../../../RefreshTokenHelper';

function History({ additionalData, darkMode }) {
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(2);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const iconClass = darkMode ? 'text-indigo-400' : 'text-black';

    useEffect(() => {
        if (authState?.accessToken) {
            setDetails(prevState => [...additionalData, ...prevState]);
        } else {
            toast.error('No access token available');
        }
    }, [authState?.accessToken, additionalData]);

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

    useEffect(() => {
        if (start === 0 && details.length === 0 && !allDataFetched && !loading) {
            fetchLeaves();
        }
    }, [start, details, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchLeaves();
        }
    }, [start]);

    const fetchLeaves = async () => {
        const session = getCurrentSession();
        if (loading || allDataFetched) return;

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/teacherleave/fetch/teacher?start=${start}&end=${end}&session=${session}`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });

            const leaves = response.data.Leaves.length;
            if (leaves < end) {
                toast.success('All data fetched');
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.Leaves]);
        }
        catch (error) {
            toast.error(error);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchLeaves();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
        finally {
            setLoading(false)
        }
    }

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mx-auto w-full ${bgClass}`}
        >
            <motion.div
                className='flex items-center justify-between mb-6 mobile:max-tablet:mb-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1
                    className={`
                        text-3xl px-2 mobile:max-tablet:text-lg 
                        font-medium flex items-center 
                        ${textClass}
                    `}
                >
                    <FaHistory
                        className={`mr-2 ${iconClass}`}
                    />
                    Leave History
                </h1>
            </motion.div>

            {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Loading />
                </motion.div>
            ) : details.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`
                        text-center py-12 
                        ${darkMode ? 'text-blue-400' : 'text-blue-600'} 
                        font-medium
                    `}
                >
                    No data available
                </motion.div>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HistoryTile
                            details={details}
                            darkMode={darkMode}
                        />
                    </motion.div>

                    <div ref={sentinelRef} className="h-10">
                        {loading && start > 0 && (
                            <div
                                className={`
                                    text-center w-full text-sm 
                                    ${subTextClass}
                                `}
                            >
                                Loading more...
                            </div>
                        )}
                    </div>
                </>
            )}
        </motion.div>
    )
}

export default History