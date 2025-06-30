import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../../../../../Config';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import Loading from '../../../../../LoadingScreen/Loading';
import 'react-toastify/dist/ReactToastify.css';
import CurrentWeekHODRow from './CurrentWeekHODRow';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { refreshAccessToken } from '../../../../../RefreshTokenHelper';

const CurrentWeekHOD = ({ selectedTab, Class, section, subject, stream }) => {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

    const session = getCurrentSession();
    const currentDate = new Date();

    const currentWeekStart = new Date();  // Create a new Date object to avoid modifying the original
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);  // Adjust to Monday (start of the week)




    const currentWeekFormattedDate = `${currentWeekStart.getFullYear()}-${currentWeekStart.getMonth() < 10 ? `0${currentWeekStart.getMonth() + 1}` : currentWeekStart.getMonth() + 1}-${currentWeekStart.getDate()}`;
    console.log(currentWeekStart, "curretnweek"); // Should point to Monday of the current week



    console.log(selectedTab)
    useEffect(() => {
        console.log(currentWeekFormattedDate, 'current')
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL}/lessonPlan/fetch/coordinator?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${currentWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                setDetails(response.data.plan);
                toast.success("All data Fetched");
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                toast.error(err.response.data.error);
                setLoading(false);
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
            }
        };
        if (Class && section && subject && stream) {
            setLoading(true);
            setDetails([]);
            fetchPlan();
        }
    }, [Class, section, subject, currentWeekFormattedDate, stream]);


    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };



    return (
        <div className={`rounded-md overflow-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Current Week' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`text-center py-4 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}
                >
                    No Data Available
                </motion.div>
            ) : (
                <motion.table
                    className={`w-full rounded-md border ${darkMode ? 'border-gray-700' : 'border-black'}`}
                    variants={tableVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <thead className={`${darkMode
                        ? 'bg-gradient-to-r from-blue-800 to-blue-600'
                        : 'bg-gradient-to-r from-blue-400 to-blue-200'}`}>
                        <tr className='p-4 text-center'>
                            <th className={`border-y py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 font-semibold 
                            ${darkMode
                                    ? 'border-gray-700 text-white'
                                    : 'border-black'}`}>
                                Date
                            </th>
                            <th className={`border-y py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold 
                            ${darkMode
                                    ? 'border-gray-700 text-white'
                                    : 'border-black'}`}>
                                Chapter
                            </th>
                            <th className={`border-y py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold 
                            ${darkMode
                                    ? 'border-gray-700 text-white'
                                    : 'border-black'}`}>
                                Topic
                            </th>
                            <th className={`border-y py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold 
                            ${darkMode
                                    ? 'border-gray-700 text-white'
                                    : 'border-black'}`}>
                                Teaching Aids
                            </th>
                            <th className={`border-y py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold 
                            ${darkMode
                                    ? 'border-gray-700 text-white'
                                    : 'border-black'}`}>
                                Activity (if any)
                            </th>
                            <th className={`border-y py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold 
                            ${darkMode
                                    ? 'border-gray-700 text-white'
                                    : 'border-black'}`}>
                                Progress
                            </th>
                        </tr>
                    </thead>
                    <AnimatePresence>
                        <motion.tbody className='text-center'>
                            {details.map((data, index) => (
                                <CurrentWeekHODRow
                                    key={index}
                                    details={data}
                                    index={index}
                                    darkMode={darkMode}
                                />
                            ))}
                        </motion.tbody>
                    </AnimatePresence>
                </motion.table>
            )}
        </div>

    );
};

export default CurrentWeekHOD;
