import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../../../Config';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextWeekRow from './NextWeekRow';
import { motion } from 'framer-motion';
import { FaSave, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const NextWeek = ({
    selectedTab,
    Class,
    section,
    subject,
    darkMode
}) => {
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
    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);

    const nextWeekFormattedDate = `${nextWeekStart.getFullYear()}-${nextWeekStart.getMonth() < 10 ? `0${nextWeekStart.getMonth() + 1}` : nextWeekStart.getMonth() + 1}-${nextWeekStart.getDate()}`;

    const [details, setDetails] = useState(defaultPlan());

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Class || !section || !subject) return;
        const data = {
            accessToken: authState?.accessToken,
            class: Class,
            section: section,
            subject: subject,
            startingDate: nextWeekFormattedDate,
            session: session,
            plan: details
        };

        try {
            const response = await axios.post(`${BASE_URL}/lessonPlan/create`, data, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });
            toast.success('Plan Saved Successfully');
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };

    useEffect(() => {
        const fetchPlan = async () => {
            if (!Class || !section || !subject) return;
            try {
                const response = await axios.get(`${BASE_URL}/lessonPlan/fetch/teacher?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${nextWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                });
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

    const renderResponseBox = (title, status, remark, type) => {
        const isAccepted = status === "Accept";
        return (
            <div
                className={`flex flex-col p-6 rounded-lg shadow-lg ${isAccepted
                    ? (darkMode ? 'bg-green-900' : 'bg-white text-green-500')
                    : (darkMode ? 'bg-red-900' : 'bg-white text-red-500')
                    }`}
            >
                <div className={`flex items-center mb-4 text-lg font-medium ${isAccepted
                    ? (darkMode ? 'text-green-400' : 'text-green-500')
                    : (darkMode ? 'text-red-400' : 'text-red-500')
                    }`}>
                    {isAccepted ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                    {title} Response
                </div>
                <div className="flex items-center mb-4">
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 ${darkMode
                        ? (isAccepted ? 'text-green-300' : 'text-red-300')
                        : ''
                        }`}>
                        {status}
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="font-medium">Remark:</span>
                    <span className={`ml-2 ${darkMode
                        ? (isAccepted ? 'text-green-300' : 'text-red-300')
                        : ''
                        }`}>
                        {remark}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            className={`rounded-md overflow-auto p-6 mobile:max-tablet:p-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-50'
                }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Next Week' ? (
                <motion.div
                    className={`text-2xl font-semibold text-center ${darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    No Data Available
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <motion.table
                        className={`w-full rounded-lg border-2 overflow-hidden ${darkMode
                            ? 'bg-gray-800 border-gray-700'
                            : 'border-blue-300 bg-white'
                            }`}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <thead className={`${darkMode
                            ? 'bg-blue-900 text-white'
                            : 'bg-blue-600 text-white'
                            }`}>
                            <tr className='p-4 text-center whitespace-nowrap'>
                                {['Date', 'Chapter', 'Topic', 'Teaching Aids', 'Activity (if any)'].map((header, index) => (
                                    <th
                                        key={index}
                                        className='py-3 px-4 text-xl font-semibold'
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {details.map((data, index) => (
                                <NextWeekRow
                                    key={index}
                                    details={data}
                                    index={index}
                                    setDetails={setDetails}
                                    status={(HODStatus === "Accept" && adminStatus === 'Accept')}
                                    darkMode={darkMode}
                                />
                            ))}
                        </tbody>
                    </motion.table>
                    <motion.div
                        className="flex justify-evenly items-center py-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {renderResponseBox("HOD", HODStatus, HODRemark, "hod")}
                        {renderResponseBox("Admin", adminStatus, adminRemark, "admin")}
                    </motion.div>
                    <motion.button
                        type="submit"
                        className={`px-8 py-3 w-full rounded-md font-semibold hover:opacity-90 transition-colors duration-300 flex items-center justify-center ${darkMode
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-600 text-white'
                            }`}
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