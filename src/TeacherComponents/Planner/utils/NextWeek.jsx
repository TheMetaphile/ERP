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
    const [HODStatus, setHODStatus] = useState('');
    const [HODRemark, setHODRemark] = useState('');
    const [adminStatus, setadminStatus] = useState('');
    const [adminRemark, setadminRemark] = useState('');

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
    const currentWeekStart = new Date(currentDate);  // Create a new Date object to avoid modifying the original
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);  // Adjust to Monday (start of the week)

    const nextWeekStart = new Date(currentWeekStart);  // Create a new Date object for next week
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);

    const nextWeekDays = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(nextWeekStart);
        date.setDate(nextWeekStart.getDate() + i);
        return date;
    });

    const nextWeekFormattedDate = `${nextWeekStart.getFullYear()}-${nextWeekStart.getMonth() < 10 ? `0${nextWeekStart.getMonth() + 1}` : nextWeekStart.getMonth() + 1}-${nextWeekStart.getDate()}`;

    const [details, setDetails] = useState(defaultPlan());


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Class || !section || !subject) return;
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
            if (!Class || !section || !subject) return;
            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/teacher?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${nextWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                if (response.data.plan && response.data.plan.length > 0) {
                    setDetails(response.data.plan);
                    setHODStatus(response.data.coordinatorStatus);
                    setHODRemark(response.data.coordinatorRemark);
                    setadminStatus(response.data.adminStatus);
                    setadminRemark(response.data.adminRemark);
                } else {
                    setDetails(defaultPlan());
                    setHODStatus('');
                    setHODRemark('');
                    setadminStatus('');
                    setadminRemark('');
                }
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                setDetails(defaultPlan());
                setHODStatus('');
                setHODRemark('');
                setadminStatus('');
                setadminRemark('');
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
            className='rounded-md overflow-auto bg-blue-50 p-6 mobile:max-tablet:p-2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Next Week' ? (
                <motion.div
                    className="text-2xl text-blue-600 font-semibold text-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    No Data Available
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <motion.table
                        className='w-full rounded-lg border-2 border-blue-300 overflow-hidden'
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <thead className='bg-blue-600 text-white'>
                            <tr className='p-4 text-center whitespace-nowrap'>
                                <th className='py-3 px-4 text-xl font-semibold'>Date</th>
                                <th className='py-3 px-4 text-xl font-semibold'>Chapter</th>
                                <th className='py-3 px-4 text-xl font-semibold'>Topic</th>
                                <th className='py-3 px-4 text-xl font-semibold'>Teaching Aids</th>
                                <th className='py-3 px-4 text-xl font-semibold'>Activity (if any)</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {details.map((data, index) => (
                                <NextWeekRow key={index} details={data} index={index} setDetails={setDetails} status={(HODStatus === "Accept" && adminStatus === 'Accept')} />
                            ))}
                        </tbody>
                    </motion.table>
                    <motion.div
                        className="flex justify-evenly items-center py-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {HODStatus === "Accept" ? (
                            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg text-green-500">
                                <div className="flex items-center mb-4 text-lg font-medium">
                                    <FaCheckCircle className="mr-2" />
                                    HOD Response
                                </div>
                                <div className="flex items-center mb-4">
                                    <span className="font-medium">Status:</span>
                                    <span className="ml-2">{HODStatus}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium">Remark:</span>
                                    <span className="ml-2">{HODRemark}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg text-red-500">
                                <div className="flex items-center mb-4 text-lg font-medium">
                                    <FaTimesCircle className="mr-2" />
                                    HOD Response
                                </div>
                                <div className="flex items-center mb-4">
                                    <span className="font-medium">Status:</span>
                                    <span className="ml-2">{HODStatus}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium">Remark:</span>
                                    <span className="ml-2">{HODRemark}</span>
                                </div>
                            </div>
                        )}

                        {adminStatus === "Accept" ? (
                            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg text-green-500">
                                <div className="flex items-center mb-4 text-lg font-medium">
                                    <FaCheckCircle className="mr-2" />
                                    Admin Response
                                </div>
                                <div className="flex items-center mb-4">
                                    <span className="font-medium">Status:</span>
                                    <span className="ml-2">{adminStatus}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium">Remark:</span>
                                    <span className="ml-2">{adminRemark}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg text-red-500">
                                <div className="flex items-center mb-4 text-lg font-medium">
                                    <FaTimesCircle className="mr-2" />
                                    Admin Response
                                </div>
                                <div className="flex items-center mb-4">
                                    <span className="font-medium">Status:</span>
                                    <span className="ml-2">{adminStatus}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium">Remark:</span>
                                    <span className="ml-2">{adminRemark}</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                    <motion.button
                        type="submit"
                        className="px-8 py-3 w-full rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaSave className="mr-2" />
                        <span className="text-lg">SAVE</span>
                    </motion.button>

                </form>
            )}
        </motion.div>
    );
};

export default NextWeek;
