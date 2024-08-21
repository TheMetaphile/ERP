import React, { useState, useContext, useEffect } from 'react';
import { BASE_URL_TeacherLeave } from './../../../Config';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading'
import { toast } from 'react-toastify';
import HistoryTile from './HistoryTile';
import { motion } from 'framer-motion';
import { FaHistory, FaChevronDown } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

function History({ additionalData }) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    useEffect(() => {
        if (authState.accessToken) {
            setDetails(prevState => [...additionalData, ...prevState]);
        } else {
            toast.error('No access token available');
        }
    }, [authState.accessToken, additionalData]);

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
        setLoading(true);
        fetchLeaves();
    }, [authState.accessToken]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchLeaves();

        }
    }, [start]);

    const fetchLeaves = async () => {
        const session = getCurrentSession();
        console.log('start', start, 'end', end)
        try {
            const response = await axios.get(`${BASE_URL_TeacherLeave}/teacherleave/fetch/teacher?start=${start}&end=${end}&session=${session}`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            const leaves = response.data.Leaves.length;
            console.log("API response:", response.data.Leaves);
            if (leaves < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.Leaves]);
            console.log("API responserrrrrr:", data);


        }
        catch (error) {
            toast.error(error);
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=' mx-auto p-6 bg-blue-50 '
        >
            <motion.div
                className='flex items-center justify-between mb-6'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className='text-3xl font-bold text-blue-600 flex items-center mobile:max-tablet:text-2xl'>
                    <FaHistory className="mr-2" />
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
                    className="text-center py-12 text-blue-600 font-medium"
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
                        <HistoryTile details={details} />
                    </motion.div>

                    {!allDataFetched && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 text-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-300"
                                onClick={handleViewMore}
                            >
                                View More
                                <FaChevronDown className="ml-2" />
                            </motion.button>
                        </motion.div>
                    )}
                </>
            )}
        </motion.div>
    )
}

export default History