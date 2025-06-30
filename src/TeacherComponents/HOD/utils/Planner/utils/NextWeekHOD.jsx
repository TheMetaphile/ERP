import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../../../../../Config';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import Loading from '../../../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextWeekHODRow from './NextWeekHODRow';
import { motion, AnimatePresence } from 'framer-motion';
import { refreshAccessToken } from '../../../../../RefreshTokenHelper';

const NextWeekHOD = ({ selectedTab, Class, section, subject, stream }) => {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [remark, setRemark] = useState('');
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');

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
    const day = currentDate.getDay();
    const currentWeekStart = new Date();
    const diff = 1 - day;  // If Sunday (0), go back 6 days, otherwise adjust to Monday
    currentWeekStart.setDate(currentDate.getDate() + diff);

    const nextWeekStart = new Date(currentWeekStart);  // Create a new Date object for next week
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);




    // const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    // const nextWeekStart = new Date();
    // nextWeekStart.setDate(currentWeekStart.getDate() + 7);


    const nextWeekFormattedDate = `${nextWeekStart.getFullYear()}-${nextWeekStart.getMonth() < 10 ? `0${nextWeekStart.getMonth() + 1}` : nextWeekStart.getMonth() + 1}-${nextWeekStart.getDate()}`;
    const [details, setDetails] = useState(defaultPlan());




    useEffect(() => {
        console.log(nextWeekFormattedDate, "dfh")
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL}/lessonPlan/fetch/coordinator?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${nextWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                if (response.data.plan && response.data.plan.length > 0) {
                    setDetails(response.data.plan);
                    toast.success("All data Fetched");
                    setId(response.data._id);
                    setRemark(response.data.coordinatorRemark);
                    setStatus(response.data.coordinatorStatus);
                } else {
                    setDetails(defaultPlan());
                    setId('');
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setDetails(defaultPlan());
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
    }, [Class, section, subject, nextWeekFormattedDate, stream]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!status) {
            alert('Please fill status');
        }
        const data = {
            accessToken: authState?.accessToken,
            id: id,
            status: status,
            remark: remark,
        };
        console.log(data, id);

        try {
            const response = await axios.put(
                `${BASE_URL}/lessonPlan/update/coordinator?id=${id}&status=${status}&remark=${remark}&session=${session}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`
                    }
                }
            );
            console.log("API response:", response.data);
            toast.success('Plan Saved Successfully');
        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await handleSubmit();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }

        }
    };

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


    const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <div className={`rounded-md overflow-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Next Week' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`text-center py-4 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}
                >
                    No Data Available
                </motion.div>
            ) : (
                <motion.form
                    onSubmit={handleSubmit}
                    initial="hidden"
                    animate="visible"
                    variants={tableVariants}
                >
                    <motion.table
                        className={`w-full rounded-md border ${darkMode ? 'border-gray-700' : 'border-black'}`}
                        variants={tableVariants}
                    >
                        <thead className={`${darkMode
                            ? 'bg-gradient-to-r from-blue-800 to-blue-600'
                            : 'bg-gradient-to-r from-blue-400 to-blue-200'}`}>
                            <tr className='p-4 text-center'>
                                <th className={`py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold 
                                ${darkMode ? 'text-white border-gray-700' : 'text-black'}`}>
                                    Date
                                </th>
                                <th className={`py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold 
                                ${darkMode ? 'text-white border-gray-700' : 'text-black'}`}>
                                    Chapter
                                </th>
                                <th className={`py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold 
                                ${darkMode ? 'text-white border-gray-700' : 'text-black'}`}>
                                    Topic
                                </th>
                                <th className={`py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold 
                                ${darkMode ? 'text-white border-gray-700' : 'text-black'}`}>
                                    Teaching Aids
                                </th>
                                <th className={`py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold 
                                ${darkMode ? 'text-white border-gray-700' : 'text-black'}`}>
                                    Activity (if any)
                                </th>
                            </tr>
                        </thead>
                        <AnimatePresence>
                            <motion.tbody className='text-center whitespace-nowrap'>
                                {details.map((data, index) => (
                                    <NextWeekHODRow
                                        key={index}
                                        details={data}
                                        index={index}
                                        setDetails={setDetails}
                                        darkMode={darkMode}
                                    />
                                ))}
                            </motion.tbody>
                        </AnimatePresence>
                    </motion.table>

                    <motion.div className='flex justify-center items-center py-2 gap-2' variants={inputVariants}>
                        <motion.textarea
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            placeholder='Enter your remark'
                            className={`w-full p-2 rounded-md mb-4 
                            ${darkMode
                                    ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-500'
                                    : 'border border-black focus:ring-blue-300'}`}
                            variants={inputVariants}
                        />
                        <motion.select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`p-5 rounded-md mb-4 
                            ${darkMode
                                    ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-500'
                                    : 'border border-black focus:ring-blue-300'}`}
                            variants={inputVariants}
                        >
                            <option value="">Select status</option>
                            <option value="Accept">Accept</option>
                            <option value="Reject">Reject</option>
                        </motion.select>
                    </motion.div>
                    <motion.div className='flex justify-center items-center py-4' variants={inputVariants}>
                        <motion.button
                            type="submit"
                            className={`p-1 px-4 rounded-md font-semibold 
                            ${darkMode
                                    ? 'bg-blue-700 text-white hover:bg-blue-600'
                                    : 'bg-secondary border-black border hover:bg-white hover:text-black hover:border-black hover:border-2'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            SAVE
                        </motion.button>
                    </motion.div>
                </motion.form>
            )}
        </div>
    );
};

export default NextWeekHOD;
