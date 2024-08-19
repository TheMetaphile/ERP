import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { BASE_URL_Login } from '../../../Config';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentWeekRow from './CurrentWeekRow';

const CurrentWeek = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
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
    const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const currentWeekFormattedDate = currentWeekStart.toISOString().split('T')[0];

    useEffect(() => {
        const fetchPlan = async () => {
            if (!Class || !section || !subject) return;

            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/teacher?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${currentWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                setDetails(response.data.plan);
                setId(response.data._id);
            } catch (err) {
                console.log(err.response.data.error);
                setError(err.response.data.error);
                toast.error("Failed to fetch plan");
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, [Class, section, subject, currentWeekFormattedDate]);

    if (loading) {
        return <Loading />;
    }

    if (details.length === 0 && selectedTab === 'Current Week') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-indigo-600 font-semibold"
            >
                No Data Available
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='rounded-md overflow-auto bg-white shadow-lg'
        >
            <table className='w-full rounded-md border border-indigo-200'>
                <thead className='bg-indigo-100 border-b border-indigo-200'>
                    <tr className='p-4 text-center'>
                        <th className='border-y border-indigo-200 py-3 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 font-semibold text-indigo-700'>Date</th>
                        <th className='border-y border-indigo-200 py-3 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-indigo-700'>Chapter</th>
                        <th className='border-y border-indigo-200 py-3 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-indigo-700'>Topic</th>
                        <th className='border-y border-indigo-200 py-3 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-indigo-700'>Teaching Aids</th>
                        <th className='border-y border-indigo-200 py-3 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-indigo-700'>Activity (if any)</th>
                        <th className='border-y border-indigo-200 py-3 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold text-indigo-700'>Status</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {details.map((data, index) => (
                        <CurrentWeekRow key={index} details={data} index={index} mapId={id} />
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default CurrentWeek;