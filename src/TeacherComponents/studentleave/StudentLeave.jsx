import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { Link, Outlet } from "react-router-dom";
import NewTile from './utils/NewTile';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Student_Leave } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';

function StudentLeave() {
    const [status, setStatus] = useState('Pending');
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [start, setStart] = useState(0);
    const end = 2;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };
    useEffect(() => {
        setStart(0);
        setData([]);
        setLoading(false);
        setAllDataFetched(false);
    }, [status]);


    useEffect(() => {
        if (start === 0 && data.length === 0 && !allDataFetched && !loading) {
            fetchUserData();
        }
    }, [start, data, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start]);

    const fetchUserData = async () => {
        if (loading || allDataFetched) return;
        setLoading(true);
        try {
            const today = new Date();
            var month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
            const formattedDate = `${today.getFullYear()}-${month}-${today.getDate()}`;
            const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/classTeacher?start=${start}&end=${end}&status=${status}&date=${formattedDate}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });

            const leaves = response.data.StudentsLeaves.length;
            if (leaves < end) {
                toast.success('All data fetched');
                setAllDataFetched(true);
            }
            setData(prevData => [...prevData, ...response.data.StudentsLeaves]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    console.log("Fetching more data...");
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

    if (loading) {
        return <Loading />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col px-4 h-screen items-start mb-3 "
        >
            <ToastContainer />
            <motion.div
                className='flex items-center justify-between w-full mt-6 mb-8'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >

                <h1 className='text-3xl mobile:max-tablet:text-sm font-medium text-black flex items-center'>

                    <FaUserGraduate className="mr-3" />
                    Student Leave
                </h1>
                <motion.select
                    value={status}
                    onChange={handleStatusChange}

                    className="bg-white border-2 border-blue-300 text-blue-700 rounded-lg mobile:max-tablet:p-2 shadow-md px-4 py-2 outline-none focus:border-blue-500 transition duration-300"

                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </motion.select>
            </motion.div>

            <motion.div
                className='w-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <NewTile data={data} setData={setData} />
                <div ref={sentinelRef} className="h-10">
                    {loading && start > 0 && (
                        <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default StudentLeave;