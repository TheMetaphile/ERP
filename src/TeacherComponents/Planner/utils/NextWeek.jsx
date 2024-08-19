import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from '../../../Config';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextWeekRow from './NextWeekRow';
import { motion } from 'framer-motion';
import { FaSave, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const NextWeek = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');
    const [remark, setRemark] = useState('');

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };
    const defaultPlan = () => {
        return Array.from({ length: 6 }, (_, i) => {
            const date = new Date(nextWeekStart);
            date.setDate(nextWeekStart.getDate() + i);
            return { date: date.toISOString().split('T')[0], teachingAids: '', chapter: '', topic: '', Activity: '' };
        })
    }

    const session = getCurrentSession();
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const nextWeekStart = new Date();
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);

    const nextWeekDays = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(nextWeekStart);
        date.setDate(nextWeekStart.getDate() + i);
        return date;
    });

    const nextWeekFormattedDate = nextWeekStart.toISOString().split('T')[0];
    const [details, setDetails] = useState(defaultPlan());


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!Class || !section || !subject) return ;
        const data = {
            accessToken: authState.accessToken,
            class: Class,
            section: section,
            subject: subject,
            startingDate: nextWeekFormattedDate,
            session: session,
            plan: details
        };
        console.log(data);

        try {
            const response = await axios.post(`${BASE_URL_Login}/lessonPlan/create`, data, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);
            toast.success('Plan Saved Successfully');

        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);

        }
    };


    console.log(selectedTab)
    useEffect(() => {
        const fetchPlan = async () => {
            if(!Class || !section || !subject) return ;
            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/teacher?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${nextWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                if (response.data.plan && response.data.plan.length > 0) {
                    setDetails(response.data.plan);
                    setStatus(response.data.coordinatorStatus);
                    setRemark(response.data.coordinatorRemark);
                } else {
                    setDetails(defaultPlan());
                    setStatus('');
                    setRemark('');
                }
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                setDetails(defaultPlan());
                setStatus('');
                setRemark('');
                setError(err.response.data.error);
                setLoading(false);
            }
        };
        if (Class && section && subject) {
            setLoading(true);
            fetchPlan();
        }
    }, [Class, section, subject, nextWeekFormattedDate]);




    return (
        <motion.div 
            className='rounded-md overflow-auto bg-indigo-50 p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Next Week' ? (
                <motion.div
                    className="text-2xl text-indigo-600 font-semibold text-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    No Data Available
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <motion.table 
                        className='w-full rounded-lg border-2 border-indigo-300 overflow-hidden'
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <thead className='bg-indigo-600 text-white'>
                            <tr className='p-4 text-center'>
                                <th className='py-3 px-4 text-xl font-semibold'>Date</th>
                                <th className='py-3 px-4 text-xl font-semibold'>Chapter</th>
                                <th className='py-3 px-4 text-xl font-semibold'>Topic</th>
                                <th className='py-3 px-4 text-xl font-semibold'>Teaching Aids</th>
                                <th className='py-3 px-4 text-xl font-semibold'>Activity (if any)</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {details.map((data, index) => (
                                <NextWeekRow key={index} details={data} index={index} setDetails={setDetails} status={status === "Accept"} />
                            ))}
                        </tbody>
                    </motion.table>
                    <motion.div 
                        className='flex justify-center items-center py-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {status === "Accept" ? (
                            <div className='flex flex-col text-lg bg-white p-4 rounded-lg shadow-md'>
                                <div className='flex items-center text-indigo-700'>
                                    <FaCheckCircle className="mr-2" />
                                    Status: {status}
                                </div>
                                <div className='flex items-center mt-2 text-indigo-600'>
                                    Remark: {remark}
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col text-lg bg-white p-4 rounded-lg shadow-md'>
                                <div className='flex items-center text-indigo-700'>
                                    <FaTimesCircle className="mr-2" />
                                    Status: {status}
                                </div>
                                <div className='flex items-center mt-2 text-indigo-600'>
                                    Remark: {remark}
                                </div>
                                <motion.button
                                    type="submit"
                                    className='mt-4 px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaSave className="mr-2" />
                                    SAVE
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </form>
            )}
        </motion.div>
    );
};

export default NextWeek;
