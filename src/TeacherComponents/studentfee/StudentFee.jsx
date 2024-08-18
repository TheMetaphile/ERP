import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import axios from 'axios';
import Selection from './utils/Selection';
import { BASE_URL_Fee } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaMoneyBillWave, FaPercent, FaWallet, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

function StudentFee() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [allDataFetched, setAllDataFetched] = useState(false);

    useEffect(() => {
        setStart(0);
        setDetails([]);
        setLoading(true);
        setAllDataFetched(false);
        fetchDetails();
    }, [authState.accessToken, filter]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchDetails();
        }
    }, [start, filter]);

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

    const session = getCurrentSession();

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/classTeacher?&start=${start}&end=${end}&session=${session}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                const output = response.data.students;
                if (output < end) {
                    toast.success('All data fetched');
                    setAllDataFetched(true);
                }
                setDetails(prevStudents => [...prevStudents, ...response.data.students]);
            }
        } catch (err) {
            console.log("Error:", err);
        } finally {
            setLoading(false);
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const tableVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            className="w-full items-start px-4 py-6 bg-gradient-to-r from-indigo-100 to-indigo-50"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <ToastContainer />
            <div className='my-6 flex w-full justify-between items-center'>
                <h1 className="text-3xl font-bold text-indigo-800 mb-2">Student Fee</h1>
                <Selection setFilter={setFilter} />
            </div>
            <motion.div 
                className='overflow-hidden rounded-lg shadow-lg bg-white'
                variants={tableVariants}
            >
                <div className='overflow-x-auto'>
                    <table className='w-full min-w-max'>
                        <thead>
                            <tr className='bg-indigo-600 text-white'>
                                <th className='py-3 px-4 text-left'>Roll Number</th>
                                <th className='py-3 px-4 text-left'>Name</th>
                                <th className='py-3 px-4 text-left'>Total Fee</th>
                                <th className='py-3 px-4 text-left'>Discount</th>
                                <th className='py-3 px-4 text-left'>Payable</th>
                                <th className='py-3 px-4 text-left'>Paid</th>
                                <th className='py-3 px-4 text-left'>Pending</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && details.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className='text-center py-4'>
                                        <Loading />
                                    </td>
                                </tr>
                            ) : details.length > 0 ? (
                                details.map((detail, index) => {
                                    const shouldRender = (filter === 'Paid' && detail.payableFee - detail.paid === 0) ||
                                        (filter === 'Pending' && detail.payableFee - detail.paid > 0) ||
                                        filter === '';

                                    if (!shouldRender) return null;

                                    return (
                                        <motion.tr
                                            key={index}
                                            className='border-b hover:bg-indigo-50 transition-colors duration-200'
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            <td className='py-3 px-4'><FaUserGraduate className="inline mr-2 text-indigo-600" />{detail.rollNumber}</td>
                                            <td className='py-3 px-4'>
                                                <div className="flex items-center gap-2">
                                                    <img src={detail.profileLink} alt="Profile" className='w-8 h-8 rounded-full' />
                                                    <span className="font-medium text-indigo-800">{detail.name}</span>
                                                </div>
                                            </td>
                                            <td className='py-3 px-4'><FaMoneyBillWave className="inline mr-2 text-indigo-600" />₹ {detail.totalfee}</td>
                                            <td className='py-3 px-4'>₹ {detail.discountAmount}</td>
                                            <td className='py-3 px-4'><FaWallet className="inline mr-2 text-indigo-600" />₹ {detail.payableFee}</td>
                                            <td className='py-3 px-4 text-green-600'><FaCheckCircle className="inline mr-2" />₹ {detail.paid}</td>
                                            <td className={`py-3 px-4 ${(detail.payableFee - detail.paid) === 0 ? "text-green-500" : "text-red-500"}`}>
                                                <FaExclamationCircle className="inline mr-2" />₹ {detail.payableFee - detail.paid}
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className='text-center py-8 text-indigo-600'>No Fee Details available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {!allDataFetched && (
                    <motion.div
                        className='text-center py-4'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button 
                            className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300'
                            onClick={handleViewMore}
                        >
                            View More
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}

export default StudentFee;