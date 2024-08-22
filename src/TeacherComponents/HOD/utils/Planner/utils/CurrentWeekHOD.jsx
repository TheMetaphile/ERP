import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from '../../../../../Config';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import Loading from '../../../../../LoadingScreen/Loading';
import 'react-toastify/dist/ReactToastify.css';
import CurrentWeekHODRow from './CurrentWeekHODRow';
import { motion, AnimatePresence } from 'framer-motion';

const CurrentWeekHOD = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

    const session = getCurrentSession();
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const nextWeekStart = new Date();
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);

    const currentWeekFormattedDate = currentWeekStart.toISOString().split('T')[0];

    console.log(selectedTab)
    useEffect(() => {
        console.log(currentWeekFormattedDate)
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/coordinator?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${currentWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                setDetails(response.data.plan);
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                setError(err.response.data.error);
                setLoading(false);
            }
        };
        if (Class && section && subject) {
            setLoading(true);
            setDetails([]);
            fetchPlan();
        }
    }, [Class, section, subject, currentWeekFormattedDate]);


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
        <div className='rounded-md overflow-auto'>
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Current Week' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-4 text-blue-500"
                >
                    No Data Available
                </motion.div>
            ) : (
                <motion.table
                    className='w-full rounded-md border border-black'
                    variants={tableVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <thead className='bg-gradient-to-r from-blue-400 to-blue-200'>
                        <tr className='p-4 text-center'>
                            <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 font-semibold'>Date</th>
                            <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Chapter</th>
                            <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Topic</th>
                            <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Teaching Aids</th>
                            <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Activity (if any)</th>
                            <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Progress</th>
                        </tr>
                    </thead>
                    <AnimatePresence>
                        <motion.tbody className='text-center'>
                            {details.map((data, index) => (

                                <CurrentWeekHODRow details={data} index={index} />

                            ))}
                        </motion.tbody>
                    </AnimatePresence>
                </motion.table>
            )}
        </div>

    );
};

export default CurrentWeekHOD;
