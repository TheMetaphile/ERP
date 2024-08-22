import React, { useState, useContext, useEffect } from 'react';
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
    const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/studentleave/new');
    const [status, setStatus] = useState('Pending');
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const handleLinkSelect = (link) => {
        setSelectedLink(link);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setStart(0);
        setData([]);
        setAllDataFetched(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchUserData();
    }, [authState.accessToken, status]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start, status]);

    const fetchUserData = async () => {
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

    if (loading) {
        return <Loading />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col px-4 h-screen items-start mb-3 bg-indigo-50"
        >
            <ToastContainer />
            <motion.div
                className='flex items-center justify-between w-full mt-6 mb-8'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className='text-3xl mobile:max-tablet:text-sm font-bold text-indigo-800 flex items-center'>
                    <FaUserGraduate className="mr-3" />
                    Student Leave
                </h1>
                <motion.select
                    value={status}
                    onChange={handleStatusChange}
                    className="bg-white border-2 border-indigo-300 text-indigo-700 rounded-lg mobile:max-tablet:p-2 shadow-md px-4 py-2 outline-none focus:border-indigo-500 transition duration-300"
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
                <NewTile data={data} />
                {!allDataFetched && (
                    <motion.h1
                        className='text-indigo-600 hover:text-indigo-800 mt-6 cursor-pointer text-center font-semibold'
                        onClick={handleViewMore}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View More
                    </motion.h1>
                )}
            </motion.div>
        </motion.div>
    )
}

export default StudentLeave;