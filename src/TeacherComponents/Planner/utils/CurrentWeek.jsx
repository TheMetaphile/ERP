import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { BASE_URL } from '../../../Config';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentWeekRow from './CurrentWeekRow';
import { refreshAccessToken } from '../../../RefreshTokenHelper';

const CurrentWeek = ({
    selectedTab,
    Class,
    section,
    subject,
    darkMode
}) => {
    const { authState, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);
    const [id, setId] = useState('');

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

    const session = getCurrentSession();
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    const currentWeekFormattedDate = `${currentWeekStart.getFullYear()}-${currentWeekStart.getMonth() < 10 ? `0${currentWeekStart.getMonth() + 1}` : currentWeekStart.getMonth() + 1}-${currentWeekStart.getDate()}`;

    useEffect(() => {
        const fetchPlan = async () => {
            if (!Class || !section || !subject) return;

            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/lessonPlan/fetch/teacher?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${currentWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                });
                setDetails(response.data.plan);
                setId(response.data._id);
            } catch (err) {
                console.log(err.response.data.error);
                setError(err.response.data.error);
                toast.error(err.response.data.error);
                if (
                    err.response &&
                    err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                ) {
                    toast.warn('Access denied. Attempting to refresh token...');
                    try {
                        const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                        await fetchPlan();
                    } catch (refreshError) {
                    }
                } else {
                    toast.error(err.response?.data?.error || "An error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, [Class, section, subject]);

    if (loading) {
        return <Loading />;
    }

    if (details.length === 0 && selectedTab === 'Current Week') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center py-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                    } font-semibold`}
            >
                {error ? error : 'No Data Available'}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-md overflow-auto shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
        >
            <table className={`w-full rounded-md border ${darkMode ? 'border-gray-700' : 'border-blue-200'
                }`}>
                <thead className={`${darkMode ? 'bg-gray-700' : 'bg-blue-100 border-b border-blue-200'
                    }`}>
                    <tr className='p-4 text-center'>
                        {['Date', 'Chapter', 'Topic', 'Teaching Aids', 'Activity (if any)', 'Status'].map((header, index) => (
                            <th
                                key={index}
                                className={`border-y py-3 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 font-semibold ${darkMode
                                    ? 'text-white border-gray-600'
                                    : 'text-blue-700 border-blue-200'
                                    }`}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {details.map((data, index) => (
                        <CurrentWeekRow
                            key={index}
                            details={data}
                            index={index}
                            mapId={id}
                            darkMode={darkMode}
                        />
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default CurrentWeek;